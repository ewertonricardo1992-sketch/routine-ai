import * as React from "react";

export function Progress({ value, className }: { value: number; className?: string }) {
  return (
    <div className={`w-full h-2 bg-gray-200 rounded-full overflow-hidden ${className}`}>
      <div
        className="h-full bg-green-500 transition-all"
        style={{ width: `${value}%` }}
      />
    </div>
  );
}
