import Link from "next/link";

export default function NotFound() {
  return (
    <main id="main-content" className="container py-24 md:py-36">
      <p className="eyebrow mb-6">404 / OUT OF FRAME</p>
      <h1 className="font-heading text-5xl tracking-tight md:text-7xl">
        This page is
        <br />
        outside the canvas.
      </h1>
      <p className="mt-6 max-w-md text-base text-muted">
        The project or page you’re looking for isn’t here. Explore the current studio work instead.
      </p>
      <Link className="button mt-8" href="/work">
        Explore all work
      </Link>
    </main>
  );
}
