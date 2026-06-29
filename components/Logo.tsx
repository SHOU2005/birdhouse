import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";

export default function Logo({
  className,
  light = false,
}: {
  className?: string;
  light?: boolean;
}) {
  return (
    <Link
      href="/"
      className={cn("inline-flex items-center", className)}
      aria-label="Birdhouse home"
    >
      <Image
        src="/birdhouse-logo.webp"
        alt="Birdhouse"
        width={150}
        height={49}
        priority
        className={cn("h-10 w-auto", light && "brightness-0 invert")}
      />
    </Link>
  );
}
