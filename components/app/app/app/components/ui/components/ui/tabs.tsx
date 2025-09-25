import * as React from "react";
import { cn } from "./utils";

export function Tabs({ value, onValueChange, children }: { value: string; onValueChange: (val: string) => void; children: React.ReactNode }) {
  return <div>{children}</div>;
}

export function TabsList({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn("flex gap-2 border-b pb-2", className)} {...props} />
  );
}

export function TabsTrigger({ value, children, className, ...props }: { value: string; children: React.ReactNode; className?: string }) {
  return (
    <button
      className={cn("px-3 py-1 text-sm font-medium text-gray-700 hover:text-blue-600", className)}
      {...props}
    >
      {children}
    </button>
  );
}

export function TabsContent({ children, value }: { children: React.ReactNode; value: string }) {
  return <div className="mt-4">{children}</div>;
}
