import Link from "next/link";

export default function NotFound() {
  return (
    <main className="min-h-screen bg-seis-bg text-seis-text">
      <section className="mx-auto flex w-[min(900px,calc(100vw-1.5rem))] flex-col items-start justify-center py-24">
        <p className="text-xs uppercase tracking-[0.14em] text-seis-accent">404</p>
        <h1 className="mt-3 font-serif text-4xl sm:text-5xl">Page not found</h1>
        <p className="mt-4 max-w-xl text-sm text-seis-muted sm:text-base">
          The requested route is not available in this SEIS foundation build yet.
        </p>
        <p className="mt-6">
          <Link href="/" className="text-xs uppercase tracking-[0.1em] text-seis-muted hover:text-seis-accent">
            Back to homepage
          </Link>
        </p>
        <p className="mt-2">
          <Link href="/works" className="text-xs uppercase tracking-[0.1em] text-seis-muted hover:text-seis-accent">
            Open works
          </Link>
        </p>
      </section>
    </main>
  );
}
