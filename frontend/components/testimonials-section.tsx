import Image from "next/image";
import { getTestimonials, getSiteText, getImageUrl } from "@/lib/content";

export async function TestimonialsSection() {
  const [testimonials, text] = await Promise.all([
    getTestimonials(),
    getSiteText("testimonials"),
  ]);

  const display =
    testimonials.length > 0
      ? testimonials
      : [
          {
            id: 0,
            name: "Lorem ipsum",
            role: "Lorem",
            rating: 4.5,
            image: "/trainer-preview.png",
            content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
            order: 0,
          },
        ];

  return (
    <section className="py-10 bg-transparent">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            {text.testimonials_section_title || "TESTIMONIALS"}
          </h2>
          <p className="text-white/60">
            {text.testimonials_section_subtitle ||
              "Real stories from people who transformed their lives"}
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {display.map((testimonial) => (
            <div
              key={testimonial.id}
              className="relative rounded-xl p-8 border border-[#733EA6] shadow-[0_0_8px_0_#733EA6] backdrop-blur-sm"
              style={{ background: "#0300044D" }}
            >
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full overflow-hidden flex-shrink-0">
                    <Image
                      src={
                        getImageUrl(testimonial.image) || "/trainer-preview.png"
                      }
                      alt={testimonial.name}
                      width={48}
                      height={48}
                      className="object-cover w-full h-full"
                    />
                  </div>
                  <div>
                    <h4 className="text-white font-semibold text-base">
                      {testimonial.name}
                    </h4>
                    <p className="text-white/60 text-sm">{testimonial.role}</p>
                  </div>
                </div>
                <span className="text-red-500 font-semibold text-lg">
                  {testimonial.rating}
                </span>
              </div>
              <p className="text-white/90 text-base leading-relaxed">
                {testimonial.content}
              </p>
            </div>
          ))}
        </div>
        {/* Carousel dots */}
        <div className="flex justify-center mt-8 gap-2">
          <span className="w-2 h-2 rounded-full bg-white/60" />
          <span className="w-2 h-2 rounded-full bg-red-500" />
          <span className="w-2 h-2 rounded-full bg-white/60" />
        </div>
      </div>
    </section>
  );
}
