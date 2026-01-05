import express, { type Request, Response, NextFunction } from "express";
import { registerRoutes } from "./routes";
import { serveStatic } from "./static";
import { createServer } from "http";

process.on("unhandledRejection", (reason, promise) => {
  console.error("🔥 [FATAL] Unhandled Rejection at:", promise, "reason:", reason);
});

process.on("uncaughtException", (err, origin) => {
  console.error(`🔥 [FATAL] Caught exception: ${err}\nException origin: ${origin}`);
});

process.on("SIGTERM", () => {
  log("🛑 [SIGTERM] Railway is killing the container. Cleaning up...");
  process.exit(0);
});

// Heartbeat to prove the process is alive
setInterval(() => {
  console.log(`💓 [ALIVE] ${new Date().toISOString()}`);
}, 1000);

const app = express();

// ABSOLUTE FIRST ROUTE: Health Check 
app.get("/health", (_req, res) => {
  console.log("🔔 [HEALTH] Priority check passed");
  res.status(200).send("OK");
});

const httpServer = createServer(app);

declare module "http" {
  interface IncomingMessage {
    rawBody: unknown;
  }
}

app.use(
  express.json({
    verify: (req, _res, buf) => {
      req.rawBody = buf;
    },
  }),
);

app.use(express.urlencoded({ extended: false }));

export function log(message: string, source = "express") {
  const formattedTime = new Date().toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
  });

  console.log(`${formattedTime} [${source}] ${message}`);
}

app.use((req, res, next) => {
  const start = Date.now();
  const path = req.path;
  let capturedJsonResponse: Record<string, any> | undefined = undefined;

  const originalResJson = res.json;
  res.json = function (bodyJson, ...args) {
    capturedJsonResponse = bodyJson;
    return originalResJson.apply(res, [bodyJson, ...args]);
  };

  res.on("finish", () => {
    const duration = Date.now() - start;
    if (path.startsWith("/api")) {
      let logLine = `${req.method} ${path} ${res.statusCode} in ${duration}ms`;
      if (capturedJsonResponse) {
        logLine += ` :: ${JSON.stringify(capturedJsonResponse)}`;
      }

      log(logLine);
    }
  });

  next();
});

console.log("🚀 [BOOT] Server modules loaded.");

app.use((req, res, next) => {
  log(`Incoming: ${req.method} ${req.url}`);
  next();
});

const port = parseInt(process.env.PORT || "5000", 10);

(async () => {
  try {
    log("⏳ Initializing routes...");
    await registerRoutes(httpServer, app);

    if (process.env.NODE_ENV === "production") {
      serveStatic(app);
    } else {
      const { setupVite } = await import("./vite");
      await setupVite(httpServer, app);
    }

    // Single source of truth for listening
    httpServer.listen(port, "0.0.0.0", () => {
      log(`🚀 Server listening on port ${port}`);
    });

    log("✅ Server initialization complete.");

    app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
      const status = err.status || err.statusCode || 500;
      const message = err.message || "Internal Server Error";
      res.status(status).json({ message });
      throw err;
    });

  } catch (error) {
    console.error("❌ CRITICAL: Server failed to initialize services:", error);
    // Bind anyway so Railway doesn't kill the container immediately
    if (!httpServer.listening) {
      httpServer.listen(port, "0.0.0.0", () => {
        log(`⚠️ Emergency listener active on port ${port}`);
      });
    }
  }
})();
