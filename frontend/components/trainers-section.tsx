import Image from "next/image";
import { Button } from "@/components/ui/button";

export function TrainersSection() {
  const trainers = [
    {
      name: "Sam Cole",
      role: "Personal Trainer",
      image: "/trainer-preview.png",
    },
    {
      name: "Sam Cole",
      role: "Personal Trainer",
      image: "/trainer-preview.png",
    },
    {
      name: "Sam Cole",
      role: "Personal Trainer",
      image: "/trainer-preview.png",
    },
    {
      name: "Sam Cole",
      role: "Personal Trainer",
      image: "/trainer-preview.png",
    },
  ];

  return (
    <section className="py-20 bg-transparent">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-4">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            TRAINERS PREVIEW
          </h2>
          <p className="text-white/60 text-sm max-w-2xl mx-auto">
            At This Part You Can Easily Access All Of Our Services. Take A Look
            At Them And Chose Wish Ever You Want.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
          {trainers.map((trainer, index) => (
            <div
              key={index}
              className="group relative rounded-xl overflow-hidden bg-[#1a0a12]/80 aspect-[3/4] backdrop-blur-sm"
            >
              <Image
                src={trainer.image}
                alt={trainer.name}
                fill
                style={{ objectFit: "cover" }}
                className="absolute inset-0 w-full h-full object-cover z-0"
                sizes="(max-width: 768px) 100vw, 25vw"
                priority={index === 0}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent z-10" />
              <div className="absolute inset-0 bg-red-900/30" />
              <div className="absolute bottom-0 left-0 right-0 p-4 z-20">
                <h3 className="text-white font-semibold">{trainer.name}</h3>
                <p className="text-white/60 text-sm">{trainer.role}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-10">
          <Button
            variant="outline"
            className=" text-red-500 hover:bg-red-500 hover:text-white btn-gradient"
          >
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
