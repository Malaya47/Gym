import { Navbar } from "@/components/navbar";
import { EventDetailHero } from "@/components/events/event-detail-hero";
import { EventDetailContent } from "@/components/events/event-detail-content";
import { NewsletterSection } from "@/components/newsletter-section";
import { Footer } from "@/components/footer";

export default function EventDetailPage() {
  return (
    <main className="min-h-screen relative">
      {/* Fixed Background */}
      <div
        className="fixed inset-0 z-0"
        style={{
          backgroundImage: `url('https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image%2071-U3psbOA2NUHDgaxxj2pfj82aOWxjKN.png')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundAttachment: "fixed",
        }}
      />

      {/* Content */}
      <div className="relative z-10">
        <Navbar />
        <EventDetailHero />
        <EventDetailContent />
        <NewsletterSection />
        <Footer />
      </div>
    </main>
  );
}
