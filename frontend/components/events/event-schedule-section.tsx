import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const events = [
  {
    title: "Lorem Ipsum",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    image: "/event-image.jpg",
    time: "Time, Date",
    location: "Location",
  },
  {
    title: "Lorem Ipsum",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    image: "/event-image.jpg",
    time: "Time, Date",
    location: "Location",
  },
  {
    title: "Lorem Ipsum",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    image: "/event-image.jpg",
    time: "Time, Date",
    location: "Location",
  },
];

export function EventScheduleSection() {
  return (
    <section className="py-20 bg-transparent">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <div className="text-center mb-12">
          <h2 className="text-4xl sm:text-5xl font-extrabold text-white mb-4 tracking-wide">
            FOLLOW EVENT SCHEDULE
          </h2>
          <p className="text-white/60 text-base">
            Moments that defined the experience
          </p>
        </div>

        {/* Event Cards */}
        <div className="flex flex-col gap-5">
          {events.map((event, index) => (
            <div
              key={index}
              className="rounded-xl border border-white/10 flex flex-col sm:flex-row items-center gap-6 px-6 py-5"
              style={{ background: "#0300044D" }}
            >
              {/* Title + Description */}
              <div className="w-full sm:w-48 shrink-0">
                <h3 className="text-white text-xl font-semibold mb-1">
                  {event.title}
                </h3>
                <p className="text-white/60 text-sm leading-relaxed">
                  {event.description}
                </p>
              </div>

              {/* Image */}
              <div className="w-full sm:w-40 h-28 rounded-xl overflow-hidden shrink-0 relative">
                <Image
                  src={event.image}
                  alt={event.title}
                  fill
                  className="object-cover"
                />
              </div>

              {/* Spacer */}
              <div className="flex-1" />

              {/* Meta */}
              <ul className="text-white/70 text-sm space-y-1 shrink-0 min-w-[120px]">
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-white/60 inline-block" />
                  {event.time}
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-white/60 inline-block" />
                  {event.location}
                </li>
              </ul>

              {/* Button */}
              <Link href={`/events/${index + 1}`}>
                <Button className="btn-gradient text-white font-semibold px-6 shrink-0">
                  Join Now
                </Button>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
