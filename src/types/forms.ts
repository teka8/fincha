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
  name: z.string().min(2),
  email: z.string().email(),
  company: z.string().min(2),
  phone: z.string().min(6),
  document: z.instanceof(File),
});

export type ContactFormValues = z.infer<typeof contactSchema>;
export type NewsletterFormValues = z.infer<typeof newsletterSchema>;
export type JobApplicationFormValues = z.infer<typeof jobApplicationSchema>;
export type TenderApplicationFormValues = z.infer<typeof tenderApplicationSchema>;
