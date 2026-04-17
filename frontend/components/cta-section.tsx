import { getSiteText } from "@/lib/content";

export async function CTASection() {
  const text = await getSiteText("cta");

  return (
    <section className="py-20 bg-transparent">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white">
            {text.cta_title || "START YOUR JOURNEY TODAY"}
          </h2>
        </div>
      </div>
    </section>
  );
}
