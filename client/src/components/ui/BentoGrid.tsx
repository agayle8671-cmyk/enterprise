import { ReactNode } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface BentoGridProps {
    children: ReactNode;
    className?: string;
}

export function BentoGrid({ children, className }: BentoGridProps) {
    return (
        <div className={cn(
            "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4",
            className
        )}>
            {children}
        </div>
    );
}

interface BentoCardProps {
    children: ReactNode;
    className?: string;
    colSpan?: 1 | 2 | 3;
    rowSpan?: 1 | 2;
    interactive?: boolean;
    onClick?: () => void;
}

export function BentoCard({
    children,
    className,
    colSpan = 1,
    rowSpan = 1,
    interactive = true,
    onClick,
}: BentoCardProps) {
    const colSpanClass = {
        1: "col-span-1",
        2: "md:col-span-2",
        3: "lg:col-span-3",
    }[colSpan];

    const rowSpanClass = {
        1: "row-span-1",
        2: "row-span-2",
    }[rowSpan];

    return (
        <motion.div
            className={cn(
                "raycast-panel overflow-hidden",
                colSpanClass,
                rowSpanClass,
                interactive && "cursor-pointer",
                className
            )}
            whileHover={interactive ? { scale: 1.01, y: -4 } : undefined}
            whileTap={interactive ? { scale: 0.99 } : undefined}
            transition={{ type: "spring", stiffness: 400, damping: 25 }}
            onClick={onClick}
        >
            {children}
        </motion.div>
    );
}

interface BentoHeaderProps {
    title: string;
    description?: string;
    action?: ReactNode;
    badge?: ReactNode;
}

export function BentoHeader({ title, description, action, badge }: BentoHeaderProps) {
    return (
        <div className="flex items-start justify-between p-5 border-b border-border/30">
            <div>
                <div className="flex items-center gap-2">
                    <h3 className="font-semibold text-foreground">{title}</h3>
                    {badge}
                </div>
                {description && (
                    <p className="text-sm text-muted-foreground mt-0.5">{description}</p>
                )}
            </div>
            {action}
        </div>
    );
}

interface BentoContentProps {
    children: ReactNode;
    className?: string;
    noPadding?: boolean;
}

export function BentoContent({ children, className, noPadding }: BentoContentProps) {
    return (
        <div className={cn(!noPadding && "p-5", className)}>
            {children}
        </div>
    );
}
