"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CheckCircle2, Loader2, Send } from "lucide-react";
import { leadSchema, type LeadInput } from "@/lib/leadSchema";
import {
  Input,
  Select,
  Textarea,
  FieldLabel,
  FieldError,
} from "@/components/ui/Field";
import {
  locationOptions,
  propertyTypeOptions,
  budgetOptions,
} from "@/lib/data/site";
import { cn } from "@/lib/utils";

export default function LeadForm({
  withMessage = false,
  compact = false,
}: {
  withMessage?: boolean;
  compact?: boolean;
}) {
  const {
    register,
    handleSubmit,
    reset,
    setError,
    formState: { errors, isSubmitting, isSubmitSuccessful },
  } = useForm<LeadInput>({
    resolver: zodResolver(leadSchema),
    defaultValues: {
      name: "",
      phone: "",
      email: "",
      location: "",
      propertyType: "",
      budget: "",
      message: "",
      company: "",
    },
  });

  async function onSubmit(values: LeadInput) {
    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        setError("root", {
          message: data.error || "Something went wrong. Please try again.",
        });
        return;
      }
      reset();
    } catch {
      setError("root", {
        message: "Network error. Please call us at 8448040101.",
      });
    }
  }

  if (isSubmitSuccessful) {
    return (
      <div className="flex flex-col items-center justify-center rounded-2xl bg-primary-50 p-8 text-center">
        <CheckCircle2 className="h-12 w-12 text-primary" />
        <h3 className="mt-3 font-display text-xl font-bold text-ink">
          Thank you!
        </h3>
        <p className="mt-1 text-sm text-muted">
          Your request has been received. Our team will call you back shortly.
        </p>
        <button
          type="button"
          onClick={() => reset()}
          className="mt-4 text-sm font-semibold text-primary hover:underline"
        >
          Submit another request
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      className={cn("grid gap-4", compact ? "grid-cols-1" : "sm:grid-cols-2")}
    >
      {/* Honeypot */}
      <input
        type="text"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        className="hidden"
        {...register("company")}
      />

      <div className={compact ? "" : "sm:col-span-2"}>
        <FieldLabel required>Full Name</FieldLabel>
        <Input placeholder="Your name" error={errors.name?.message} {...register("name")} />
        <FieldError message={errors.name?.message} />
      </div>

      <div>
        <FieldLabel required>Contact No.</FieldLabel>
        <Input
          type="tel"
          inputMode="numeric"
          placeholder="10-digit mobile"
          error={errors.phone?.message}
          {...register("phone")}
        />
        <FieldError message={errors.phone?.message} />
      </div>

      <div>
        <FieldLabel required>Email Address</FieldLabel>
        <Input
          type="email"
          placeholder="you@example.com"
          error={errors.email?.message}
          {...register("email")}
        />
        <FieldError message={errors.email?.message} />
      </div>

      <div>
        <FieldLabel required>Location</FieldLabel>
        <Select error={errors.location?.message} {...register("location")}>
          <option value="">-- Location --</option>
          {locationOptions.map((o) => (
            <option key={o} value={o}>
              {o}
            </option>
          ))}
        </Select>
        <FieldError message={errors.location?.message} />
      </div>

      <div>
        <FieldLabel required>Property Type</FieldLabel>
        <Select error={errors.propertyType?.message} {...register("propertyType")}>
          <option value="">-- Property Type --</option>
          {propertyTypeOptions.map((o) => (
            <option key={o} value={o}>
              {o}
            </option>
          ))}
        </Select>
        <FieldError message={errors.propertyType?.message} />
      </div>

      <div className={compact || withMessage ? "" : "sm:col-span-2"}>
        <FieldLabel>Budget</FieldLabel>
        <Select {...register("budget")}>
          <option value="">-- Budget --</option>
          {budgetOptions.map((o) => (
            <option key={o} value={o}>
              {o}
            </option>
          ))}
        </Select>
      </div>

      {withMessage && (
        <div className="sm:col-span-2">
          <FieldLabel>Message</FieldLabel>
          <Textarea placeholder="Tell us what you're looking for..." {...register("message")} />
        </div>
      )}

      {errors.root && (
        <p className="rounded-lg bg-red-50 px-3 py-2 text-sm font-medium text-red-600 sm:col-span-2">
          {errors.root.message}
        </p>
      )}

      <div className={compact ? "" : "sm:col-span-2"}>
        <button
          type="submit"
          disabled={isSubmitting}
          className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-primary px-6 py-3.5 text-base font-semibold text-white shadow-sm transition-all hover:bg-primary-dark disabled:opacity-60"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="h-5 w-5 animate-spin" /> Submitting...
            </>
          ) : (
            <>
              <Send className="h-4 w-4" /> Submit
            </>
          )}
        </button>
      </div>
    </form>
  );
}
