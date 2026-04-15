import Image from "next/image";
import { Button } from "@/components/ui/button";

export function EventDetailContent() {
  return (
    <section className="py-16 bg-transparent">
      <div className="max-w-5xl mx-auto px-6 sm:px-8 lg:px-12 flex flex-col gap-6">
        {/* Event Description */}
        <div
          className="rounded-xl border border-white/10 p-8"
          style={{ background: "#0300044D" }}
        >
          <h3 className="text-2xl sm:text-3xl font-extrabold text-white mb-5 tracking-wide">
            EVENT DESCRIPTION
          </h3>
          <p className="text-white/70 text-sm sm:text-base leading-relaxed">
            Lorem Ipsum Dolor Sit Amet, Consectetur Adipiscing Elit.Lorem Ipsum
            Dolor Sit Amet, Consectetur Adipiscing Elit.Lorem Ipsum Dolor Sit
            Amet, Consectetur Adipiscing Elit.Lorem Ipsum Dolor Sit Amet,
            Consectetur Adipiscing Elit.Lorem Ipsum Dolor Sit Amet, Consectetur
            Adipiscing Elit.Lorem Ipsum Dolor Sit Amet, Consectetur Adipiscing
            Elit. Lorem Ipsum Dolor Sit Amet, Consectetur Adipiscing Elit.Lorem
            Ipsum Dolor Sit Amet, Consectetur Adipiscing Elit. Lorem Ipsum Dolor
            Sit Amet, Consectetur Adipiscing Elit.Lorem Ipsum Dolor Sit Amet,
            Consectetur Adipiscing Elit.
          </p>
        </div>

        {/* Trainer + Register Row */}
        <div className="grid md:grid-cols-2 gap-6">
          {/* Trainer Card */}
          <div
            className="rounded-xl border border-white/10 p-8 flex flex-col justify-between"
            style={{ background: "#0300044D" }}
          >
            <div className="flex items-start justify-between gap-4 mb-6">
              <h3 className="text-3xl font-extrabold text-white tracking-wide">
                JOHN DOE
              </h3>
              <div className="w-16 h-16 rounded-full overflow-hidden shrink-0 relative">
                <Image
                  src="/trainer-image.png"
                  alt="John Doe"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
            <div>
              <p className="text-white/80 text-sm font-medium mb-2">
                Trainer Coach
              </p>
              <p className="text-white/60 text-sm leading-relaxed mb-6">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem
                ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum
                dolor sit amet, consectetur adipiscing elit.
              </p>
              <Button
                variant="outline"
                className="border-white/30 text-white bg-transparent hover:bg-white/10 text-sm"
              >
                Connect With John
              </Button>
            </div>
          </div>

          {/* Register Card */}
          <div
            className="rounded-xl border border-white/10 p-8 flex flex-col items-center justify-center text-center gap-4"
            style={{ background: "#0300044D" }}
          >
            <h3 className="text-3xl font-extrabold text-white tracking-wide">
              REGISTER NOW
            </h3>
            {/* Divider glow */}
            <div
              className="w-full h-px my-2"
              style={{
                background:
                  "linear-gradient(90deg, transparent, #7C3AED88, transparent)",
              }}
            />
            <p className="text-white/80 text-lg">
              Hurry! Limited seats availabe.
            </p>
            <Button className="btn-gradient text-white font-semibold px-8 py-5 text-base">
              Only 5 Seats Left!
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
