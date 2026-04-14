import Image from "next/image";

const GRAD = "linear-gradient(180deg, #733EA6 0%, #49225B 100%)";

function GradientBorderImage({
  src,
  alt,
  style,
}: {
  src: string;
  alt: string;
  style: React.CSSProperties;
}) {
  return (
    <div
      className="absolute"
      style={{
        ...style,
        padding: "2px",
        background: GRAD,
        borderRadius: "12px",
      }}
    >
      <div className="relative w-full h-full rounded-[10px] overflow-hidden">
        <Image src={src} alt={alt} fill className="object-cover" />
      </div>
    </div>
  );
}

export function EquipmentsSection() {
  const features = [
    "Lorem Ipsum Dolor Sit Amet, Consectetur Adipiscing Elit.",
    "Lorem Ipsum Dolor Sit Amet, Consectetur Adipiscing Elit.",
    "Lorem Ipsum Dolor Sit Amet, Consectetur Adipiscing Elit.",
    "Lorem Ipsum Dolor Sit Amet, Consectetur Adipiscing Elit.",
  ];

  return (
    <section className="py-20 bg-transparent">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-2 tracking-tight">
            EQUIPMENTS OVERVIEW
          </h2>
          <p className="text-white/70 text-base">
            Everything You Need For Serious Training Comfort And Result
          </p>
        </div>

        <div className="flex flex-col md:flex-row items-center gap-12">
          {/* Left – Feature list */}
          <div className="w-full md:w-[38%] flex-shrink-0">
            <ul className="space-y-7">
              {features.map((feature, idx) => (
                <li
                  key={idx}
                  className="flex items-start gap-3 text-base text-gray-200"
                >
                  <span className="mt-1 text-white/60 select-none">•</span>
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Right – Staggered images */}
          <div
            className="w-full md:flex-1 relative"
            style={{ height: "460px" }}
          >
            {/* Image 1 – top, offset from left, large landscape */}
            <GradientBorderImage
              src="/equipment-1.png"
              alt="Cardio equipment"
              style={{ left: "9%", top: "0%", width: "52%", height: "52%" }}
            />
            {/* Image 2 – top-right, slightly lower */}
            <GradientBorderImage
              src="/equipment-2.png"
              alt="Weight rack"
              style={{ right: "10%", top: "6%", width: "36%", height: "52%" }}
            />
            {/* Image 3 – bottom-left, extends to left edge */}
            <GradientBorderImage
              src="/equipment-3.png"
              alt="Dumbbells"
              style={{
                left: "0%",
                bottom: "20%",
                width: "37%",
                height: "44%",
                zIndex: 10,
              }}
            />
            {/* Image 4 – bottom-right, large */}
            <GradientBorderImage
              src="/equipment-4.png"
              alt="Cable machines"
              style={{
                right: "20%",
                bottom: "0%",
                width: "59%",
                height: "52%",
              }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
