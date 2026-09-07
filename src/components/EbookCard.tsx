import Link from "next/link";
import type { Ebook } from "@/lib/ebooks";
import { formatEbookPrice } from "@/lib/ebooks";

interface EbookCardProps {
  book: Ebook;
}

export default function EbookCard({ book }: EbookCardProps) {
  return (
    <Link
      href={`/ebooks/${book.slug}`}
      className="group block bg-white rounded-2xl border border-cream-200 p-6 hover:shadow-lg hover:border-terracotta-400/30 transition-all duration-300"
    >
      <div className="flex items-start justify-between gap-4">
        <span className="text-4xl group-hover:scale-110 transition-transform duration-300">
          {book.emoji}
        </span>
        <span className="text-sm font-medium text-terracotta-600 shrink-0">
          {formatEbookPrice(book)}
        </span>
      </div>
      <p className="text-xs font-medium text-warm-muted uppercase tracking-wide mt-4">
        {book.format} · {book.pages}
      </p>
      <h3 className="font-display text-xl text-warm-brown group-hover:text-terracotta-600 transition-colors mt-1">
        {book.title}
      </h3>
      <p className="text-sm text-warm-muted mt-2 line-clamp-3">{book.summary}</p>
      <ul className="flex flex-wrap gap-2 mt-4">
        {book.highlights.map((item) => (
          <li
            key={item}
            className="text-xs px-2 py-0.5 rounded-full bg-cream-200 text-warm-muted"
          >
            {item}
          </li>
        ))}
      </ul>
      <p className="text-sm font-medium text-terracotta-600 mt-5 group-hover:text-terracotta-700 transition-colors">
        View ebook →
      </p>
    </Link>
  );
}
