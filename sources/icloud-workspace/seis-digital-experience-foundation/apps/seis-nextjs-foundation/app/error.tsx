"use client";

import { useEffect } from "react";

import { Button } from "@/components/ui/button";

type ErrorPageProps = {
  error: Error & { digest?: string };
  reset: () => void;
};

export default function ErrorPage({ error, reset }: ErrorPageProps) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main className="min-h-screen bg-seis-bg text-seis-text">
      <section className="mx-auto flex w-[min(960px,calc(100vw-1.5rem))] flex-col items-start py-16 sm:py-20">
        <p className="text-xs uppercase tracking-[0.14em] text-seis-accent">System Notice</p>
        <h1 className="mt-3 max-w-3xl font-serif text-4xl leading-tight sm:text-5xl">
          Unexpected runtime issue detected.
        </h1>
        <p className="mt-4 max-w-2xl text-sm text-seis-muted sm:text-base">
          The current view could not be rendered safely. Retry the request or return to the homepage.
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <Button onClick={reset}>Retry</Button>
          <Button asChild variant="ghost">
            <a href="/">Return home</a>
          </Button>
        </div>
      </section>
    </main>
  );
}
