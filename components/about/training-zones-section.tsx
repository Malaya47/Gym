import Image from "next/image";

export function TrainingZonesSection() {
  // Images in the order to match the screenshot
  const zones = [
    { image: "/training-zone-1.png", alt: "Cable training" },
    { image: "/training-zone-2.png", alt: "Step aerobics" },
    { image: "/training-zone-3.png", alt: "Cycling" },
    { image: "/training-zone-4.png", alt: "Running track" },
  ];

  return (
    <section className="py-20 bg-transparent">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-2 tracking-tight">
            TRAINING ZONES
          </h2>
          <p className="text-white/70 text-base">
            Everything You Need For Serious Training Comfort And Result
          </p>
        </div>

        {/* Grid: 3 equal cols, 2 equal rows */}
        <div
          className="grid gap-4"
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
              src={zones[0].image}
              alt={zones[0].alt}
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
              src={zones[1].image}
              alt={zones[1].alt}
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
              src={zones[2].image}
              alt={zones[2].alt}
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
              src={zones[3].image}
              alt={zones[3].alt}
              fill
              className="object-cover object-center"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
