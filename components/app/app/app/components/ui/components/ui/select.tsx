import * as React from "react";
import { cn } from "./utils";

export function Select({ children }: { children: React.ReactNode }) {
  return <div className="relative inline-block w-full">{children}</div>;
}

export function SelectTrigger({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "flex w-full items-center justify-between rounded-xl border px-3 py-2 text-sm shadow-sm cursor-pointer",
        className
      )}
      {...props}
    />
  );
}

export function SelectValue({ placeholder }: { placeholder?: string }) {
  return <span className="text-gray-600">{placeholder}</span>;
}

export function SelectContent({ children }: { children: React.ReactNode }) {
  return <div className="mt-2 rounded-xl border bg-white shadow-lg">{children}</div>;
}

export function SelectItem({ children }: { children: React.ReactNode }) {
  return (
    <div className="px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer">
      {children}
    </div>
  );
}
