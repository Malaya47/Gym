import { Play } from "lucide-react";

export function EventsSection() {
  const events = [
    {
      title: "Event 1",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      hasVideo: true,
    },
    {
      title: "Event 2",
      description: "Lorem ipsum dolor sit amet.",
      hasVideo: false,
    },
    {
      title: "Event 3",
      description: "Lorem ipsum dolor sit amet.",
      hasVideo: false,
    },
  ];

  return (
    <section id="events" className="py-20 bg-transparent">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-4">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            EVENT HIGHLIGHTS
          </h2>
          <p className="text-white/60">Moments that defined the experience</p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mt-12">
          {/* Main Event with Video */}
          <div className="md:col-span-1 md:row-span-2">
            <div className="relative h-full min-h-[300px] rounded-xl overflow-hidden bg-[#1a0a12]/80 backdrop-blur-sm group">
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent z-10" />
              <div className="absolute inset-0 flex items-center justify-center z-20">
                <div className="w-14 h-14 bg-red-600 rounded-full flex items-center justify-center cursor-pointer hover:bg-red-700 transition-colors">
                  <Play className="w-6 h-6 text-white ml-1" fill="white" />
                </div>
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-4 z-20">
                <p className="text-white/70 text-sm">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem
                  ipsum dolor sit amet, consectetur adipiscing elit.
                </p>
              </div>
            </div>
          </div>

          {/* Secondary Events */}
          <div className="md:col-span-2 grid grid-cols-2 gap-6">
            {[1, 2, 3, 4].map((item) => (
              <div
                key={item}
                className="relative aspect-video rounded-xl overflow-hidden bg-[#1a0a12]/80 backdrop-blur-sm group"
              >
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent z-10" />
                <div className="absolute bottom-0 left-0 right-0 p-3 z-20">
                  <p className="text-white/70 text-xs">Lorem ipsum dolor sit</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
