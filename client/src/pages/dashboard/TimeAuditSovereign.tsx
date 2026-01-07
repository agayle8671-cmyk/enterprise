/**
 * Time Audit - SOVEREIGN AESTHETIC
 */

import { Clock, TrendingDown, Target, CheckCircle2 } from "lucide-react";
import { GravityCard, AnimatedBorder, LiveBentoGrid, BentoItem, SystemTicker } from "@/components/Sovereign";
import { TypewriterText } from "@/components/TypewriterText";
import { generateTimeBreakdown } from "@/lib/mockData";

export default function TimeAuditSovereign() {
  const timeBreakdown = generateTimeBreakdown();

  return (
    <div className="min-h-screen bg-[var(--color-void)] text-[var(--color-text-primary)]">
      <SystemTicker 
        items={[
          { id: "1", label: "SAVED THIS WEEK", value: "23.5hrs", trend: "up" as const, color: "var(--color-acid)" },
          { id: "2", label: "AUTOMATION RATE", value: "68%", trend: "up" as const, color: "var(--color-aurora-cyan)" },
          { id: "3", label: "VALUE CREATED", value: "$4,700", trend: "up" as const, color: "var(--color-acid)" },
        ]}
        variant="typewriter"
        className="sticky top-0 z-50"
      />

      <div className="p-4 space-y-4">
        <AnimatedBorder borderWidth={2} borderRadius={12} animationDuration={4} glowIntensity="high">
          <div className="bg-[var(--color-structure)] p-6 rounded-xl">
            <h1 className="text-2xl font-bold font-mono tracking-tight mb-1">TIME OPTIMIZATION MATRIX</h1>
            <div className="text-sm font-mono text-[var(--color-acid)]">
              <TypewriterText 
                phrases={[
                  "// 68% AUTOMATION RATE - 23.5 HOURS SAVED",
                  "// EMAIL: 87% AUTO - PROPOSALS: 88% AUTO",
                  "// $4,700 VALUE CREATED THIS WEEK",
                ]}
                typingSpeed={50}
                deletingSpeed={30}
                pauseTime={2500}
              />
            </div>
          </div>
        </AnimatedBorder>

        <LiveBentoGrid columns={12} gap={8}>
          {[
            { label: "HOURS THIS WEEK", value: "40.0", icon: Clock },
            { label: "MANUAL WORK", value: "16.5", icon: TrendingDown, color: "var(--color-alarm)" },
            { label: "AUTOMATED", value: "23.5", icon: CheckCircle2, color: "var(--color-acid)" },
            { label: "AUTOMATION RATE", value: "68%", icon: Target, color: "var(--color-acid)" },
          ].map((m, i) => (
            <BentoItem key={i} colSpan={3} glowOnHover>
              <GravityCard magneticRange={120}>
                <div className="p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <m.icon className="h-4 w-4" style={{ color: m.color || "var(--color-acid)" }} />
                    <span className="text-[10px] uppercase font-mono text-[var(--color-text-muted)]">{m.label}</span>
                  </div>
                  <div className="text-3xl font-bold font-mono" style={{ color: m.color || "var(--color-text-primary)" }}>
                    {m.value}
                  </div>
                </div>
              </GravityCard>
            </BentoItem>
          ))}

          <BentoItem colSpan={12} glowOnHover>
            <div className="p-4">
              <h2 className="text-xs uppercase font-mono text-[var(--color-text-muted)] mb-4">TIME BREAKDOWN BY CATEGORY</h2>
              <table className="w-full text-xs font-mono">
                <thead className="text-[var(--color-text-muted)] border-b border-[var(--color-acid)]/20">
                  <tr>
                    <th className="text-left pb-2">CATEGORY</th>
                    <th className="text-right pb-2">HOURS</th>
                    <th className="text-right pb-2">% TIME</th>
                    <th className="text-right pb-2">CHANGE</th>
                    <th className="text-right pb-2">TASKS</th>
                    <th className="text-right pb-2">AUTO RATE</th>
                    <th className="text-right pb-2">SAVED</th>
                    <th className="text-right pb-2">$ VALUE</th>
                  </tr>
                </thead>
                <tbody>
                  {timeBreakdown.map((item, i) => {
                    const autoRate = Math.floor(Math.random() * 30) + 60;
                    const timeSaved = (item.hours * autoRate) / 100;
                    const value = timeSaved * 200;
                    return (
                      <tr key={i} className="border-t border-white/5 hover:bg-[var(--color-acid)]/5 transition-colors">
                        <td className="py-3 font-medium">
                          <div className="flex items-center gap-2">
                            <div className="h-2 w-2 rounded" style={{ background: item.color }} />
                            {item.category}
                          </div>
                        </td>
                        <td className="py-3 text-right">{item.hours}</td>
                        <td className="py-3 text-right text-[var(--color-text-muted)]">{item.percentage}%</td>
                        <td className="py-3 text-right" style={{ color: item.change <= 0 ? "var(--color-acid)" : "var(--color-alarm)" }}>
                          {item.change > 0 ? '+' : ''}{item.change}%
                        </td>
                        <td className="py-3 text-right">{item.tasks}</td>
                        <td className="py-3 text-right text-[var(--color-acid)]">{autoRate}%</td>
                        <td className="py-3 text-right text-[var(--color-aurora-cyan)]">{timeSaved.toFixed(1)}h</td>
                        <td className="py-3 text-right text-[var(--color-acid)]">${value.toFixed(0)}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </BentoItem>
        </LiveBentoGrid>
      </div>
    </div>
  );
}
