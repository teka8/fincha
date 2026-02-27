"use client";

import { useState } from "react";
import { LucideUser, LucideMail, LucidePhone, LucideFileText, LucideUpload, LucideCheck, LucideLoader2, LucideShare2, LucideArrowDown, LucideX } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface ApplicationFormProps {
  jobId: number;
  jobTitle: string;
  locale: string;
}

export function ApplicationForm({ jobId, jobTitle, locale }: ApplicationFormProps) {
  const [showForm, setShowForm] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    coverLetter: "",
  });
  const [resume, setResume] = useState<File | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.firstName.trim()) {
      newErrors.firstName = "First name is required";
    }
    
    if (!formData.lastName.trim()) {
      newErrors.lastName = "Last name is required";
    }
    
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Invalid email format";
    }
    
    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required";
    }
    
    if (!resume) {
      newErrors.resume = "Resume is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setIsSubmitting(true);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));

    setIsSubmitting(false);
    setIsSuccess(true);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: "" }));
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setResume(file);
      if (errors.resume) {
        setErrors(prev => ({ ...prev, resume: "" }));
      }
    }
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: jobTitle,
          text: `Check out this job opening: ${jobTitle}`,
          url: window.location.href,
        });
      } catch (err) {
        console.log("Share cancelled");
      }
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert("Link copied to clipboard!");
    }
  };

  return (
    <AnimatePresence mode="wait">
      {!showForm ? (
        <motion.div
          key="interested"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="text-center py-4"
        >
          <h3 className="text-lg font-bold text-slate-900 mb-2">Interested in this role?</h3>
          <p className="text-slate-500 mb-6">
            Join our team and help us build the future. We&apos;re looking for passionate individuals.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <button
              type="button"
              onClick={() => setShowForm(true)}
              className="px-6 py-3 bg-primary text-white font-bold rounded-xl hover:bg-primary-600 transition-colors flex items-center justify-center gap-2"
            >
              Apply Now
              <LucideArrowDown size={18} />
            </button>
            <button
              type="button"
              onClick={handleShare}
              className="px-6 py-3 border border-slate-200 text-slate-700 font-semibold rounded-xl hover:bg-slate-50 transition-colors flex items-center justify-center gap-2"
            >
              <LucideShare2 size={18} />
              Share Opening
            </button>
          </div>
        </motion.div>
      ) : isSuccess ? (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center py-8"
      >
        <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-6">
          <LucideCheck className="text-green-600" size={40} />
        </div>
        <h3 className="text-2xl font-bold text-slate-900 mb-2">Application Submitted!</h3>
        <p className="text-slate-500 mb-6">
          Application submitted successfully. A confirmation email has been sent to your address.
        </p>
        <button
          onClick={() => {
            setIsSuccess(false);
            setFormData({ firstName: "", lastName: "", email: "", phone: "", coverLetter: "" });
            setResume(null);
          }}
          className="text-primary font-semibold hover:underline"
        >
          Submit another application
        </button>
      </motion.div>
    ) : (
      <motion.form
        key="form"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        onSubmit={handleSubmit} 
        className="space-y-5"
      >
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
              <LucideFileText className="text-primary" size={20} />
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-900">Apply Now</h2>
            </div>
          </div>
          <button
            type="button"
            onClick={() => setShowForm(false)}
            className="text-sm font-medium text-slate-500 hover:text-green-700 transition-colors"
          >
            Cancel
          </button>
        </div>
      {/* First Name & Last Name */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">First Name *</label>
          <div className="relative">
            <LucideUser className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleInputChange}
              placeholder="John"
              className={`w-full pl-12 pr-4 py-3.5 bg-slate-50 border rounded-xl text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all ${
                errors.firstName ? "border-red-300 focus:border-red-400" : "border-slate-100 focus:border-primary"
              }`}
            />
          </div>
          {errors.firstName && <p className="mt-1.5 text-sm text-red-500">{errors.firstName}</p>}
        </div>
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">Last Name *</label>
          <div className="relative">
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleInputChange}
              placeholder="Doe"
              className={`w-full px-4 py-3.5 bg-slate-50 border rounded-xl text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all ${
                errors.lastName ? "border-red-300 focus:border-red-400" : "border-slate-100 focus:border-primary"
              }`}
            />
          </div>
          {errors.lastName && <p className="mt-1.5 text-sm text-red-500">{errors.lastName}</p>}
        </div>
      </div>

      {/* Email */}
      <div>
        <label className="block text-sm font-semibold text-slate-700 mb-2">Email Address *</label>
        <div className="relative">
          <LucideMail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            placeholder="john@example.com"
            className={`w-full pl-12 pr-4 py-3.5 bg-slate-50 border rounded-xl text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all ${
              errors.email ? "border-red-300 focus:border-red-400" : "border-slate-100 focus:border-primary"
            }`}
          />
        </div>
        {errors.email && <p className="mt-1.5 text-sm text-red-500">{errors.email}</p>}
      </div>

      {/* Phone */}
      <div>
        <label className="block text-sm font-semibold text-slate-700 mb-2">Phone Number *</label>
        <div className="relative">
          <LucidePhone className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleInputChange}
            placeholder="+251 912 345 678"
            className={`w-full pl-12 pr-4 py-3.5 bg-slate-50 border rounded-xl text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all ${
              errors.phone ? "border-red-300 focus:border-red-400" : "border-slate-100 focus:border-primary"
            }`}
          />
        </div>
        {errors.phone && <p className="mt-1.5 text-sm text-red-500">{errors.phone}</p>}
      </div>

      {/* Resume Upload */}
      <div>
        <label className="block text-sm font-semibold text-slate-700 mb-2">Resume / CV *</label>
        <div className={`relative border-2 border-dashed rounded-xl p-4 transition-colors ${
          errors.resume ? "border-red-300 bg-red-50/50" : "border-slate-200 hover:border-primary/50"
        }`}>
          <input
            type="file"
            accept=".pdf,.doc,.docx"
            onChange={handleFileChange}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          />
          <div className="flex items-center gap-3">
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
              resume ? "bg-primary/10" : "bg-slate-100"
            }`}>
              {resume ? (
                <LucideFileText className="text-primary" size={24} />
              ) : (
                <LucideUpload className="text-slate-400" size={24} />
              )}
            </div>
            <div className="flex-1">
              {resume ? (
                <p className="font-medium text-slate-900">{resume.name}</p>
              ) : (
                <>
                  <p className="font-medium text-slate-700">Click to upload</p>
                  <p className="text-sm text-slate-400">PDF, DOC, or DOCX (max 5MB)</p>
                </>
              )}
            </div>
          </div>
        </div>
        {errors.resume && <p className="mt-1.5 text-sm text-red-500">{errors.resume}</p>}
      </div>

      {/* Cover Letter */}
      <div>
        <label className="block text-sm font-semibold text-slate-700 mb-2">
          Cover Letter 
          <span className="text-slate-400 font-normal">(Optional)</span>
        </label>
        <textarea
          name="coverLetter"
          value={formData.coverLetter}
          onChange={handleInputChange}
          rows={4}
          placeholder="Tell us why you're the perfect fit for this role..."
          className="w-full px-4 py-3.5 bg-slate-50 border border-slate-100 rounded-xl text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all resize-none"
        />
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full py-4 bg-primary text-white font-bold rounded-xl hover:bg-primary-600 transition-all disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
      >
        {isSubmitting ? (
          <>
            <LucideLoader2 className="animate-spin" size={20} />
            Submitting...
          </>
        ) : (
          <>
            Submit Application
            <LucideCheck size={20} />
          </>
        )}
      </button>

      <p className="text-xs text-slate-400 text-center">
        By submitting, you agree to our privacy policy and consent to be contacted regarding your application.
      </p>
    </motion.form>
    )}
    </AnimatePresence>
  );
}
