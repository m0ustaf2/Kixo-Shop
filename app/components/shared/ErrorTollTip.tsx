import { AlertCircle } from "lucide-react";
import React from "react";

export default function ErrorTollTip({ message }: { message: string }) {
  return (
    <>
      <AlertCircle className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-red-500 z-10" />
      <div className="absolute left-0 top-full mt-2 bg-red-500 text-white text-xs px-3 py-2 rounded-lg shadow-lg whitespace-nowrap z-50 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
        {message}
        <div className="absolute -top-1 left-4 w-2 h-2 bg-red-500 transform rotate-45" />
      </div>
    </>
  );
}
