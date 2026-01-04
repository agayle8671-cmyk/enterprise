import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { motion } from "framer-motion"

import { cn } from "@/lib/utils"
import { PHYSICS, VARIANTS } from "@/lib/animation-constants"

// =============================================================================
// BUTTON VARIANTS - Apple HIG Styling
// =============================================================================

const buttonVariants = cva(
  // Base styles with enhanced antialiasing
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-xl text-sm font-medium " +
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 " +
  "disabled:pointer-events-none disabled:opacity-50 " +
  "[&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground shadow-sm",
        destructive:
          "bg-destructive text-destructive-foreground shadow-sm",
        outline:
          "border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground",
        secondary:
          "bg-secondary text-secondary-foreground shadow-sm",
        ghost:
          "hover:bg-accent hover:text-accent-foreground",
        link:
          "text-primary underline-offset-4 hover:underline",
        // New Apple-style variants
        glass:
          "liquid-glass-subtle text-foreground",
        gradient:
          "bg-gradient-primary text-white shadow-md",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-8 rounded-lg px-3 text-xs",
        lg: "h-12 rounded-xl px-8 text-base",
        xl: "h-14 rounded-2xl px-10 text-lg",
        icon: "h-10 w-10",
        "icon-sm": "h-8 w-8 rounded-lg",
        "icon-lg": "h-12 w-12 rounded-xl",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

// =============================================================================
// BUTTON TYPES
// =============================================================================

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
  VariantProps<typeof buttonVariants> {
  asChild?: boolean
  /** Disable physics animation */
  disablePhysics?: boolean
  /** Loading state */
  isLoading?: boolean
}

// =============================================================================
// BUTTON COMPONENT
// =============================================================================

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, disablePhysics = false, isLoading = false, children, ...props }, ref) => {
    // Use Slot for asChild pattern
    if (asChild) {
      return (
        <Slot
          className={cn(buttonVariants({ variant, size, className }))}
          ref={ref}
          {...props}
        >
          {children}
        </Slot>
      )
    }

    // Use static button when physics disabled
    if (disablePhysics) {
      return (
        <button
          className={cn(buttonVariants({ variant, size, className }))}
          ref={ref}
          disabled={isLoading}
          {...props}
        >
          {isLoading ? (
            <>
              <span className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
              <span>Loading...</span>
            </>
          ) : (
            children
          )}
        </button>
      )
    }

    // Use motion button with physics (default)
    return (
      <motion.button
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        whileHover={{ scale: 1.02 }}
        whileTap={VARIANTS.buttonTap}
        transition={PHYSICS.interaction}
        disabled={isLoading}
        {...(props as any)} // Type assertion to avoid event handler conflicts
      >
        {isLoading ? (
          <>
            <motion.span
              className="w-4 h-4 border-2 border-current border-t-transparent rounded-full"
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            />
            <span>Loading...</span>
          </>
        ) : (
          children
        )}
      </motion.button>
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
