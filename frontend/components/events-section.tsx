import { Play } from "lucide-react";
import { getEventHighlights, getSiteText, getImageUrl } from "@/lib/content";
import Image from "next/image";

export async function EventsSection() {
  const [highlights, text] = await Promise.all([
    getEventHighlights(),
    getSiteText("events"),
  ]);

  const mainEvent = highlights.find((e) => e.isMain) ?? highlights[0] ?? null;
  const secondary = highlights.filter((e) => !e.isMain).slice(0, 4);

  return (
    <section id="events" className="py-20 bg-transparent">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-4">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            {text.events_section_title || "EVENT HIGHLIGHTS"}
          </h2>
          <p className="text-white/60">
            {text.events_section_subtitle ||
              "Moments that defined the experience"}
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mt-12">
          {/* Main Event with Video */}
          <div className="md:col-span-1 md:row-span-2">
            <div className="relative h-full min-h-[300px] rounded-xl overflow-hidden bg-[#1a0a12]/80 backdrop-blur-sm group">
              {mainEvent?.image && (
                <Image
                  src={getImageUrl(mainEvent.image)}
                  alt={mainEvent.title}
                  fill
                  className="object-cover"
                />
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent z-10" />
              <div className="absolute inset-0 flex items-center justify-center z-20">
                {mainEvent?.videoUrl ? (
                  <a
                    href={mainEvent.videoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-14 h-14 bg-red-600 rounded-full flex items-center justify-center cursor-pointer hover:bg-red-700 transition-colors"
                  >
                    <Play className="w-6 h-6 text-white ml-1" fill="white" />
                  </a>
                ) : (
                  <div className="w-14 h-14 bg-red-600 rounded-full flex items-center justify-center cursor-pointer hover:bg-red-700 transition-colors">
                    <Play className="w-6 h-6 text-white ml-1" fill="white" />
                  </div>
                )}
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-4 z-20">
                <p className="text-white/70 text-sm">
                  {mainEvent?.description ?? ""}
                </p>
              </div>
            </div>
          </div>

          {/* Secondary Events */}
          <div className="md:col-span-2 grid grid-cols-2 gap-6">
            {secondary.length > 0
              ? secondary.map((item) => (
                  <div
                    key={item.id}
                    className="relative aspect-video rounded-xl overflow-hidden bg-[#1a0a12]/80 backdrop-blur-sm group"
                  >
                    {item.image && (
                      <Image
                        src={getImageUrl(item.image)}
                        alt={item.title}
                        fill
                        className="object-cover"
                      />
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent z-10" />
                    <div className="absolute bottom-0 left-0 right-0 p-3 z-20">
                      <p className="text-white/70 text-xs">
                        {item.description}
                      </p>
                    </div>
                  </div>
                ))
              : [1, 2, 3, 4].map((item) => (
                  <div
                    key={item}
                    className="relative aspect-video rounded-xl overflow-hidden bg-[#1a0a12]/80 backdrop-blur-sm group"
                  >
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent z-10" />
                    <div className="absolute bottom-0 left-0 right-0 p-3 z-20">
                      <p className="text-white/70 text-xs">
                        Lorem ipsum dolor sit
                      </p>
                    </div>
                  </div>
                ))}
          </div>
        </div>
      </div>
    </section>
  );
}
