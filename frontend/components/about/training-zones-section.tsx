import Image from "next/image";
import { getTrainingZones, getSiteText, getImageUrl } from "@/lib/content";
import React from "react";

export async function TrainingZonesSection() {
  const [zones, text] = await Promise.all([
    getTrainingZones(),
    getSiteText("about"),
  ]);

  const display =
    zones.length >= 4
      ? zones.slice(0, 4)
      : [
          {
            id: 0,
            image: "/training-zone-1.png",
            alt: "Cable training",
            order: 0,
          },
          {
            id: 1,
            image: "/training-zone-2.png",
            alt: "Step aerobics",
            order: 1,
          },
          { id: 2, image: "/training-zone-3.png", alt: "Cycling", order: 2 },
          {
            id: 3,
            image: "/training-zone-4.png",
            alt: "Running track",
            order: 3,
          },
        ];

  return (
    <section className="py-20 bg-transparent">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-2 tracking-tight">
            {text.training_zones_title || "TRAINING ZONES"}
          </h2>
          <p className="text-white/70 text-base">
            {text.training_zones_subtitle ||
              "Everything You Need For Serious Training Comfort And Result"}
          </p>
        </div>

        {/* Mobile: Horizontal carousel with hidden scrollbar */}
        <style>{`
          .tz-scrollbar-hide {
            -ms-overflow-style: none; /* IE and Edge */
            scrollbar-width: none; /* Firefox */
          }
          .tz-scrollbar-hide::-webkit-scrollbar {
            display: none;
          }
        `}</style>
        <div className="block lg:hidden">
          <div className="flex gap-4 overflow-x-auto pb-2 snap-x snap-mandatory tz-scrollbar-hide">
            {display.map((zone, idx) => (
              <div
                key={zone.id ?? idx}
                className="relative min-w-[260px] h-[320px] rounded-2xl overflow-hidden snap-center flex-shrink-0"
              >
                <Image
                  src={
                    getImageUrl(zone.image) || `/training-zone-${idx + 1}.png`
                  }
                  alt={zone.alt}
                  fill
                  className="object-cover object-center"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Desktop: Original grid layout */}
        <div
          className="hidden lg:grid gap-4"
          style={{
            gridTemplateColumns: "1fr 1fr 1fr",
            gridTemplateRows: "300px 280px",
          }}
        >
          {/* Image 1 — left column, spans both rows */}
          <div
            className="relative rounded-2xl overflow-hidden"
            style={{ gridColumn: "1", gridRow: "1 / 3" }}
          >
            <Image
              src={getImageUrl(display[0].image) || "/training-zone-1.png"}
              alt={display[0].alt}
              fill
              className="object-cover object-top"
            />
          </div>

          {/* Image 2 — top middle */}
          <div
            className="relative rounded-2xl overflow-hidden"
            style={{ gridColumn: "2", gridRow: "1" }}
          >
            <Image
              src={getImageUrl(display[1]?.image) || "/training-zone-2.png"}
              alt={display[1]?.alt ?? ""}
              fill
              className="object-cover object-center"
            />
          </div>

          {/* Image 3 — top right */}
          <div
            className="relative rounded-2xl overflow-hidden"
            style={{ gridColumn: "3", gridRow: "1" }}
          >
            <Image
              src={getImageUrl(display[2]?.image) || "/training-zone-3.png"}
              alt={display[2]?.alt ?? ""}
              fill
              className="object-cover object-center"
            />
          </div>

          {/* Image 4 — bottom, spans middle + right columns */}
          <div
            className="relative rounded-2xl overflow-hidden"
            style={{ gridColumn: "2 / 4", gridRow: "2" }}
          >
            <Image
              src={getImageUrl(display[3]?.image) || "/training-zone-4.png"}
              alt={display[3]?.alt ?? ""}
              fill
              className="object-cover object-center"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
