import * as React from "react";
import { cn } from "./utils";

// Utilitário simples para concatenar classes
export function cx(...classes: (string | undefined | null | false)[]) {
  return classes.filter(Boolean).join(" ");
}

// Wrapper base para todos os componentes
export const Base = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn(className)} {...props} />
));
Base.displayName = "Base";
