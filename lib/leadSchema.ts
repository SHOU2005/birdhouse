import { z } from "zod";

export const leadSchema = z.object({
  name: z.string().min(2, "Please enter your full name"),
  phone: z
    .string()
    .regex(/^[6-9]\d{9}$/, "Enter a valid 10-digit mobile number"),
  email: z.string().email("Enter a valid email address"),
  location: z.string().min(1, "Please select a location"),
  propertyType: z.string().min(1, "Please select a property type"),
  budget: z.string().optional(),
  message: z.string().optional(),
  // Honeypot — real users never fill this; checked in the API route.
  company: z.string().optional(),
});

export type LeadInput = z.infer<typeof leadSchema>;
