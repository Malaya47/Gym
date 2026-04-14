import Image from "next/image";

export function AchievementsSection() {
  const achievements = [
    {
      image: "/achievement-1.png",
      title: "Lorem Ipsum Dolor Sit Amet, Consectetur Adipiscing Elit.",
    },
    {
      image: "/achievement-2.png",
      title: "Lorem Ipsum Dolor Sit Amet, Consectetur Adipiscing Elit.",
    },
    {
      image: "/achievement-3.png",
      title: "Lorem Ipsum Dolor Sit Amet, Consectetur Adipiscing Elit.",
    },
  ];

  return (
    <section className="py-20 bg-transparent">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl sm:text-4xl font-bold text-white text-center mb-16">
          ACHIEVEMENTS & CERTIFICATION
        </h2>

        <div className="grid md:grid-cols-3 gap-8">
          {achievements.map((item, index) => (
            <div key={index} className="text-center">
              <div className="relative aspect-[3/2] rounded-xl overflow-hidden mb-4 bg-[#1a0a12]/60">
                <Image
                  src={item.image}
                  alt={`Achievement ${index + 1}`}
                  fill
                  className="object-cover"
                />
              </div>
              <p className="text-white/80 text-sm">{item.title}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
