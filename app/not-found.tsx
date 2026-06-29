import { Container } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <Container className="flex min-h-[60vh] flex-col items-center justify-center py-24 text-center">
      <p className="font-display text-7xl font-extrabold text-primary">404</p>
      <h1 className="mt-4 font-display text-2xl font-bold text-ink">
        This nest is empty
      </h1>
      <p className="mt-2 max-w-md text-muted">
        The page you&apos;re looking for has flown away. Let&apos;s get you back
        home.
      </p>
      <div className="mt-8 flex gap-3">
        <Button href="/">Back to Home</Button>
        <Button href="/contact" variant="outline">
          Contact Us
        </Button>
      </div>
    </Container>
  );
}
