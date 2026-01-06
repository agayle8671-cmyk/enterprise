import { ReactNode } from "react";
import { motion } from "framer-motion";
import { TrendingUp, TrendingDown } from "lucide-react";

interface StatCardProps {
    label: string;
    value: string | number;
    change?: {
        value: number;
        trend: "up" | "down";
    };
    icon?: ReactNode;
    className?: string;
}

export function StatCard({ label, value, change, icon, className = "" }: StatCardProps) {
    return (
        <motion.div
            className={`raycast-stat group ${className}`}
            whileHover={{ scale: 1.02, y: -2 }}
            transition={{ type: "spring", stiffness: 400, damping: 25 }}
        >
            <div className="flex items-start justify-between mb-3">
                <span className="text-sm text-muted-foreground">{label}</span>
                {icon && (
                    <div className="raycast-icon-primary">
                        {icon}
                    </div>
                )}
            </div>

            <div className="flex items-end justify-between">
                <span className="text-3xl font-semibold text-foreground tracking-tight">
                    {value}
                </span>

                {change && (
                    <div className={`flex items-center gap-1 text-sm font-medium ${change.trend === "up" ? "text-success" : "text-destructive"
                        }`}>
                        {change.trend === "up" ? (
                            <TrendingUp className="h-4 w-4" />
                        ) : (
                            <TrendingDown className="h-4 w-4" />
                        )}
                        <span>{change.value}%</span>
                    </div>
                )}
            </div>
        </motion.div>
    );
}

// Mini stat for inline display
interface MiniStatProps {
    label: string;
    value: string | number;
    icon?: ReactNode;
}

export function MiniStat({ label, value, icon }: MiniStatProps) {
    return (
        <div className="flex items-center gap-3 p-3 rounded-lg bg-secondary/30">
            {icon && (
                <div className="raycast-icon-primary h-9 w-9">
                    {icon}
                </div>
            )}
            <div>
                <p className="text-xs text-muted-foreground">{label}</p>
                <p className="text-lg font-semibold text-foreground">{value}</p>
            </div>
        </div>
    );
}
