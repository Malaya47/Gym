import { BlogSection } from "@/components/blog/blog-section";
import { Footer } from "@/components/footer";

export default function BlogPage() {
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
      <div className="relative z-10 pt-16">
        <BlogSection />
        <Footer />
      </div>
    </main>
  );
}
