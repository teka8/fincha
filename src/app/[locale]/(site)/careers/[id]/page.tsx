import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";
import { LucideBriefcase, LucideMapPin, LucideClock, LucideArrowLeft, LucideUser, LucideMail, LucidePhone, LucideFileText, LucideCheck } from "lucide-react";

import { SectionContainer } from "@/components/ui/section-heading";
import type { Job } from "@/types/cms";
import { getJobById } from "@/lib/cms";
import { Link } from "@/i18n/routing";
import { ApplicationForm } from "./application-form";

type JobDetailPageProps = {
  params: Promise<{
    locale: string;
    id: string;
  }>;
};

export async function generateMetadata({ params }: JobDetailPageProps): Promise<Metadata> {
  const { locale, id } = await params;
  
  let job = null;
  try {
    job = await getJobById(locale, id);
  } catch (error) {
    console.error("Failed to load job for metadata:", error);
  }
  
  return {
    title: job ? `${job.title} | Careers` : "Job Not Found",
    description: job?.description?.slice(0, 160) || "Apply for this position at Fincha",
  };
}

function getFallbackDescription(id: string, title: string): string {
  const descriptions: Record<string, string> = {
    "1": `<p>We are looking for a Senior Mechanical Engineer to join our engineering team at Fincha Sugar Factory. You will be responsible for designing, developing, and maintaining mechanical systems and equipment used in our sugar processing operations.</p>
    <h4>Responsibilities:</h4>
    <ul>
      <li>Lead mechanical design projects for sugar processing equipment</li>
      <li>Manage maintenance schedules and ensure optimal equipment performance</li>
      <li>Coordinate with contractors and vendors for equipment procurement</li>
      <li>Conduct feasibility studies and cost-benefit analyses for new equipment</li>
      <li>Ensure compliance with safety and quality standards</li>
    </ul>
    <h4>Requirements:</h4>
    <ul>
      <li>5+ years of experience in sugar industry or heavy manufacturing</li>
      <li>Bachelor's degree in Mechanical Engineering</li>
      <li>Strong project management and problem-solving skills</li>
      <li>Excellent communication and teamwork abilities</li>
    </ul>`,
    "2": `<p>Join our agriculture team to help improve cane yields and quality. You will work closely with farmers and provide technical guidance on best agricultural practices.</p>
    <h4>Responsibilities:</h4>
    <ul>
      <li>Develop and implement agronomic practices for cane cultivation</li>
      <li>Monitor crop health and recommend interventions</li>
      <li>Train farmers on best practices and modern techniques</li>
      <li>Conduct soil analysis and recommend fertilization plans</li>
      <li>Work with research teams to improve crop varieties</li>
    </ul>
    <h4>Requirements:</h4>
    <ul>
      <li>3+ years in agricultural sector</li>
      <li>Degree in Agronomy, Crop Science, or related field</li>
      <li>Knowledge of tropical crop management</li>
      <li>Strong communication and training skills</li>
    </ul>`,
    "3": `<p>Manage financial operations for our facility. You will oversee all accounting functions, financial reporting, and budget management.</p>
    <h4>Responsibilities:</h4>
    <ul>
      <li>Oversee all financial accounting and reporting</li>
      <li>Manage budgets, forecasts, and financial planning</li>
      <li>Ensure compliance with financial regulations and standards</li>
      <li>Coordinate with external auditors and tax authorities</li>
      <li>Provide financial analysis for strategic decisions</li>
    </ul>
    <h4>Requirements:</h4>
    <ul>
      <li>CPA or equivalent professional qualification</li>
      <li>5+ years in finance management</li>
      <li>Experience in manufacturing or industrial sector</li>
      <li>Strong analytical and leadership skills</li>
    </ul>`,
    "supervisor": `<p>We are seeking a Production Supervisor to oversee our manufacturing operations. You will ensure efficient production while maintaining quality and safety standards.</p>
    <h4>Responsibilities:</h4>
    <ul>
      <li>Coordinate daily production activities and shift operations</li>
      <li>Monitor production targets and quality metrics</li>
      <li>Train and manage production team members</li>
      <li>Implement process improvements and best practices</li>
      <li>Ensure compliance with safety protocols</li>
    </ul>
    <h4>Requirements:</h4>
    <ul>
      <li>3+ years in production or manufacturing supervision</li>
      <li>Strong leadership and communication skills</li>
      <li>Knowledge of production planning and scheduling</li>
      <li>Problem-solving and analytical abilities</li>
    </ul>`
  };
  
  return descriptions[id] || `<p>Join our team at Fincha Sugar Factory. We are looking for talented individuals to help us continue our mission of producing high-quality sugar products.</p>
    <h4>What we offer:</h4>
    <ul>
      <li>Competitive salary and benefits</li>
      <li>Professional development opportunities</li>
      <li>Dynamic work environment</li>
      <li>Career growth potential</li>
    </ul>`;
}

export default async function JobDetailPage({ params }: JobDetailPageProps) {
  const { locale, id } = await params;
  
  let job: Job | null = null;
  try {
    job = await getJobById(locale, id);
  } catch (error) {
    console.error("Failed to load job:", error);
  }

  // Fallback if job not found - use static data
  if (!job) {
    const fallbackJobs: Record<string, Job> = {
      "1": {
        id: 1,
        title: "Senior Mechanical Engineer",
        department: "Engineering",
        type: "Full-time",
        location: "Fincha Valley, Ethiopia",
        description: `<p>We are looking for a Senior Mechanical Engineer to join our engineering team at Fincha Sugar Factory. You will be responsible for designing, developing, and maintaining mechanical systems and equipment used in our sugar processing operations.</p>
        <h4>Responsibilities:</h4>
        <ul>
          <li>Lead mechanical design projects for sugar processing equipment</li>
          <li>Manage maintenance schedules and ensure optimal equipment performance</li>
          <li>Coordinate with contractors and vendors for equipment procurement</li>
          <li>Conduct feasibility studies and cost-benefit analyses for new equipment</li>
          <li>Ensure compliance with safety and quality standards</li>
        </ul>
        <h4>Requirements:</h4>
        <ul>
          <li>5+ years of experience in sugar industry or heavy manufacturing</li>
          <li>Bachelor's degree in Mechanical Engineering</li>
          <li>Strong project management and problem-solving skills</li>
          <li>Excellent communication and teamwork abilities</li>
        </ul>`,
        closing_date: "2026-03-31",
        created_at: "2026-02-01"
      },
      "2": {
        id: 2,
        title: "Agronomist",
        department: "Agriculture",
        type: "Full-time",
        location: "Fincha Valley, Ethiopia",
        description: `<p>Join our agriculture team to help improve cane yields and quality. You will work closely with farmers and provide technical guidance on best agricultural practices.</p>
        <h4>Responsibilities:</h4>
        <ul>
          <li>Develop and implement agronomic practices for cane cultivation</li>
          <li>Monitor crop health and recommend interventions</li>
          <li>Train farmers on best practices and modern techniques</li>
          <li>Conduct soil analysis and recommend fertilization plans</li>
          <li>Work with research teams to improve crop varieties</li>
        </ul>
        <h4>Requirements:</h4>
        <ul>
          <li>3+ years in agricultural sector</li>
          <li>Degree in Agronomy, Crop Science, or related field</li>
          <li>Knowledge of tropical crop management</li>
          <li>Strong communication and training skills</li>
        </ul>`,
        closing_date: "2026-04-15",
        created_at: "2026-02-10"
      },
      "3": {
        id: 3,
        title: "Finance Manager",
        department: "Finance",
        type: "Full-time",
        location: "Fincha Valley, Ethiopia",
        description: `<p>Manage financial operations for our facility. You will oversee all accounting functions, financial reporting, and budget management.</p>
        <h4>Responsibilities:</h4>
        <ul>
          <li>Oversee all financial accounting and reporting</li>
          <li>Manage budgets, forecasts, and financial planning</li>
          <li>Ensure compliance with financial regulations and standards</li>
          <li>Coordinate with external auditors and tax authorities</li>
          <li>Provide financial analysis for strategic decisions</li>
        </ul>
        <h4>Requirements:</h4>
        <ul>
          <li>CPA or equivalent professional qualification</li>
          <li>5+ years in finance management</li>
          <li>Experience in manufacturing or industrial sector</li>
          <li>Strong analytical and leadership skills</li>
        </ul>`,
        closing_date: "2026-03-20",
        created_at: "2026-02-05"
      },
      "supervisor": {
        id: 4,
        title: "Production Supervisor",
        department: "Operations",
        type: "Full-time",
        location: "Addis Ababa, Ethiopia",
        description: `<p>We are seeking a Production Supervisor to oversee our manufacturing operations. You will ensure efficient production while maintaining quality and safety standards.</p>
        <h4>Responsibilities:</h4>
        <ul>
          <li>Coordinate daily production activities and shift operations</li>
          <li>Monitor production targets and quality metrics</li>
          <li>Train and manage production team members</li>
          <li>Implement process improvements and best practices</li>
          <li>Ensure compliance with safety protocols</li>
        </ul>
        <h4>Requirements:</h4>
        <ul>
          <li>3+ years in production or manufacturing supervision</li>
          <li>Strong leadership and communication skills</li>
          <li>Knowledge of production planning and scheduling</li>
          <li>Problem-solving and analytical abilities</li>
        </ul>`,
        closing_date: "2026-04-01",
        created_at: "2026-02-24"
      }
    };
    job = fallbackJobs[id] || null;
  }

  if (!job) {
    notFound();
  }

  const t = await getTranslations({ locale, namespace: "common" });

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-white border-b border-slate-100 pt-16 pb-8">
        <div className="max-w-layout mx-auto px-6 md:px-8">
          <Link 
            href="/careers" 
            className="inline-flex items-center gap-2 text-slate-500 hover:text-primary mb-6 transition-colors text-sm"
          >
            <LucideArrowLeft size={16} />
            Back to Careers
          </Link>

          <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
            <div className="max-w-2xl">
              <div className="flex flex-wrap gap-2 mb-3">
                <span className="px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold uppercase tracking-wider">
                  {job.department || "Operations"}
                </span>
                <span className={`px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider ${
                  job.type?.toLowerCase().includes("remote") 
                    ? "bg-green-100 text-green-700" 
                    : "bg-slate-100 text-slate-600"
                }`}>
                  {job.type || "Full-time"}
                </span>
              </div>
              
              <h1 className="text-2xl md:text-3xl font-bold text-slate-900 mb-3">
                {job.title}
              </h1>
              
              <div className="flex flex-wrap items-center gap-4 text-slate-500 text-sm">
                <span className="flex items-center gap-1.5">
                  <LucideMapPin size={14} />
                  {job.location || "Fincha Valley, Ethiopia"}
                </span>
                <span className="flex items-center gap-1.5">
                  <LucideClock size={14} />
                  {job.closing_date ? new Date(job.closing_date).toLocaleDateString(locale, { 
                    day: "numeric", 
                    month: "short", 
                    year: "numeric" 
                  }) : "Open"}
                </span>
              </div>
            </div>

            <div className="text-right">
              <p className="text-xs text-slate-400 uppercase tracking-wider mb-1">Deadline</p>
              <p className="text-lg font-bold text-slate-900">
                {job.closing_date ? new Date(job.closing_date).toLocaleDateString(locale, { 
                  day: "numeric", 
                  month: "short", 
                  year: "numeric" 
                }) : "Open until filled"}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}

      {/* Main Content */}
      <SectionContainer className="bg-slate-50 -mt-4 relative z-20 pb-8">
        <div className="grid lg:grid-cols-5 gap-6">
          {/* Job Description */}
          <div className="lg:col-span-3 space-y-6">
            {/* Main Description Card */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
              <div className="bg-gradient-to-r from-primary to-primary-600 px-6 py-4">
                <h2 className="text-lg font-bold text-white flex items-center gap-2">
                  <LucideFileText size={20} />
                  Job Description
                </h2>
              </div>
              <div className="p-6" 
                dangerouslySetInnerHTML={{ __html: job.description && job.description.length > 10 ? job.description : getFallbackDescription(id, job.title || "") }}
              />
            </div>
            
            {/* What We Offer Card */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
              <div className="bg-gradient-to-r from-accent to-accent-400 px-6 py-4">
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <LucideCheck size={20} />
                  What We Offer
                </h3>
              </div>
              <div className="p-6">
                <ul className="grid sm:grid-cols-2 gap-4">
                  {[
                    { icon: "💰", text: "Competitive salary and benefits package" },
                    { icon: "🏥", text: "Health insurance coverage" },
                    { icon: "📚", text: "Professional development opportunities" },
                    { icon: "🏠", text: "Housing allowance or on-site accommodation" },
                    { icon: "🌱", text: "Work in a growing agro-industrial company" }
                  ].map((benefit, i) => (
                    <li key={i} className="flex items-center gap-3 text-slate-600 bg-slate-50 rounded-lg p-3">
                      <span className="text-xl">{benefit.icon}</span>
                      <span className="text-sm font-medium">{benefit.text}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Benefits Cards */}
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                  <LucideCheck className="text-primary" size={24} />
                </div>
                <h3 className="font-bold text-slate-900 mb-2">Growth & Learning</h3>
                <p className="text-sm text-slate-500">Access to industry-leading training, mentorship programs, and career advancement paths.</p>
              </div>
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
                <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center mb-4">
                  <LucideCheck className="text-accent" size={24} />
                </div>
                <h3 className="font-bold text-slate-900 mb-2">Global Culture</h3>
                <p className="text-sm text-slate-500">Work with a diverse, international team on projects that make a real-world impact.</p>
              </div>
            </div>
          </div>

          {/* Application Form & Quick Insights */}
          <div className="lg:col-span-2 space-y-6">
            {/* Application Form Card */}
            <div className="bg-white rounded-2xl shadow-lg border border-primary/10 overflow-hidden sticky top-24">
              <div className="bg-gradient-to-r from-primary to-primary-600 px-6 py-4">
                <h2 className="text-lg font-bold text-white">Apply for this Position</h2>
                <p className="text-primary-100 text-xs">Join our team at Fincha Sugar Factory</p>
              </div>
              <div className="p-6">
                <ApplicationForm jobId={job.id} jobTitle={job.title} locale={locale} />
              </div>
            </div>

            {/* Quick Insights Card */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
              <div className="px-5 py-3 border-b border-slate-100">
                <h3 className="font-semibold text-slate-900">Quick Insights</h3>
              </div>
              <div className="p-5 space-y-4">
                <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                  <span className="text-sm text-slate-500">Role Type</span>
                  <span className="font-semibold text-slate-900 flex items-center gap-2">
                    {job.type?.toLowerCase().includes("remote") ? (
                      <><span className="w-2 h-2 rounded-full bg-green-500"></span> Remote</>
                    ) : (
                      <><span className="w-2 h-2 rounded-full bg-primary"></span> On-site</>
                    )}
                  </span>
                </div>
                <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                  <span className="text-sm text-slate-500">Location</span>
                  <span className="font-semibold text-slate-900">{job.location || "Fincha Valley"}</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                  <span className="text-sm text-slate-500">Status</span>
                  <span className="font-semibold text-green-600 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                    Accepting Applications
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </SectionContainer>
    </div>
  );
}
