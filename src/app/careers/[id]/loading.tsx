import { LucideLoader2 } from "lucide-react";

export default function Loading() {
  return (
    <div className="min-h-[400px] flex items-center justify-center">
      <LucideLoader2 className="animate-spin text-primary" size={40} />
    </div>
  );
}
