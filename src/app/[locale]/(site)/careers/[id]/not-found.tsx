import Link from "next/link";
import { LucideBriefcase, LucideArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-[400px] flex flex-col items-center justify-center px-4 text-center">
      <div className="w-20 h-20 rounded-full bg-slate-100 flex items-center justify-center mb-6">
        <LucideBriefcase className="text-slate-400" size={40} />
      </div>
      <h2 className="text-2xl font-bold text-slate-900 mb-2">Job Not Found</h2>
      <p className="text-slate-500 mb-6 max-w-md">
        The job position you&apos;re looking for doesn&apos;t exist or has been removed.
      </p>
      <Link
        href="/careers"
        className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-white font-semibold rounded-xl hover:bg-primary-600 transition-colors"
      >
        <LucideArrowLeft size={18} />
        Back to Careers
      </Link>
    </div>
  );
}
