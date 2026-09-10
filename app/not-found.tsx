import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-bg text-ink font-sans">
      <div className="text-center">
        <p className="font-mono text-xs tracking-[.1em] uppercase text-amber font-semibold mb-3">
          404
        </p>
        <h1 className="font-serif text-3xl font-semibold text-ink mb-3">
          Page not found
        </h1>
        <Link href="/" className="text-amber font-semibold">
          &larr; Back to Home
        </Link>
      </div>
    </div>
  );
}
