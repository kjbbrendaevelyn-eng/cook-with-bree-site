import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import BuyButton from "@/components/BuyButton";
import { formatEbookPrice, getAllEbooks, getEbookBySlug } from "@/lib/ebooks";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getAllEbooks().map((book) => ({ slug: book.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const book = getEbookBySlug(slug);
  if (!book) return { title: "Ebook Not Found" };
  return {
    title: book.title,
    description: book.description,
  };
}

export default async function EbookPage({ params }: Props) {
  const { slug } = await params;
  const book = getEbookBySlug(slug);
  if (!book) notFound();

  return (
    <article className="max-w-3xl mx-auto px-6 py-12">
      <Link
        href="/ebooks"
        className="text-sm text-terracotta-600 hover:text-terracotta-700 transition-colors"
      >
        ← All ebooks
      </Link>

      <header className="mt-8">
        <span className="text-5xl">{book.emoji}</span>
        <p className="text-xs font-medium text-terracotta-600 uppercase tracking-wide mt-4">
          {book.format} · {book.pages}
        </p>
        <h1 className="font-display text-4xl md:text-5xl text-warm-brown leading-tight mt-2">
          {book.title}
        </h1>
        <p className="text-lg text-warm-muted mt-4 leading-relaxed">{book.description}</p>
        <p className="font-display text-3xl text-warm-brown mt-6">{formatEbookPrice(book)}</p>
      </header>

      <BuyButton product={{ kind: "ebook", product: book }} className="mt-8 max-w-sm" />

      <section className="mt-12">
        <h2 className="font-display text-2xl text-warm-brown pb-2 border-b border-cream-200">
          What&apos;s inside
        </h2>
        <ul className="mt-4 space-y-3">
          {book.includes.map((item) => (
            <li key={item} className="flex items-start gap-3 text-warm-muted">
              <span className="text-terracotta-500 font-bold shrink-0">•</span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-10 p-6 bg-cream-100 rounded-2xl border border-cream-200">
        <h2 className="font-display text-xl text-warm-brown">Download &amp; keep forever</h2>
        <p className="text-warm-muted mt-2 leading-relaxed">
          After purchase you get a PDF ebook instantly. Save it, print favorite pages, or read it
          wherever you cook — no subscription required.
        </p>
      </section>

      <p className="text-sm text-warm-muted mt-10">
        Prefer a weekly plan instead?{" "}
        <Link href="/meal-plans" className="text-terracotta-600 hover:text-terracotta-700">
          Browse printable meal plans →
        </Link>
      </p>
    </article>
  );
}
