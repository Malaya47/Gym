import Image from "next/image";
import { Button } from "@/components/ui/button";

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Right-side man image — placed in the right 60% so it isn't zoomed */}
      <div className="absolute right-0 top-0 bottom-0 w-[65%]">
        <Image
          src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/anastase-maragos-ehQimz6-1qM-unsplash%201-GdqLOCVXElCrEmbSonGZfnAdIqozNH.png"
          alt="Fitness background"
          fill
          className="object-cover"
          style={{ objectPosition: "center center" }}
          priority
        />
        {/* Subtle dark veil so the image stays moody */}
        <div className="absolute inset-0 bg-black/30" />
        {/* Left-side fade: image blends into the dark background */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to right, #08010a 0%, rgba(8,1,10,0.6) 20%, transparent 50%)",
          }}
        />
        {/* Top/bottom vignette matching the photo's natural darkening */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to bottom, rgba(0,0,0,0.55) 0%, transparent 25%, transparent 75%, rgba(0,0,0,0.65) 100%)",
          }}
        />
      </div>

      {/* Solid dark background for the left text panel */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(to right, #08010a 0%, #08010a 38%, rgba(8,1,10,0.4) 52%, transparent 65%)",
        }}
      />

      {/* Content */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-8 sm:px-12 lg:px-16 pt-20">
        <div className="max-w-[480px]">
          <h1 className="text-[4.5rem] sm:text-[6rem] lg:text-[7.5rem] font-black text-white leading-none tracking-tight mb-6 uppercase">
            FITNESS
            <br />
            GOALS
          </h1>
          <p className="text-white/75 text-sm leading-relaxed mb-4 text-justify">
            Lorem Ipsum Dolor Sit Amet, Consectetur Adipiscing Elit.Lorem Ipsum
            Dolor Sit Amet, Consectetur Adipiscing Elit.Lorem Ipsum Dolor Sit
            Amet, Consectetur Adipiscing Elit.Lorem Ipsum Dolor Sit Amet,
            Consectetur Adipiscing Elit
          </p>
          <p className="text-white/75 text-sm leading-relaxed mb-8 text-justify">
            Lorem Ipsum Dolor Sit Amet, Consectetur Adipiscing Elit.Lorem Ipsum
            Dolor Sit Amet, Consectetur Adipiscing Elit.
          </p>
          <Button className="bg-[#7a1a1a] hover:bg-[#8f1f1f] text-white px-7 py-5 text-sm font-semibold rounded-sm">
            Fill Form
          </Button>
        </div>
      </div>
    </section>
  );
}
