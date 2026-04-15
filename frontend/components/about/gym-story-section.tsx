import Image from "next/image";

export function GymStorySection() {
  return (
    <section className="py-20 bg-transparent">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-start md:items-center gap-12">
          {/* Left - Title */}
          <div className="flex flex-col items-start w-full md:w-auto md:min-w-[420px]">
            <h2 className="text-5xl sm:text-6xl font-extrabold text-white leading-tight whitespace-pre-line">
              Gym Story
              {"\n"}& Mission
            </h2>
          </div>
          {/* Vertical Divider */}
          <div
            className="hidden md:block h-56 mx-8"
            style={{
              borderLeft: "3px solid",
              borderImage:
                "linear-gradient(180deg, #743EA7 0%, #4A215D 100%) 1",
              minHeight: "180px",
            }}
          />
          {/* Right - Text */}
          <div className="flex-1 flex items-center">
            <p className="text-white/70 text-lg leading-relaxed text-left">
              Lorem Ipsum Dolor Sit Amet, Consectetur Adipiscing Elit.Lorem
              Ipsum Dolor Sit Amet, Consectetur Adipiscing Elit.Lorem Ipsum
              Dolor Sit Amet, Consectetur Adipiscing Elit.Lorem Ipsum Dolor Sit
              Amet, Consectetur Adipiscing Elit.Lorem Ipsum Dolor Sit Amet,
              Consectetur Adipiscing Elit. Lorem Ipsum Dolor Sit Amet,
              Consectetur Adipiscing Elit.Lorem Ipsum Dolor Sit Amet,
              Consectetur Adipiscing Elit.Lorem Ipsum Dolor Sit Amet,
              Consectetur Adipiscing Elit. Lorem Ipsum Dolor Sit Amet,
              Consectetur Adipiscing Elit.Lorem Ipsum Dolor Sit Amet,
              Consectetur Adipiscing Elit.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
