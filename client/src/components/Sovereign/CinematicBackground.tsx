/**
 * CinematicBackground - WebGL Shader Atmosphere
 * 
 * Implements "Data Noir" atmospheric effects:
 * - Procedural noise-based fog/smoke
 * - Slow, turbulent motion
 * - Vignetting and grain
 * - Subconscious awareness of system activity
 */

import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

interface CinematicBackgroundProps {
  className?: string;
  intensity?: "low" | "medium" | "high";
  color?: string;
  speed?: number;
}

export function CinematicBackground({
  className,
  intensity = "medium",
  color = "#BBFF00",
  speed = 0.5,
}: CinematicBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Set canvas size
    const resize = () => {
      canvas.width = canvas.offsetWidth * window.devicePixelRatio;
      canvas.height = canvas.offsetHeight * window.devicePixelRatio;
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    };
    resize();
    window.addEventListener("resize", resize);

    // Parse color to RGB
    const hexToRgb = (hex: string) => {
      const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
      return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
      } : { r: 187, g: 255, b: 0 };
    };

    const rgb = hexToRgb(color);

    // Simple noise-based particle system
    class Particle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      opacity: number;

      constructor(width: number, height: number) {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.vx = (Math.random() - 0.5) * speed;
        this.vy = (Math.random() - 0.5) * speed;
        this.size = Math.random() * 3 + 1;
        this.opacity = Math.random() * 0.3;
      }

      update(width: number, height: number) {
        this.x += this.vx;
        this.y += this.vy;

        // Wrap around edges
        if (this.x < 0) this.x = width;
        if (this.x > width) this.x = 0;
        if (this.y < 0) this.y = height;
        if (this.y > height) this.y = 0;
      }

      draw(ctx: CanvasRenderingContext2D, rgb: { r: number; g: number; b: number }) {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${this.opacity})`;
        ctx.fill();
      }
    }

    // Create particles based on intensity
    const particleCount = {
      low: 30,
      medium: 50,
      high: 80,
    };

    const particles: Particle[] = [];
    const width = canvas.offsetWidth;
    const height = canvas.offsetHeight;

    for (let i = 0; i < particleCount[intensity]; i++) {
      particles.push(new Particle(width, height));
    }

    // Animation loop
    let animationId: number;
    const animate = () => {
      const width = canvas.offsetWidth;
      const height = canvas.offsetHeight;

      // Clear with dark background
      ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
      ctx.fillRect(0, 0, width, height);

      // Update and draw particles
      particles.forEach((particle) => {
        particle.update(width, height);
        particle.draw(ctx, rgb);
      });

      // Draw connections between nearby particles (optional - creates web effect)
      if (intensity === "high") {
        ctx.strokeStyle = `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 0.1)`;
        ctx.lineWidth = 0.5;
        
        for (let i = 0; i < particles.length; i++) {
          for (let j = i + 1; j < particles.length; j++) {
            const dx = particles[i].x - particles[j].x;
            const dy = particles[i].y - particles[j].y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < 100) {
              ctx.beginPath();
              ctx.moveTo(particles[i].x, particles[i].y);
              ctx.lineTo(particles[j].x, particles[j].y);
              ctx.stroke();
            }
          }
        }
      }

      // Add vignette effect
      const gradient = ctx.createRadialGradient(
        width / 2, height / 2, 0,
        width / 2, height / 2, width / 2
      );
      gradient.addColorStop(0, "transparent");
      gradient.addColorStop(1, "rgba(0, 0, 0, 0.5)");
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, width, height);

      animationId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animationId);
    };
  }, [intensity, color, speed]);

  return (
    <canvas
      ref={canvasRef}
      className={cn(
        "absolute inset-0 pointer-events-none",
        className
      )}
      style={{ opacity: 0.6 }}
    />
  );
}

/**
 * ScanlineOverlay - Adds retro CRT scanline effect
 */
export function ScanlineOverlay({ className }: { className?: string }) {
  return (
    <div
      className={cn("absolute inset-0 pointer-events-none opacity-10", className)}
      style={{
        background: "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.5) 2px, rgba(0,0,0,0.5) 4px)",
      }}
    />
  );
}

/**
 * GrainOverlay - Adds film grain texture
 */
export function GrainOverlay({ className }: { className?: string }) {
  return (
    <div
      className={cn("absolute inset-0 pointer-events-none opacity-20 mix-blend-overlay", className)}
      style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='3' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        backgroundSize: "100px 100px",
      }}
    />
  );
}
