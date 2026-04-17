import Image from "next/image";
import { getAchievements, getSiteText, getImageUrl } from "@/lib/content";

export async function AchievementsSection() {
  const [achievements, text] = await Promise.all([
    getAchievements(),
    getSiteText("about"),
  ]);

  const display =
    achievements.length > 0
      ? achievements
      : [
          {
            id: 0,
            image: "/achievement-1.png",
            title: "Lorem Ipsum Dolor Sit Amet, Consectetur Adipiscing Elit.",
            order: 0,
          },
          {
            id: 1,
            image: "/achievement-2.png",
            title: "Lorem Ipsum Dolor Sit Amet, Consectetur Adipiscing Elit.",
            order: 1,
          },
          {
            id: 2,
            image: "/achievement-3.png",
            title: "Lorem Ipsum Dolor Sit Amet, Consectetur Adipiscing Elit.",
            order: 2,
          },
        ];

  return (
    <section className="py-20 bg-transparent">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl sm:text-4xl font-bold text-white text-center mb-16">
          {text.achievements_title || "ACHIEVEMENTS & CERTIFICATION"}
        </h2>

        <div className="grid md:grid-cols-3 gap-8">
          {display.map((item) => (
            <div key={item.id} className="text-center">
              <div className="relative aspect-[3/2] rounded-xl overflow-hidden mb-4 bg-[#1a0a12]/60">
                <Image
                  src={getImageUrl(item.image) || "/achievement-1.png"}
                  alt={`Achievement ${item.id}`}
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
