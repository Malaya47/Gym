import Image from "next/image";

export function EventDetailHero() {
  return (
    <section className="relative min-h-[100vh] flex items-end pb-16">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/event-hero-image.jpg"
          alt="Event hero"
          fill
          className="object-cover object-center opacity-70"
          priority
        />
        {/* Purple tint */}
        <div className="absolute inset-0 bg-purple-950/40 mix-blend-multiply" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/80" />
      </div>

      <div className="relative z-10 w-full max-w-5xl mx-auto px-6 sm:px-8 lg:px-12">
        {/* Event Title */}
        <h1 className="text-5xl sm:text-6xl md:text-7xl font-extrabold text-white tracking-wide mb-16">
          LOREM IPSUM
        </h1>

        {/* Event Overview */}
        <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-6 tracking-wide">
          EVENT OVERVIEW
        </h2>
        <div className="space-y-3 text-white text-base sm:text-lg">
          <p>
            <span className="font-bold">Time, Date:</span> May 15, 2026, 10:00AM
            - 2:00 PM
          </p>
          <p>
            <span className="font-bold">Location:</span> 2026, The Innovation
            Hub, 1234 Commerce st, Metropolis
          </p>
          <p>
            <span className="font-bold">Price:</span> $99
          </p>
        </div>
      </div>
    </section>
  );
}
