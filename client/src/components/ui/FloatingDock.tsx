"use client";

import * as React from "react";
import {
    motion,
    useMotionValue,
    useSpring,
    useTransform,
    type MotionValue,
} from "framer-motion";
import { cn } from "@/lib/utils";
import { DOCK_CONFIG, PHYSICS } from "@/lib/animation-constants";

// =============================================================================
// FLOATING DOCK COMPONENT
// macOS-style Dock with Magnification Physics
// =============================================================================

interface DockItem {
    id: string;
    icon: React.ReactNode;
    label: string;
    href?: string;
    onClick?: () => void;
    isActive?: boolean;
}

interface FloatingDockProps {
    items: DockItem[];
    className?: string;
    /** Position of the dock */
    position?: "bottom" | "left" | "right";
    /** Show labels on hover */
    showLabels?: boolean;
}

export function FloatingDock({
    items,
    className,
    position = "bottom",
    showLabels = true,
}: FloatingDockProps) {
    const mouseX = useMotionValue(Infinity);

    const positionClasses = {
        bottom: "fixed bottom-6 left-1/2 -translate-x-1/2 flex-row",
        left: "fixed left-6 top-1/2 -translate-y-1/2 flex-col",
        right: "fixed right-6 top-1/2 -translate-y-1/2 flex-col",
    };

    return (
        <motion.div
            onMouseMove={(e) => mouseX.set(e.pageX)}
            onMouseLeave={() => mouseX.set(Infinity)}
            className={cn(
                "raycast-panel-elevated flex items-end gap-1 px-3 py-2 rounded-2xl z-50",
                positionClasses[position],
                className
            )}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={PHYSICS.screenTransition}
        >
            {items.map((item) => (
                <DockIcon
                    key={item.id}
                    item={item}
                    mouseX={mouseX}
                    showLabel={showLabels}
                />
            ))}
        </motion.div>
    );
}

// =============================================================================
// DOCK ICON - Individual Icon with Magnification
// =============================================================================

interface DockIconProps {
    item: DockItem;
    mouseX: MotionValue<number>;
    showLabel?: boolean;
}

function DockIcon({ item, mouseX, showLabel = true }: DockIconProps) {
    const ref = React.useRef<HTMLDivElement>(null);
    const [isHovered, setIsHovered] = React.useState(false);

    // Calculate distance from mouse to icon center
    const distance = useTransform(mouseX, (val) => {
        const bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 };
        const iconCenter = bounds.x + bounds.width / 2;
        return val - iconCenter;
    });

    // Map distance to scale with influence radius
    const widthSync = useTransform(distance, (val) => {
        const absDistance = Math.abs(val);

        if (absDistance > DOCK_CONFIG.influenceRadius) {
            return DOCK_CONFIG.baseSize;
        }

        // Smooth cosine interpolation for natural magnification
        const ratio = 1 - absDistance / DOCK_CONFIG.influenceRadius;
        const scale = 1 + (DOCK_CONFIG.maxScale - 1) * Math.cos((1 - ratio) * Math.PI / 2);

        return DOCK_CONFIG.baseSize * scale;
    });

    // Apply spring physics to the width for smooth motion
    const width = useSpring(widthSync, PHYSICS.dockMagnify);

    const handleClick = () => {
        if (item.onClick) {
            item.onClick();
        } else if (item.href) {
            window.location.href = item.href;
        }
    };

    return (
        <motion.div
            ref={ref}
            className="relative flex items-center justify-center"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            {/* Tooltip Label */}
            {showLabel && (
                <motion.div
                    className={cn(
                        "absolute -top-10 left-1/2 -translate-x-1/2",
                        "px-2 py-1 rounded-md text-xs font-medium",
                        "bg-foreground text-background whitespace-nowrap",
                        "pointer-events-none"
                    )}
                    initial={{ opacity: 0, y: 5 }}
                    animate={{
                        opacity: isHovered ? 1 : 0,
                        y: isHovered ? 0 : 5
                    }}
                    transition={PHYSICS.interaction}
                >
                    {item.label}
                    {/* Tooltip Arrow */}
                    <div className="absolute left-1/2 -translate-x-1/2 -bottom-1 w-2 h-2 rotate-45 bg-foreground" />
                </motion.div>
            )}

            {/* Icon Button */}
            <motion.button
                style={{ width, height: width }}
                className={cn(
                    "flex items-center justify-center rounded-xl",
                    "transition-colors duration-150",
                    "hover:bg-primary/10",
                    item.isActive && "bg-primary/15"
                )}
                whileTap={{ scale: 0.92 }}
                transition={PHYSICS.interaction}
                onClick={handleClick}
                aria-label={item.label}
            >
                <motion.div
                    className="text-foreground"
                    style={{
                        // Scale icon based on container size
                        scale: useTransform(width, (w) => w / DOCK_CONFIG.baseSize),
                    }}
                >
                    {item.icon}
                </motion.div>
            </motion.button>

            {/* Active Indicator */}
            {item.isActive && (
                <motion.div
                    className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-primary"
                    layoutId="dock-indicator"
                    transition={PHYSICS.interaction}
                />
            )}
        </motion.div>
    );
}

// =============================================================================
// MINI DOCK - Compact Version for Sidebars
// =============================================================================

interface MiniDockProps {
    items: DockItem[];
    className?: string;
    orientation?: "horizontal" | "vertical";
}

export function MiniDock({
    items,
    className,
    orientation = "horizontal",
}: MiniDockProps) {
    return (
        <div
            className={cn(
                "raycast-panel flex gap-1 p-1.5 rounded-xl",
                orientation === "vertical" ? "flex-col" : "flex-row",
                className
            )}
        >
            {items.map((item) => (
                <motion.button
                    key={item.id}
                    className={cn(
                        "flex items-center justify-center w-9 h-9 rounded-lg",
                        "text-muted-foreground hover:text-foreground",
                        "hover:bg-primary/10 transition-colors",
                        item.isActive && "bg-primary/15 text-primary"
                    )}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    transition={PHYSICS.interaction}
                    onClick={item.onClick}
                    aria-label={item.label}
                    title={item.label}
                >
                    {item.icon}
                </motion.button>
            ))}
        </div>
    );
}

export default FloatingDock;
