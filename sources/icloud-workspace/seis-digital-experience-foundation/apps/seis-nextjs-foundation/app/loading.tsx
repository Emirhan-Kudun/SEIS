export default function Loading() {
  return (
    <main className="min-h-screen bg-seis-bg text-seis-text">
      <section className="mx-auto w-[min(1100px,calc(100vw-1.5rem))] py-16">
        <div className="animate-pulse rounded-xl border border-seis-line bg-seis-surface p-6 sm:p-8">
          <div className="h-3 w-44 rounded bg-[#2c241a]" />
          <div className="mt-4 h-8 w-4/5 rounded bg-[#2c241a]" />
          <div className="mt-3 h-4 w-2/3 rounded bg-[#2c241a]" />
          <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 3 }).map((_, index) => (
              <div key={index} className="h-40 rounded-lg border border-seis-line bg-[#1f1912]" />
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
