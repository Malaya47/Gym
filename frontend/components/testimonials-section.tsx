import Image from "next/image";

export function TestimonialsSection() {
  const testimonials = [
    {
      name: "Lorem ipsum",
      role: "Lorem",
      rating: 4.5,
      image: "/trainer-preview.png",
      content:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    },
    {
      name: "Lorem ipsum",
      role: "Lorem",
      rating: 4.5,
      image: "/trainer-preview.png",
      content:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    },
    {
      name: "Lorem ipsum",
      role: "Lorem",
      rating: 4.5,
      image: "/trainer-preview.png",
      content:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    },
  ];

  return (
    <section className="py-10 bg-transparent">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            TESTIMONIALS
          </h2>
          <p className="text-white/60">
            Real stories from people who transformed their lives
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="relative rounded-xl p-8 border border-[#733EA6] shadow-[0_0_8px_0_#733EA6] backdrop-blur-sm"
              style={{ background: "#0300044D" }}
            >
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-3">
                  <Image
                    src={testimonial.image}
                    alt={testimonial.name}
                    width={48}
                    height={48}
                    className="rounded-full object-cover"
                  />
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
        {/* Carousel dots (static for now) */}
        <div className="flex justify-center mt-8 gap-2">
          <span className="w-2 h-2 rounded-full bg-white/60" />
          <span className="w-2 h-2 rounded-full bg-red-500" />
          <span className="w-2 h-2 rounded-full bg-white/60" />
        </div>
      </div>
    </section>
  );
}
