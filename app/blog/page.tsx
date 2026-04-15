import { BlogSection } from "@/components/blog/blog-section";
import { Footer } from "@/components/footer";

export default function BlogPage() {
  return (
    <main className="min-h-screen relative">
      {/* Fixed Background */}
      <div
        className="fixed inset-0 z-0 pointer-events-none"
        style={{
          backgroundImage: `url('https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image%2071-U3psbOA2NUHDgaxxj2pfj82aOWxjKN.png')`,
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
