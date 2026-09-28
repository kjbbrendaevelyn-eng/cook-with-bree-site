import Link from "next/link";
import Image from "next/image";

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-sunshine-100">
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="absolute -top-24 -left-24 h-72 w-72 rounded-full bg-mango-400/40 blur-3xl" />
        <div className="absolute top-1/3 -right-20 h-80 w-80 rounded-full bg-hibiscus-400/30 blur-3xl" />
        <div className="absolute -bottom-24 left-1/3 h-72 w-72 rounded-full bg-leaf-400/30 blur-3xl" />
      </div>

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 py-12 sm:py-16 lg:py-24 grid gap-12 lg:grid-cols-2 lg:items-center">
        <div>
          <p className="inline-flex items-center gap-2 rounded-full bg-white/80 px-4 py-1.5 text-xs sm:text-sm font-semibold text-hibiscus-600 shadow-sm">
            <span aria-hidden>📍</span> From my kitchen in Buziga, Kampala
          </p>
          <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl text-warm-brown leading-[1.1] mt-6">
            Cooking is better with{" "}
            <span className="relative inline-block">
              <span className="relative z-10">the people</span>
              <span aria-hidden className="absolute inset-x-0 bottom-1 h-3 sm:h-4 bg-mango-400/60 -rotate-1 rounded" />
            </span>{" "}
            <span className="text-hibiscus-500">you love</span>
          </h1>
          <p className="text-base sm:text-lg text-warm-muted mt-6 leading-relaxed max-w-xl">
            Hi, I&apos;m Bree! Pull up a stool, grab a wooden spoon, and cook with me. These are
            the dishes I make for my family and friends, and the stories, laughter, and little
            mishaps that come with them.
          </p>
          <div className="flex flex-wrap gap-3 mt-8">
            <Link
              href="/recipes"
              className="inline-flex items-center min-h-11 px-6 py-3 bg-hibiscus-500 text-white rounded-full text-sm font-semibold shadow-lg shadow-hibiscus-500/30 hover:bg-hibiscus-600 hover:-translate-y-0.5 transition-all"
            >
              Browse Recipes
            </Link>
            <Link
              href="/stories"
              className="inline-flex items-center min-h-11 px-6 py-3 bg-white text-warm-brown rounded-full text-sm font-semibold shadow-sm hover:bg-cream-100 hover:-translate-y-0.5 transition-all"
            >
              Read Stories
            </Link>
            <Link
              href="/cookbook"
              className="inline-flex items-center min-h-11 px-6 py-3 bg-leaf-500 text-white rounded-full text-sm font-semibold shadow-lg shadow-leaf-500/30 hover:bg-leaf-600 hover:-translate-y-0.5 transition-all"
            >
              Open My Cookbook
            </Link>
          </div>
        </div>

        <div className="relative mx-auto w-full max-w-xl lg:max-w-none pb-10 sm:pb-16">
          <div className="relative aspect-[4/3] sm:aspect-[16/10] rounded-[2rem] overflow-hidden ring-8 ring-white shadow-2xl rotate-1">
            <Image
              src="/images/home/hero-family-kitchen.jpg"
              alt="A family laughing together while cooking in a sunny kitchen"
              fill
              priority
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>

          <div className="absolute -bottom-2 left-0 sm:-left-8 w-24 sm:w-44 -rotate-6 motion-safe:animate-float">
            <div className="bg-white p-2 pb-6 rounded-lg shadow-xl">
              <div className="relative aspect-square rounded overflow-hidden">
                <Image
                  src="/images/home/friends-chapati.jpg"
                  alt="Young friends laughing while rolling chapati dough in a modern kitchen"
                  fill
                  className="object-cover"
                  sizes="176px"
                />
              </div>
              <p className="text-center text-[11px] sm:text-xs font-semibold text-warm-brown mt-1.5">
                Chapati Saturdays
              </p>
            </div>
          </div>

          <div className="absolute -bottom-4 right-2 sm:right-10 w-24 sm:w-40 rotate-6 motion-safe:animate-float [animation-delay:1.5s]">
            <div className="bg-white p-2 pb-6 rounded-lg shadow-xl">
              <div className="relative aspect-square rounded overflow-hidden">
                <Image
                  src="/images/home/grandma-grandson.jpg"
                  alt="A grandmother teaching her grandson to stir a pot of stew"
                  fill
                  className="object-cover"
                  sizes="160px"
                />
              </div>
              <p className="text-center text-[11px] sm:text-xs font-semibold text-warm-brown mt-1.5">
                Grandma&apos;s way
              </p>
            </div>
          </div>

          <div className="absolute -top-4 -right-2 sm:-right-4 flex h-20 w-20 sm:h-24 sm:w-24 rotate-12 items-center justify-center rounded-full bg-mango-500 text-center text-white shadow-xl ring-4 ring-white">
            <span className="text-[11px] sm:text-xs font-bold leading-tight">
              Made
              <br />
              with love
              <br />
              <span aria-hidden>❤️</span>
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
