import { Tender, TenderGuideline } from "@/types/cms";
import { Link } from "@/i18n/routing";
import {
  Calendar,
  Clock,
  FileText,
  MapPin,
  ChevronRight,
  Download,
  AlertCircle,
} from "lucide-react";

type Props = {
  tenders: Tender[];
  tenderGuideline?: TenderGuideline | null;
  isError?: boolean;
};

function formatDate(dateString: string | undefined) {
  if (!dateString) return "";
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

function getStatusBadge(status?: string) {
  const statusConfig: Record<string, { label: string; className: string }> = {
    published: { label: "Open", className: "bg-emerald-100 text-emerald-800" },
    closed: { label: "Closed", className: "bg-rose-100 text-rose-800" },
    pending: { label: "Pending", className: "bg-amber-100 text-amber-800" },
  };
  return statusConfig[status ?? ""] ?? { label: status ?? "Unknown", className: "bg-slate-100 text-slate-700" };
}

function getTypeBadge(type?: string) {
  const typeConfig: Record<string, { label: string; className: string }> = {
    open: { label: "Open Tender", className: "bg-blue-100 text-blue-800" },
    limited: { label: "Limited Tender", className: "bg-purple-100 text-purple-800" },
    rfq: { label: "RFQ", className: "bg-orange-100 text-orange-800" },
  };
  return typeConfig[type ?? ""] ?? { label: type ?? "Tender", className: "bg-slate-100 text-slate-700" };
}

function TenderCard({ item }: { item: Tender }) {
  const statusConfig = getStatusBadge(item.status);
  const typeConfig = getTypeBadge(item.tender_type);

  const deadlineValue = item.deadline_at ?? item.deadline;
  const deadline = deadlineValue ? new Date(deadlineValue) : null;
  const now = new Date();
  const daysLeft = deadline ? Math.ceil((deadline.getTime() - now.getTime()) / (1000 * 60 * 60 * 24)) : null;
  const isUrgent = daysLeft !== null && daysLeft <= 7 && daysLeft > 0;

  return (
    <article className="group bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 border border-slate-100 overflow-hidden">
      <div className="p-6">
        <div className="flex flex-wrap items-start justify-between gap-3 mb-4">
          <div className="flex flex-wrap gap-2">
            <span className={`px-3 py-1 rounded-full text-xs font-semibold ${typeConfig.className}`}>
              {typeConfig.label}
            </span>
            <span className={`px-3 py-1 rounded-full text-xs font-semibold ${statusConfig.className}`}>
              {statusConfig.label}
            </span>
          </div>
          {item.reference_number && (
            <span className="text-xs font-mono text-slate-500 bg-slate-100 px-2 py-1 rounded">
              {item.reference_number}
            </span>
          )}
        </div>

        <h3 className="text-lg font-bold text-slate-900 mb-3 line-clamp-2 group-hover:text-primary transition-colors">
          {item.title}
        </h3>

        <p className="text-slate-600 text-sm mb-4 line-clamp-3">
          {(item.description ?? "").replace(/<[^>]*>/g, "").substring(0, 150)}...
        </p>

        <div className="flex flex-wrap gap-4 text-sm text-slate-500 mb-4">
          <div className="flex items-center gap-1.5">
            <Calendar className="w-4 h-4" />
            <span>Published: {formatDate(item.published_at)}</span>
          </div>
          {item.submission_method && (
            <div className="flex items-center gap-1.5">
              <MapPin className="w-4 h-4" />
              <span className="capitalize">{item.submission_method}</span>
            </div>
          )}
        </div>

        {deadlineValue && (
          <div
            className={`flex items-center gap-2 p-3 rounded-lg mb-4 ${
              isUrgent ? "bg-rose-50 text-rose-700" : "bg-slate-50 text-slate-600"
            }`}
          >
            <Clock className={`w-5 h-5 ${isUrgent ? "animate-pulse" : ""}`} />
            <span className="font-medium">
              {isUrgent && daysLeft !== null ? `${daysLeft} days left` : `Deadline: ${formatDate(deadlineValue)}`}
            </span>
          </div>
        )}

        {item.documents && item.documents.length > 0 && (
          <div className="flex items-center gap-2 mb-4">
            <Download className="w-4 h-4 text-slate-400" />
            <span className="text-sm text-slate-500">
              {item.documents.length} document(s) attached
            </span>
          </div>
        )}

        <Link
          href={{ pathname: "/tenders/[id]", params: { id: item.id.toString() } }}
          className="inline-flex items-center justify-center w-full gap-2 px-4 py-2.5 bg-primary/10 hover:bg-primary text-primary hover:text-white font-medium rounded-lg transition-all duration-200 group-hover:gap-3"
        >
          View Details
          <ChevronRight className="w-4 h-4" />
        </Link>
      </div>
    </article>
  );
}

export default function TenderList({ tenders, tenderGuideline, isError }: Props) {
  if (isError) {
    return (
      <div className="text-center py-20">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-rose-100 rounded-full mb-4">
          <FileText className="w-8 h-8 text-rose-500" />
        </div>
        <p className="text-rose-500 text-lg mb-2">Failed to load tenders</p>
        <p className="text-slate-500 text-sm mb-4">Please try again later</p>
      </div>
    );
  }

  const safeTenders = Array.isArray(tenders) ? tenders : [];
  const publishedTenders = safeTenders.filter((t) => t.status === "published" || t.status === "open");

  if (publishedTenders.length === 0) {
    return (
      <div className="text-center py-20">
        <div className="inline-flex items-center justify-center w-20 h-20 bg-slate-100 rounded-full mb-4">
          <FileText className="w-10 h-10 text-slate-400" />
        </div>
        <p className="text-xl font-semibold text-slate-700 mb-2">No Active Tenders</p>
        <p className="text-slate-500">There are no open tenders at the moment. Please check back later.</p>
      </div>
    );
  }

  return (
    <div className="mb-10 max-w-6xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Active Tenders</h2>
          <p className="text-slate-500 mt-1">
            {publishedTenders.length} tender{publishedTenders.length !== 1 ? "s" : ""} available
          </p>
        </div>
        <div className="flex items-center gap-2 text-sm text-slate-500">
          <Clock className="w-4 h-4" />
          <span>Last updated: Just now</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
        {publishedTenders.map((item) => (
          <TenderCard key={item.id} item={item} />
        ))}
      </div>

      {tenderGuideline && (
        <div className="mt-12 bg-gradient-to-r from-primary/5 to-amber-50 rounded-2xl p-6 md:p-8 border border-primary/10">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-primary/10 rounded-lg">
              <AlertCircle className="w-6 h-6 text-primary" />
            </div>
            <h3 className="text-xl font-bold text-slate-900">Tender Guidelines</h3>
          </div>
          {tenderGuideline.content && (
            <div
              className="prose prose-slate max-w-none text-slate-600"
              dangerouslySetInnerHTML={{ __html: tenderGuideline.content }}
            />
          )}
          {tenderGuideline.steps && tenderGuideline.steps.length > 0 && (
            <div className="mt-6">
              <h4 className="font-semibold text-slate-900 mb-3">Submission Steps:</h4>
              <ol className="space-y-2">
                {tenderGuideline.steps.map((step, index) => (
                  <li key={index} className="flex items-start gap-3 text-slate-600">
                    <span className="flex-shrink-0 w-6 h-6 flex items-center justify-center bg-primary text-white text-sm font-medium rounded-full">
                      {index + 1}
                    </span>
                    <span dangerouslySetInnerHTML={{ __html: step }} />
                  </li>
                ))}
              </ol>
            </div>
          )}
          {tenderGuideline.pdf_url && (
            <div className="mt-6">
              <a
                href={tenderGuideline.pdf_url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/80 transition-colors"
              >
                <Download className="w-4 h-4" />
                Download Guidelines {tenderGuideline.pdf_name ? `(${tenderGuideline.pdf_name})` : ""}
              </a>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
