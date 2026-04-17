import { GallerySection } from "@/components/gallery/gallery-section";
import { Footer } from "@/components/footer";

export const metadata = {
  title: "Gallery – FITNESS",
  description:
    "Browse our gym gallery showcasing events, workouts, and transformations.",
};

export default function GalleryPage() {
  return (
    <main className="min-h-screen relative">
      {/* Fixed Background */}
      <div
        className="fixed inset-0 z-0 pointer-events-none"
        style={{
          backgroundImage: `url('/gym-bg-texture.png')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundAttachment: "fixed",
        }}
      />

      {/* Content */}
      <div className="relative z-10">
        <div className="pt-16">
          <GallerySection />
          <Footer />
        </div>
      </div>
    </main>
  );
}
