import { z } from "zod";

export const contactSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  phone: z.string().optional(),
  subject: z.string().min(5),
  message: z.string().min(10),
});

export const newsletterSchema = z.object({
  email: z.string().email(),
});

export const jobApplicationSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  phone: z.string().min(6),
  resume: z.instanceof(File),
  coverLetter: z.string().optional(),
});

export const tenderApplicationSchema = z.object({
  company_name: z.string().min(2),
  email: z.string().email(),
  phone: z.string().min(6),
  message: z.string().optional(),
  proposals: z.array(z.instanceof(File)).min(1),
});

export type ContactFormValues = z.infer<typeof contactSchema>;
export type NewsletterFormValues = z.infer<typeof newsletterSchema>;
export type JobApplicationFormValues = z.infer<typeof jobApplicationSchema>;
export type TenderApplicationFormValues = z.infer<typeof tenderApplicationSchema>;
