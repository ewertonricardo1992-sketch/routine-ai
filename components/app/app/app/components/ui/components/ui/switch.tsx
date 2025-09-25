import * as React from "react";

interface SwitchProps {
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
}

export function Switch({ checked, onCheckedChange }: SwitchProps) {
  return (
    <button
      onClick={() => onCheckedChange(!checked)}
      className={`w-10 h-6 rounded-full p-1 transition-colors ${
        checked ? "bg-blue-600" : "bg-gray-300"
      }`}
    >
      <div
        className={`w-4 h-4 rounded-full bg-white shadow transform transition-transform ${
          checked ? "translate-x-4" : "translate-x-0"
        }`}
      />
    </button>
  );
}
