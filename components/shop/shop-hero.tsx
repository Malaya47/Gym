import Image from "next/image";
import { Button } from "@/components/ui/button";

export function ShopHero() {
  return (
    <section className="relative h-[55vh] min-h-[360px] flex items-center">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/shop-hero-image.jpg"
          alt="Shop hero"
          fill
          className="object-cover object-center opacity-80"
          priority
        />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto w-full px-6 sm:px-8 lg:px-12">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-white leading-tight mb-6 tracking-wide">
          LOREM IPSUM
          <br />
          LOREM IPSUM LOREM
        </h1>
        <Button className="btn-gradient text-white font-semibold px-6">
          Shop Know
        </Button>
      </div>
    </section>
  );
}
