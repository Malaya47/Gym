import Image from "next/image";

export function EventsHero() {
  return (
    <section className="relative min-h-[100vh] flex items-center justify-center">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/event-hero-image.jpg"
          alt="Event background"
          fill
          className="object-cover object-center opacity-70"
          priority
        />
        {/* Purple tint overlay matching site theme */}
        <div className="absolute inset-0 bg-purple-950/40 mix-blend-multiply" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/95" />
        <div className="absolute bottom-0 left-0 right-0 h-60 bg-gradient-to-t from-black to-transparent" />
      </div>

      <div className="relative z-10 w-full flex items-center justify-center text-center px-4">
        <h1 className="text-6xl sm:text-7xl md:text-8xl font-extrabold text-white tracking-widest">
          EVENT
        </h1>
      </div>
    </section>
  );
}
