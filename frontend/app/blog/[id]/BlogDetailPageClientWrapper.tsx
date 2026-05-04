"use client";
import dynamic from "next/dynamic";
const BlogDetailPageClient = dynamic(() => import("./BlogDetailPageClient"), {
  ssr: false,
});
export default function BlogDetailPageClientWrapper() {
  return <BlogDetailPageClient />;
}
