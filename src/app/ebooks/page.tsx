import type { Metadata } from "next";
import EbookCard from "@/components/EbookCard";
import { getAllEbooks } from "@/lib/ebooks";

export const metadata: Metadata = {
  title: "Ebooks",
  description:
    "Downloadable cookbooks and kitchen story ebooks from Cook with Bree — buy once, download instantly, print anytime.",
};

export default function EbooksPage() {
  const books = getAllEbooks();

  return (
    <div className="max-w-5xl mx-auto px-6 py-12">
      <div className="mb-12 max-w-2xl">
        <p className="text-sm font-medium text-terracotta-600 uppercase tracking-widest mb-3">
          Shop
        </p>
        <h1 className="font-display text-4xl text-warm-brown">Downloadable Ebooks</h1>
        <p className="text-warm-muted mt-3 text-lg leading-relaxed">
          Kitchen stories and recipes in a beautiful PDF you can buy, download, and keep forever —
          on your phone, tablet, or printed on your kitchen counter.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {books.map((book) => (
          <EbookCard key={book.slug} book={book} />
        ))}
      </div>

      <div className="mt-16 p-8 bg-cream-100 rounded-2xl border border-cream-200">
        <h2 className="font-display text-2xl text-warm-brown">How downloads work</h2>
        <ol className="mt-4 space-y-3 text-warm-muted list-decimal list-inside">
          <li>Choose an ebook and complete secure checkout.</li>
          <li>Download your PDF instantly after purchase.</li>
          <li>Read digitally or print pages to cook from offline.</li>
        </ol>
      </div>
    </div>
  );
}
