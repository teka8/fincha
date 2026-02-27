"use client";

import { useMemo, useState } from "react";
import {
  ArrowLeft,
  Award,
  Briefcase,
  Calendar,
  CheckCircle,
  Clock,
  Download,
  ExternalLink,
  Eye,
  File,
  FileText,
  Globe,
  Info,
  Mail,
  Package,
  Phone,
  Send,
  Star,
  Upload,
  Users,
  X,
  AlertCircle,
} from "lucide-react";

import { Link } from "@/i18n/routing";
import type { Tender, TenderAward, TenderDocument } from "@/types/cms";
import { submitTenderApplication } from "@/services/tenderService";

type Props = {
  tender: Tender | null;
  locale: string;
};

type SubmitStatus = "loading" | "success" | "error" | null;

function formatDate(dateString: string | undefined, locale: string) {
  if (!dateString) return "";
  const date = new Date(dateString);
  return date.toLocaleDateString(locale, {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

function getStatusBadge(status?: string) {
  const map: Record<string, { label: string; cls: string }> = {
    published: { label: "Open", cls: "bg-emerald-100 text-emerald-800" },
    open: { label: "Open", cls: "bg-emerald-100 text-emerald-800" },
    closed: { label: "Closed", cls: "bg-rose-100 text-rose-800" },
    awarded: { label: "Awarded", cls: "bg-amber-100 text-amber-800" },
  };
  return map[status ?? ""] ?? { label: status ?? "Unknown", cls: "bg-slate-100 text-slate-700" };
}

function getTypeBadge(type?: string) {
  const map: Record<string, { label: string; cls: string }> = {
    open: { label: "Open Tender", cls: "bg-blue-100 text-blue-800" },
    limited: { label: "Limited Tender", cls: "bg-purple-100 text-purple-800" },
    rfq: { label: "RFQ", cls: "bg-orange-100 text-orange-800" },
  };
  return map[type ?? ""] ?? { label: type ?? "Tender", cls: "bg-slate-100 text-slate-700" };
}

function DocumentCard({ doc }: { doc: TenderDocument }) {
  const fmtSize = (bytes?: number) => {
    if (!bytes || Number.isNaN(bytes)) return "Unknown size";
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const idx = Math.floor(Math.log(bytes) / Math.log(1024));
    return `${(bytes / Math.pow(1024, idx)).toFixed(1)} ${sizes[idx]}`;
  };

  return (
    <div className="group flex items-center justify-between p-4 bg-white rounded-xl border border-slate-100 hover:border-primary hover:shadow-md transition-all duration-200">
      <div className="flex items-center gap-4 flex-1 min-w-0">
        <div className="p-3 bg-rose-50 rounded-xl flex-shrink-0">
          <File className="w-5 h-5 text-rose-500" />
        </div>
        <div className="min-w-0 flex-1">
          <h4 className="font-semibold text-slate-900 truncate text-sm">{doc.title}</h4>
          <p className="text-xs text-slate-500 mt-0.5">
            {fmtSize(doc.file_size)} - {(doc.file_extension ?? "").toUpperCase()}
          </p>
        </div>
      </div>
      <a
        href={doc.file_url}
        target="_blank"
        rel="noopener noreferrer"
        className="ml-4 p-2.5 text-primary hover:bg-primary/10 rounded-lg transition-colors flex-shrink-0"
        title="View document"
      >
        <ExternalLink className="w-5 h-5" />
      </a>
    </div>
  );
}

function AwardCard({ award, locale }: { award: TenderAward; locale: string }) {
  const formatCurrency = (n?: number) =>
    n
      ? new Intl.NumberFormat(locale, {
          style: "currency",
          currency: "ETB",
          minimumFractionDigits: 0,
        }).format(n)
      : "N/A";

  return (
    <div className="bg-gradient-to-br from-amber-50 via-yellow-50 to-orange-50 rounded-2xl p-6 border border-amber-200">
      <div className="flex items-center gap-3 mb-5">
        <div className="p-2.5 bg-amber-100 rounded-xl">
          <Award className="w-5 h-5 text-amber-600" />
        </div>
        <h3 className="text-base font-bold text-slate-900">Award Information</h3>
      </div>
      <div className="space-y-3">
        <div className="flex justify-between items-center py-2 border-b border-amber-200/50">
          <span className="text-sm text-slate-600 flex items-center gap-2">
            <Star className="w-4 h-4" /> Awarded Company
          </span>
          <span className="font-bold text-slate-900 text-sm text-right">{award.awarded_company_name}</span>
        </div>
        <div className="flex justify-between items-center py-2 border-b border-amber-200/50">
          <span className="text-sm text-slate-600 flex items-center gap-2">
            <Globe className="w-4 h-4" /> Contract Value
          </span>
          <span className="font-bold text-emerald-600">{formatCurrency(award.contract_value)}</span>
        </div>
        <div className="flex justify-between items-center py-2">
          <span className="text-sm text-slate-600 flex items-center gap-2">
            <Calendar className="w-4 h-4" /> Award Date
          </span>
          <span className="font-medium text-slate-900 text-sm">
            {formatDate(award.award_date, locale)}
          </span>
        </div>
        {award.award_document_url && (
          <div className="pt-4 border-t border-amber-200">
            <a
              href={award.award_document_url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm text-amber-700 hover:underline font-medium"
            >
              <Download className="w-4 h-4" /> Download Award Document
            </a>
          </div>
        )}
      </div>
    </div>
  );
}

function ParticipantList({ companies }: { companies: string[] }) {
  if (!companies.length) return null;
  return (
    <div className="bg-white rounded-2xl p-6 border border-slate-100">
      <div className="flex items-center gap-3 mb-5">
        <div className="p-2.5 bg-blue-50 rounded-xl">
          <Users className="w-5 h-5 text-blue-600" />
        </div>
        <h3 className="text-base font-bold text-slate-900">
          Participating Companies ({companies.length})
        </h3>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {companies.map((company, i) => (
          <div key={`${company}-${i}`} className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg">
            <div className="w-8 h-8 bg-emerald-50 rounded-full flex items-center justify-center">
              <CheckCircle className="w-4 h-4 text-emerald-600" />
            </div>
            <span className="text-slate-700 font-medium text-sm">{company}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
function InfoCard({
  icon: Icon,
  label,
  value,
  highlight,
}: {
  icon: typeof Calendar;
  label: string;
  value: string;
  highlight?: boolean;
}) {
  return (
    <div className="flex items-center gap-3 p-4 bg-white rounded-xl border border-slate-100">
      <div className={`p-2.5 rounded-xl flex-shrink-0 ${highlight ? "bg-primary/10" : "bg-slate-100"}`}>
        <Icon className={`w-5 h-5 ${highlight ? "text-primary" : "text-slate-500"}`} />
      </div>
      <div>
        <p className="text-xs text-slate-500">{label}</p>
        <p className="font-semibold text-slate-900 text-sm">{value}</p>
      </div>
    </div>
  );
}

function Field({
  icon: Icon,
  label,
  required,
  children,
}: {
  icon?: typeof Mail;
  label: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div className="group">
      <label className="flex items-center gap-2 text-xs font-bold text-slate-700 mb-3 uppercase tracking-widest">
        {Icon && <Icon className="text-primary" style={{ fontSize: 10 }} />}
        {label}
        {required && <span className="text-rose-500">*</span>}
      </label>
      {children}
    </div>
  );
}

const inputCls =
  "w-full px-5 py-4 bg-slate-50 border border-transparent " +
  "group-focus-within:border-primary/30 group-focus-within:bg-white " +
  "rounded-2xl transition-all outline-none font-medium placeholder:text-slate-300 " +
  "text-slate-900";

function TenderApplicationForm({
  tender,
  onClose,
  onSuccess,
}: {
  tender: Tender;
  onClose: () => void;
  onSuccess: (msg: string) => void;
}) {
  const [formData, setFormData] = useState({
    company_name: "",
    email: "",
    phone: "",
    message: "",
    proposals: [] as File[],
  });
  const [submitStatus, setSubmitStatus] = useState<SubmitStatus>(null);
  const [submitMessage, setSubmitMessage] = useState("");
  const deadlineValue = tender.deadline_at ?? tender.deadline;
  const deadlineLabel = deadlineValue
    ? new Date(deadlineValue).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : "No deadline";
  const methodLabel = tender.submission_method
    ? tender.submission_method.charAt(0).toUpperCase() + tender.submission_method.slice(1)
    : "N/A";

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    if (type === "file") {
      const input = e.target as HTMLInputElement;
      const newFiles = Array.from(input.files ?? []);
      setFormData((prev) => ({
        ...prev,
        proposals: [...prev.proposals, ...newFiles],
      }));
      return;
    }
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const removeFile = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      proposals: prev.proposals.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitStatus("loading");
    setSubmitMessage("");

    const fd = new FormData();
    Object.entries(formData).forEach(([k, v]) => {
      if (k === "proposals") {
        v.forEach((file) => fd.append("proposals[]", file));
      } else if (v !== null && v !== undefined) {
        fd.append(k, v as string);
      }
    });

    try {
      const res = await submitTenderApplication(tender.id, fd);
      setSubmitStatus("success");
      const msg =
        typeof res === "object" && res && "message" in res
          ? String((res as { message?: string }).message ?? "Application submitted successfully!")
          : "Application submitted successfully!";
      setSubmitMessage(msg);
      setFormData({ company_name: "", email: "", phone: "", message: "", proposals: [] });
      setTimeout(() => window.scrollTo({ top: 0, behavior: "smooth" }), 100);
      onSuccess(msg);
      setTimeout(() => onClose(), 200);
    } catch (err) {
      setSubmitStatus("error");
      const errData = (err as { data?: unknown }).data;
      let msg = "Something went wrong. Please check your inputs and try again.";
      if (errData && typeof errData === "object") {
        const typed = errData as { message?: string; errors?: Record<string, string[] | string> };
        if (typed.message) msg = typed.message;
        if (typed.errors) {
          const first = Object.values(typed.errors)[0];
          if (Array.isArray(first)) msg = first[0] ?? msg;
          if (typeof first === "string") msg = first;
        }
      }
      setSubmitMessage(msg);
      document.getElementById("tender-form-error")?.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  };

  return (
    <div id="tender-application-form" className="mt-16 scroll-mt-32">
      <div className="bg-white rounded-[2.5rem] shadow-[0_40px_100px_-20px_rgba(0,0,0,0.1)] border border-slate-100 overflow-hidden">
        <div className="p-8 md:p-12 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-6 bg-slate-50/70">
          <div>
            <p className="text-xs font-bold text-primary uppercase tracking-widest mb-2">Submit Proposal</p>
            <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900">Apply for this Tender</h2>
            <p className="text-slate-500 text-sm mt-2 font-medium">
              Fill in your company details and upload your proposal document.
            </p>
            <div className="mt-5 flex flex-wrap gap-2 text-[10px] font-bold uppercase tracking-widest text-slate-500">
              <span className="px-3 py-1 rounded-full bg-white border border-slate-200">Step 1: Company</span>
              <span className="px-3 py-1 rounded-full bg-white border border-slate-200">Step 2: Documents</span>
              <span className="px-3 py-1 rounded-full bg-white border border-slate-200">Step 3: Submit</span>
            </div>
          </div>
          <button
            onClick={onClose}
            className="self-start sm:self-auto px-5 py-3 bg-white text-slate-400 hover:text-rose-500 rounded-2xl font-bold uppercase tracking-widest text-xs flex items-center gap-2 border border-slate-100 transition-all shadow-sm flex-shrink-0"
          >
            Cancel <X className="w-4 h-4" />
          </button>
        </div>

        <div className="p-8 md:p-12">
          {submitStatus === "error" && (
            <div id="tender-form-error" className="bg-rose-50 text-rose-600 p-5 rounded-2xl mb-10 font-bold flex items-start gap-4 ring-1 ring-rose-200">
              <AlertCircle className="text-xl flex-shrink-0 mt-0.5" />
              <p>{submitMessage}</p>
            </div>
          )}
          <form onSubmit={handleSubmit} className="space-y-10">
            <div className="grid grid-cols-1 lg:grid-cols-[1.15fr_0.85fr] gap-10">
              <div className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <Field icon={Briefcase} label="Company Name" required>
                    <input
                      type="text"
                      name="company_name"
                      value={formData.company_name}
                      onChange={handleChange}
                      required
                      placeholder="e.g. ABC Construction PLC"
                      className={inputCls}
                    />
                  </Field>
                  <Field icon={Mail} label="Email Address" required>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      placeholder="e.g. contact@company.com"
                      className={inputCls}
                    />
                  </Field>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <Field icon={Phone} label="Phone Number" required>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                      placeholder="e.g. +251 911 000 000"
                      className={inputCls}
                    />
                  </Field>
                </div>

                <Field icon={Upload} label="Proposal Documents" required>
                  <div className="space-y-4">
                    <div className="relative">
                      <div className="flex flex-col items-center justify-center w-full min-h-[160px] bg-slate-50 border-2 border-dashed border-slate-200 rounded-[2rem] hover:border-primary/50 hover:bg-white transition-all group overflow-hidden cursor-pointer">
                        <input
                          type="file"
                          name="proposals"
                          onChange={handleChange}
                          accept=".pdf,.doc,.docx,.zip,.xls,.xlsx,.ppt,.pptx"
                          multiple
                          required={formData.proposals.length === 0}
                          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                        />
                        <div className="flex flex-col items-center gap-3 py-6 px-8 text-center pointer-events-none">
                          <div className="w-14 h-14 bg-white shadow-sm rounded-2xl flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                            <Upload className="w-6 h-6" />
                          </div>
                          <div>
                            <p className="font-bold text-slate-700">
                              Click to upload or drag and drop multiple files
                            </p>
                            <p className="text-xs text-slate-500 mt-1">
                              Accepted: PDF, DOC, DOCX, XLS, PPT, ZIP
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {formData.proposals.length > 0 && (
                      <div className="space-y-3">
                        <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">Uploaded files</p>
                        <div className="space-y-2">
                          {formData.proposals.map((file, idx) => (
                            <div key={`${file.name}-${idx}`} className="flex items-center justify-between p-3 bg-slate-50 rounded-xl border border-slate-100">
                              <div className="flex items-center gap-3 min-w-0">
                                <div className="p-2 bg-white rounded-lg border border-slate-100">
                                  <FileText className="w-4 h-4 text-slate-500" />
                                </div>
                                <div className="min-w-0">
                                  <p className="font-semibold text-slate-800 text-sm truncate">{file.name}</p>
                                  <p className="text-xs text-slate-500">
                                    {(file.size / (1024 * 1024)).toFixed(2)} MB
                                  </p>
                                </div>
                              </div>
                              <button
                                type="button"
                                onClick={() => removeFile(idx)}
                                className="p-2 text-slate-400 hover:text-rose-500 transition-colors"
                              >
                                <X className="w-4 h-4" />
                              </button>
                            </div>
                          ))}
                        </div>
                        <div className="text-xs text-amber-600 flex items-center gap-2">
                          <Info className="w-3 h-3" /> Please attach all required documents as specified in the tender requirements.
                        </div>
                      </div>
                    )}
                  </div>
                </Field>

                <Field icon={Info} label="Additional Notes">
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={5}
                    placeholder="Any additional message or notes (optional)"
                    className={`${inputCls} resize-none`}
                  />
                </Field>
              </div>

              <div className="space-y-6">
                <div className="bg-slate-50 border border-slate-200 rounded-3xl p-6">
                  <h3 className="text-sm font-bold text-slate-900 uppercase tracking-widest mb-4">Application Checklist</h3>
                  <div className="space-y-3">
                    {[
                      "Complete company details",
                      "Upload proposal documents",
                      "Review for accuracy",
                      "Submit and receive confirmation",
                    ].map((item) => (
                      <div key={item} className="flex items-center gap-3 text-slate-700 text-sm">
                        <div className="w-7 h-7 rounded-full bg-white border border-slate-200 flex items-center justify-center">
                          <CheckCircle className="w-4 h-4 text-emerald-600" />
                        </div>
                        <span className="font-medium">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-white border border-slate-100 rounded-3xl p-6 shadow-sm">
                  <h3 className="text-sm font-bold text-slate-900 uppercase tracking-widest mb-4">Submission Summary</h3>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div className="bg-slate-50 rounded-2xl p-4">
                      <p className="text-xs text-slate-500 uppercase tracking-widest">Deadline</p>
                      <p className="font-semibold text-slate-900 mt-1">{deadlineLabel}</p>
                    </div>
                    <div className="bg-slate-50 rounded-2xl p-4">
                      <p className="text-xs text-slate-500 uppercase tracking-widest">Method</p>
                      <p className="font-semibold text-slate-900 mt-1">{methodLabel}</p>
                    </div>
                    <div className="bg-slate-50 rounded-2xl p-4">
                      <p className="text-xs text-slate-500 uppercase tracking-widest">Documents</p>
                      <p className="font-semibold text-slate-900 mt-1">{tender.documents?.length ?? 0} files</p>
                    </div>
                    <div className="bg-slate-50 rounded-2xl p-4">
                      <p className="text-xs text-slate-500 uppercase tracking-widest">Uploads</p>
                      <p className="font-semibold text-slate-900 mt-1">Multiple files</p>
                    </div>
                  </div>
                  <div className="mt-4 flex items-center gap-2 text-xs text-slate-500">
                    <Info className="w-3 h-3" />
                    Your documents are transmitted securely and stored for review only.
                  </div>
                </div>

                <div className="bg-emerald-50 border border-emerald-100 rounded-3xl p-6">
                  <h3 className="text-sm font-bold text-emerald-900 uppercase tracking-widest mb-3">Need Help?</h3>
                  <p className="text-sm text-emerald-800 leading-relaxed">
                    For clarification on requirements or document formats, contact the procurement office before submitting.
                  </p>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center gap-5 pt-2">
              <button
                type="submit"
                disabled={submitStatus === "loading"}
                className="inline-flex items-center justify-center gap-3 px-7 py-4 bg-primary text-white rounded-2xl font-bold text-sm shadow-lg shadow-primary/25 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-primary/40 transition-all disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {submitStatus === "loading" ? "Submitting..." : "Submit Proposal"}
                <Send className="w-4 h-4" />
              </button>
              <span className="text-sm text-slate-500">
                By submitting, you confirm your proposal complies with the tender requirements.
              </span>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export function TenderDetailView({ tender, locale }: Props) {
  const [isApplying, setIsApplying] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const deadlineValue = tender?.deadline_at ?? tender?.deadline;
  const deadline = deadlineValue ? new Date(deadlineValue) : null;
  const now = useMemo(() => new Date(), []);
  const daysLeft = deadline ? Math.ceil((deadline.getTime() - now.getTime()) / (1000 * 60 * 60 * 24)) : null;
  const isUrgent = daysLeft !== null && daysLeft <= 7 && daysLeft > 0;
  const isDeadlinePassed = daysLeft !== null && daysLeft < 0;

  if (!tender) {
    return (
      <div className="flex flex-col items-center justify-center py-40 min-h-[60vh] text-center px-4">
        <div className="bg-white p-12 rounded-[2rem] shadow-xl border border-slate-100 max-w-md w-full">
          <FileText size={48} className="mx-auto mb-6 text-slate-300" />
          <h2 className="text-2xl font-black text-slate-900 mb-2">Tender Not Found</h2>
          <p className="text-slate-500 mb-8">
            The tender you are looking for does not exist or has been removed.
          </p>
          <Link
            href={{ pathname: "/tenders" }}
            className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-white font-bold rounded-2xl hover:bg-primary/90 transition-all"
          >
            <ArrowLeft size={16} />
            Back to Tenders
          </Link>
        </div>
      </div>
    );
  }

  const statusConfig = getStatusBadge(tender.status);
  const typeConfig = getTypeBadge(tender.tender_type);
  const isOnline = tender.submission_method === "online";
  const isAccepting = (tender.status === "published" || tender.status === "open") && !isDeadlinePassed;
  const canApplyOnline = isOnline && isAccepting;

  const scrollToForm = () => {
    if (!canApplyOnline) return;
    setIsApplying(true);
    setTimeout(() => {
      document.getElementById("tender-application-form")?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 50);
  };

  return (
    <div className="bg-white min-h-screen">
      <div className="bg-gradient-to-br from-slate-900 via-slate-900 to-primary/40 text-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex flex-col gap-6">
            <Link
              href={{ pathname: "/tenders" }}
              className="inline-flex items-center gap-2 text-white/80 hover:text-white transition-colors font-medium text-sm"
            >
              <ArrowLeft className="w-4 h-4" /> Back to Tenders
            </Link>

            <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl p-6 md:p-8 shadow-[0_30px_80px_-40px_rgba(0,0,0,0.6)]">
              <div className="flex flex-wrap items-center gap-3 mb-5">
                <span className={`px-4 py-1.5 rounded-full text-xs font-bold ${typeConfig.cls}`}>{typeConfig.label}</span>
                <span className={`px-4 py-1.5 rounded-full text-xs font-bold ${statusConfig.cls}`}>{statusConfig.label}</span>
                {tender.visibility && (
                  <span className="px-4 py-1.5 rounded-full text-xs font-bold bg-white/15 text-white/90 capitalize">
                    {tender.visibility}
                  </span>
                )}
              </div>

              <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-5 leading-tight">
                {tender.title}
              </h1>

              <div className="flex flex-wrap items-center gap-4 text-white/80 text-sm">
                <span className="inline-flex items-center gap-2 bg-white/10 px-3 py-1.5 rounded-lg">
                  <FileText className="w-4 h-4" />
                  <span className="font-mono">{tender.reference_number ?? "N/A"}</span>
                </span>
                {tender.visibility && (
                  <span className="inline-flex items-center gap-2">
                    <Eye className="w-4 h-4" />
                    <span className="capitalize">Visibility: {tender.visibility}</span>
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {successMessage && (
          <div className="bg-emerald-50 border border-emerald-100 rounded-[2rem] p-8 mb-10 flex flex-col items-center text-center">
            <div className="w-14 h-14 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mb-4">
              <CheckCircle className="w-7 h-7" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-2">Proposal Submitted!</h3>
            <p className="text-emerald-700 font-medium max-w-md">{successMessage}</p>
          </div>
        )}

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <InfoCard icon={Calendar} label="Published" value={formatDate(tender.published_at, locale) || "-"} />
          <InfoCard
            icon={Clock}
            label="Deadline"
            value={deadline ? formatDate(deadlineValue, locale) : "No deadline"}
            highlight={isUrgent}
          />
          <InfoCard
            icon={Info}
            label="Method"
            value={tender.submission_method ? tender.submission_method.charAt(0).toUpperCase() + tender.submission_method.slice(1) : "N/A"}
          />
          <InfoCard icon={File} label="Documents" value={`${tender.documents?.length || 0} files`} />
        </div>

        {deadline && (
          isDeadlinePassed ? (
            <div className="bg-rose-50 border border-rose-200 rounded-2xl p-5 mb-8">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-rose-200 rounded-xl">
                  <Clock className="w-5 h-5 text-rose-600" />
                </div>
                <div>
                  <p className="font-bold text-rose-800">Submissions Closed</p>
                  <p className="text-sm text-rose-600">This tender is no longer accepting submissions</p>
                </div>
              </div>
            </div>
          ) : (
            <div
              className={`rounded-2xl p-5 mb-8 ${
                isUrgent
                  ? "bg-rose-50 border border-rose-200"
                  : "bg-emerald-50 border border-emerald-200"
              }`}
            >
              <div className="flex items-center gap-3">
                <div className={`p-2 rounded-xl ${isUrgent ? "bg-rose-200" : "bg-emerald-200"}`}>
                  <Clock className={`w-5 h-5 ${isUrgent ? "text-rose-600" : "text-emerald-600"}`} />
                </div>
                <div>
                  <p className={`font-bold ${isUrgent ? "text-rose-800" : "text-emerald-800"}`}>
                    {isUrgent ? `Only ${daysLeft} day${daysLeft === 1 ? "" : "s"} remaining - Act now!` : `${daysLeft} days left to submit`}
                  </p>
                  <p className={`text-sm ${isUrgent ? "text-rose-600" : "text-emerald-600"}`}>
                    Submit your proposal before {formatDate(deadlineValue, locale)}
                  </p>
                </div>
              </div>
            </div>
          )
        )}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
              <div className="px-6 py-4 border-b border-slate-100 bg-slate-50">
                <h2 className="text-lg font-bold text-slate-900 flex items-center gap-3">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <FileText className="w-4 h-4 text-primary" />
                  </div>
                  Description
                </h2>
              </div>
              <div className="p-6">
                <div
                  className="prose prose-slate max-w-none text-slate-600 text-sm leading-relaxed"
                  dangerouslySetInnerHTML={{ __html: tender.description }}
                />
              </div>
            </div>

            {tender.requirements && (
              <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
                <div className="px-6 py-4 border-b border-slate-100 bg-slate-50">
                  <h2 className="text-lg font-bold text-slate-900 flex items-center gap-3">
                    <div className="p-2 bg-purple-100 rounded-lg">
                      <Package className="w-4 h-4 text-purple-600" />
                    </div>
                    Requirements
                  </h2>
                </div>
                <div className="p-6">
                  <div
                    className="prose prose-slate max-w-none text-slate-600 text-sm leading-relaxed"
                    dangerouslySetInnerHTML={{ __html: tender.requirements }}
                  />
                </div>
              </div>
            )}

            {tender.submission_guidelines && (
              <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
                <div className="px-6 py-4 border-b border-slate-100 bg-slate-50">
                  <h2 className="text-lg font-bold text-slate-900 flex items-center gap-3">
                    <div className="p-2 bg-amber-100 rounded-lg">
                      <AlertCircle className="w-4 h-4 text-amber-600" />
                    </div>
                    Submission Guidelines
                  </h2>
                </div>
                <div className="p-6">
                  <div
                    className="prose prose-slate max-w-none text-slate-600 text-sm leading-relaxed"
                    dangerouslySetInnerHTML={{ __html: tender.submission_guidelines }}
                  />
                </div>
              </div>
            )}
          </div>

          <div className="space-y-6">
            <div className="bg-white rounded-[2rem] p-7 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.06)] border border-slate-100 overflow-hidden relative">
              {canApplyOnline ? (
                <div className="space-y-5 relative z-10">
                  <div>
                    <p className="text-xs font-bold text-primary uppercase tracking-widest mb-1">Apply Online</p>
                    <h3 className="text-xl font-extrabold text-slate-900 leading-tight">Interested in this tender?</h3>
                  </div>
                  <p className="text-slate-500 text-sm leading-relaxed">
                    Submit your proposal online before the deadline. Ensure all required documents are included.
                  </p>
                  <div className="flex flex-wrap gap-2 text-[10px] font-bold uppercase tracking-widest text-slate-500">
                    <span className="px-3 py-1 rounded-full bg-slate-100">Company Details</span>
                    <span className="px-3 py-1 rounded-full bg-slate-100">Documents</span>
                    <span className="px-3 py-1 rounded-full bg-slate-100">Submit</span>
                  </div>
                  {daysLeft !== null && (
                    <div
                      className={`flex items-center gap-2 text-sm font-semibold rounded-xl px-4 py-2.5 ${
                        isUrgent
                          ? "bg-rose-50 text-rose-600"
                          : "bg-emerald-50 text-emerald-700"
                      }`}
                    >
                      <Clock className="w-4 h-4 flex-shrink-0" />
                      {daysLeft} day{daysLeft === 1 ? "" : "s"} remaining
                    </div>
                  )}
                  <button
                    onClick={scrollToForm}
                    className="w-full py-4 bg-primary text-white rounded-2xl font-bold text-base shadow-lg shadow-primary/25 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-primary/40 transition-all flex justify-center items-center gap-3 active:scale-95"
                  >
                    Submit Proposal <Send className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <div className="space-y-5 text-center py-2">
                  <div className="w-14 h-14 bg-slate-100 text-slate-400 rounded-full flex items-center justify-center mx-auto">
                    {isDeadlinePassed ? <Clock className="w-6 h-6" /> : <Info className="w-6 h-6" />}
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-slate-800">
                      {isDeadlinePassed
                        ? "Submission Closed"
                        : tender.status !== "published" && tender.status !== "open"
                          ? "Not Currently Open"
                          : "Physical Submission"}
                    </h3>
                    <p className="text-slate-500 text-sm mt-2 leading-relaxed">
                      {isDeadlinePassed
                        ? "The deadline for this tender has passed."
                        : tender.status !== "published" && tender.status !== "open"
                          ? "This tender is not currently accepting applications."
                          : "This tender requires physical submission. Please refer to the submission guidelines above."}
                    </p>
                  </div>
                  <Link href={{ pathname: "/tenders" }} className="inline-block text-primary font-bold hover:underline text-sm">
                    View All Tenders
                  </Link>
                </div>
              )}
              <div className="absolute -bottom-10 -right-10 w-28 h-28 bg-primary/5 rounded-full blur-3xl" />
            </div>

            <div className="bg-slate-900 rounded-[2rem] p-7 text-white overflow-hidden relative">
              <h4 className="text-base font-bold mb-5 flex items-center gap-2">
                <div className="w-1.5 h-5 bg-primary rounded-full" />
                Quick Reference
              </h4>
              <ul className="space-y-4">
                {[
                  { label: "Reference No.", value: tender.reference_number ?? "N/A" },
                  { label: "Tender Type", value: typeConfig.label },
                  { label: "Status", value: statusConfig.label },
                  {
                    label: "Submission",
                    value: tender.submission_method
                      ? tender.submission_method.charAt(0).toUpperCase() + tender.submission_method.slice(1)
                      : "N/A",
                  },
                ].map((item) => (
                  <li key={item.label} className="flex items-start gap-4">
                    <div className="p-2 bg-white/10 rounded-lg mt-0.5">
                      <CheckCircle className="w-3 h-3 text-primary" />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-0.5">
                        {item.label}
                      </p>
                      <p className="font-semibold text-sm">{item.value}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            {tender.documents && tender.documents.length > 0 && (
              <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
                <div className="px-5 py-4 border-b border-slate-100 bg-slate-50">
                  <h3 className="font-bold text-slate-900 flex items-center gap-2 text-sm">
                    <Download className="w-4 h-4 text-primary" />
                    Tender Documents ({tender.documents.length})
                  </h3>
                </div>
                <div className="p-4 space-y-3">
                  {tender.documents.map((doc) => (
                    <DocumentCard key={doc.id} doc={doc} />
                  ))}
                </div>
              </div>
            )}

            {tender.award && <AwardCard award={tender.award} locale={locale} />}
          </div>
        </div>

        {tender.participating_companies && tender.participating_companies.length > 0 && (
          <div className="mt-8 mb-4">
            <ParticipantList companies={tender.participating_companies} />
          </div>
        )}

        {isApplying && canApplyOnline && (
          <TenderApplicationForm
            tender={tender}
            onClose={() => setIsApplying(false)}
            onSuccess={(msg) => setSuccessMessage(msg)}
          />
        )}

        <div className="h-20" />
      </div>
    </div>
  );
}
