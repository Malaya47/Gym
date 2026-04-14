import { Navbar } from "@/components/navbar";
import { ShopHero } from "@/components/shop/shop-hero";
import { ShopProductsSection } from "@/components/shop/shop-products-section";
import { Footer } from "@/components/footer";

export default function ShopPage() {
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
        <ShopHero />
        <ShopProductsSection />
        <Footer />
      </div>
    </main>
  );
}
