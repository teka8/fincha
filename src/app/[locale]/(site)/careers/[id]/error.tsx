"use client";

import { useEffect } from "react";
import { LucideAlertCircle } from "lucide-react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-[400px] flex flex-col items-center justify-center px-4 text-center">
      <div className="w-16 h-16 rounded-full bg-red-100 flex items-center justify-center mb-6">
        <LucideAlertCircle className="text-red-500" size={32} />
      </div>
      <h2 className="text-2xl font-bold text-slate-900 mb-2">Something went wrong</h2>
      <p className="text-slate-500 mb-6 max-w-md">
        We encountered an error while loading this page. Please try again.
      </p>
      <button
        onClick={() => reset()}
        className="px-6 py-3 bg-primary text-white font-semibold rounded-xl hover:bg-primary-600 transition-colors"
      >
        Try again
      </button>
    </div>
  );
}
