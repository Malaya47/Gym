import Image from "next/image";
import { Button } from "@/components/ui/button";

export function OurTrainersSection() {
  const trainers = [
    {
      name: "Lorem ipsum",
      description:
        "Lorem Ipsum Dolor Sit Amet, Consectetur Adipiscing Elit.Lorem Ipsum Dolor Sit Amet",
      image: "/trainer-image.png",
    },
    {
      name: "Lorem ipsum",
      description:
        "Lorem Ipsum Dolor Sit Amet, Consectetur Adipiscing Elit.Lorem Ipsum Dolor Sit Amet",
      image: "/trainer-image.png",
    },
    {
      name: "Lorem ipsum",
      description:
        "Lorem Ipsum Dolor Sit Amet, Consectetur Adipiscing Elit.Lorem Ipsum Dolor Sit Amet",
      image: "/trainer-image.png",
    },
    {
      name: "Lorem ipsum",
      description:
        "Lorem Ipsum Dolor Sit Amet, Consectetur Adipiscing Elit.Lorem Ipsum Dolor Sit Amet",
      image: "/trainer-image.png",
    },
  ];

  return (
    <section className="py-20 bg-transparent">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <div className="text-center mb-14">
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-3 tracking-tight">
            OUR TRAINERS
          </h2>
          <p className="text-white/60 max-w-2xl mx-auto text-sm">
            At This Part You Can Easily Access All Of Our Servises. Take A Look
            At Them And Chose Wich Ever You Want.
          </p>
        </div>

        {/* Row 1: text | image | text | image */}
        <div className="grid grid-cols-4 gap-6 mb-6">
          {/* Trainer 1 — text */}
          <div className="flex flex-col justify-center">
            <h3 className="text-white text-xl font-semibold mb-3">
              {trainers[0].name}
            </h3>
            <p className="text-white/60 text-sm leading-relaxed">
              {trainers[0].description}
            </p>
          </div>
          {/* Trainer 1 — image */}
          <div className="relative aspect-[4/5] rounded-2xl overflow-hidden">
            <Image
              src={trainers[0].image}
              alt={trainers[0].name}
              fill
              className="object-cover object-top"
            />
          </div>
          {/* Trainer 2 — text */}
          <div className="flex flex-col justify-center">
            <h3 className="text-white text-xl font-semibold mb-3">
              {trainers[1].name}
            </h3>
            <p className="text-white/60 text-sm leading-relaxed">
              {trainers[1].description}
            </p>
          </div>
          {/* Trainer 2 — image */}
          <div className="relative aspect-[4/5] rounded-2xl overflow-hidden">
            <Image
              src={trainers[1].image}
              alt={trainers[1].name}
              fill
              className="object-cover object-top"
            />
          </div>
        </div>

        {/* Row 2: image | text | image | text */}
        <div className="grid grid-cols-4 gap-6">
          {/* Trainer 3 — image */}
          <div className="relative aspect-[4/5] rounded-2xl overflow-hidden">
            <Image
              src={trainers[2].image}
              alt={trainers[2].name}
              fill
              className="object-cover object-top"
            />
          </div>
          {/* Trainer 3 — text */}
          <div className="flex flex-col justify-center">
            <h3 className="text-white text-xl font-semibold mb-3">
              {trainers[2].name}
            </h3>
            <p className="text-white/60 text-sm leading-relaxed">
              {trainers[2].description}
            </p>
          </div>
          {/* Trainer 4 — image */}
          <div className="relative aspect-[4/5] rounded-2xl overflow-hidden">
            <Image
              src={trainers[3].image}
              alt={trainers[3].name}
              fill
              className="object-cover object-top"
            />
          </div>
          {/* Trainer 4 — text */}
          <div className="flex flex-col justify-center">
            <h3 className="text-white text-xl font-semibold mb-3">
              {trainers[3].name}
            </h3>
            <p className="text-white/60 text-sm leading-relaxed">
              {trainers[3].description}
            </p>
          </div>
        </div>

        {/* Show more button */}
        <div className="flex justify-center mt-12">
          <Button className="btn-gradient hover:bg-[#8f2244] text-white px-10 py-2 rounded-md text-sm font-medium">
            Show more
          </Button>
        </div>

        {/* Seperation line  */}
        <div
          className="w-full flex justify-center items-center relative"
          style={{ height: "40px" }}
        >
          <div
            style={{
              position: "absolute",
              left: "50%",
              top: "50%",
              transform: "translate(-50%, -50%)",
              width: "30%",
              height: "40px",
              background:
                "radial-gradient(ellipse at center, #733EA6 0%, transparent 70%)",
              opacity: 0.45,
              filter: "blur(12px)",
              zIndex: 0,
              pointerEvents: "none",
            }}
          />
          <div
            style={{
              border: "0",
              height: "4px",
              width: "50%",
              borderRadius: "2px",
              background:
                "linear-gradient(90deg, #48215A 0%, #5D225E 50%, #48215A 100%)",
              boxShadow: "0 0 24px 0 #733EA6AA",
              position: "relative",
              zIndex: 1,
            }}
          />
        </div>
      </div>
    </section>
  );
}
