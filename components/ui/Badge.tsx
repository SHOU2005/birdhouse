import { cn } from "@/lib/utils";

type Tone = "primary" | "accent" | "neutral";

const tones: Record<Tone, string> = {
  primary: "bg-primary text-white",
  accent: "bg-accent text-ink",
  neutral: "bg-white/90 text-ink backdrop-blur",
};

export function Badge({
  children,
  tone = "primary",
  className,
}: {
  children: React.ReactNode;
  tone?: Tone;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold shadow-sm",
        tones[tone],
        className
      )}
    >
      {children}
    </span>
  );
}

export default Badge;
