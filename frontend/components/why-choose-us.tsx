import { Dumbbell, Users, Clock, Award, LucideIcon } from "lucide-react";
import { getWhyFeatures, getSiteText, getImageUrl } from "@/lib/content";

const iconMap: Record<string, LucideIcon> = {
  Dumbbell,
  Users,
  Clock,
  Award,
};

export async function WhyChooseUs() {
  const [features, text] = await Promise.all([
    getWhyFeatures(),
    getSiteText("why"),
  ]);

  const display =
    features.length > 0
      ? features
      : [
          {
            id: 0,
            icon: "Dumbbell",
            title: "Lorem ipsum",
            description:
              "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
            order: 0,
          },
          {
            id: 1,
            icon: "Users",
            title: "Lorem ipsum",
            description:
              "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
            order: 1,
          },
          {
            id: 2,
            icon: "Clock",
            title: "Lorem ipsum",
            description:
              "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
            order: 2,
          },
          {
            id: 3,
            icon: "Award",
            title: "Lorem ipsum",
            description:
              "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
            order: 3,
          },
        ];

  const videoImage =
    getImageUrl(text.why_choose_video_image) || "/why-choose-us.png";

  return (
    <section id="about" className="py-20 bg-transparent">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl sm:text-4xl font-bold text-white text-center mb-16">
          {text.why_choose_title || "WHY CHOOSE US?"}
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {display.map((feature) => {
            const Icon = iconMap[feature.icon] ?? Dumbbell;
            return (
              <div
                key={feature.id}
                className="flex items-start gap-4 border border-[#743EA7] rounded-xl p-6 h-full"
                style={{ background: "#06020775" }}
              >
                <div className="flex-shrink-0 w-10 h-10 bg-red-600/20 rounded-lg flex items-center justify-center">
                  <Icon className="w-5 h-5 text-red-500" />
                </div>
                <div>
                  <h3 className="text-white font-semibold mb-1">
                    {feature.title}
                  </h3>
                  <p className="text-white/60 text-sm">{feature.description}</p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Wide Image Below Features with Play Icon Overlay */}
        <div className="mt-10 relative w-full">
          <img
            src={videoImage}
            alt="Why Choose Us"
            className="w-full rounded-xl object-cover"
          />
          <img
            src="/play-icon.png"
            alt="Play Icon"
            className="absolute top-1/2 left-1/2 w-16 h-16 -translate-x-1/2 -translate-y-1/2 z-10 cursor-pointer"
          />
        </div>
      </div>
    </section>
  );
}
