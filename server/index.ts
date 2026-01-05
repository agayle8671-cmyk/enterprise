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
  console.log("🛑 [SIGTERM] Railway is killing the container. Cleaning up...");
  process.exit(0);
});

export function log(message: string, source = "express") {
  const formattedTime = new Date().toLocaleTimeString("en-US", {
    hour: "numeric", minute: "2-digit", second: "2-digit", hour12: true,
  });
  console.log(`${formattedTime} [${source}] ${message}`);
}

const app = express();

// 1. REGISTER HEALTH CHECK IMMEDIATELY
app.get("/health", (_req, res) => {
  console.log("🔔 [HEALTH] Priority check passed");
  res.status(200).send("OK");
});

const httpServer = createServer(app);

app.use(express.json({ verify: (req, _res, buf) => { (req as any).rawBody = buf; } }));
app.use(express.urlencoded({ extended: false }));

// 2. START LISTENING BEFORE ANYTHING ELSE
const port = parseInt(process.env.PORT || "5000", 10);
httpServer.listen(port, "0.0.0.0", () => {
  log(`🚀 SERVER BIND SUCCESSFUL ON PORT ${port}`);
});

// Heartbeat to prove the process is alive
setInterval(() => {
  console.log(`💓 [ALIVE] ${new Date().toISOString()}`);
}, 5000); // 5 seconds is enough

(async () => {
  try {
    log("⏳ STEP 1: Registering routes...");
    await registerRoutes(httpServer, app);
    log("✅ STEP 1: Routes registered.");

    log("⏳ STEP 2: Setting up static/vite...");
    if (process.env.NODE_ENV === "production") {
      serveStatic(app);
    } else {
      const { setupVite } = await import("./vite");
      await setupVite(httpServer, app);
    }
    log("✅ STEP 2: Static/Vite ready.");

    log("🎉 ALL SERVICES INITIALIZED.");

    app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
      const status = err.status || err.statusCode || 500;
      const message = err.message || "Internal Server Error";
      res.status(status).json({ message });
      throw err;
    });

  } catch (error) {
    console.error("❌ CRITICAL INITIALIZATION ERROR:", error);
  }
})();
