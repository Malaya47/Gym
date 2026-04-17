"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { BlogPost } from "@/lib/content";

interface BlogDetailContentProps {
  post: BlogPost;
}

export function BlogDetailContent({ post }: BlogDetailContentProps) {
  return (
    <section className="py-16 bg-transparent">
      <div className="max-w-5xl mx-auto px-6 sm:px-8 lg:px-12 flex flex-col gap-6">
        {/* Back link */}
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-white/50 hover:text-white text-sm transition-colors w-fit"
        >
          <ArrowLeft size={16} />
          Back to Blog
        </Link>

        {/* Excerpt */}
        <div
          className="rounded-xl border border-white/10 p-8"
          style={{ background: "#0300044D" }}
        >
          <p className="text-white/80 text-base sm:text-lg leading-relaxed font-medium italic">
            {post.excerpt}
          </p>
        </div>

        {/* Full Content */}
        <div
          className="rounded-xl border border-white/10 p-8"
          style={{ background: "#0300044D" }}
        >
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white mb-6 tracking-wide">
            FULL ARTICLE
          </h2>
          {/* Divider glow */}
          <div
            className="w-full h-px mb-6"
            style={{
              background:
                "linear-gradient(90deg, transparent, #7C3AED88, transparent)",
            }}
          />
          <div className="text-white/70 text-sm sm:text-base leading-relaxed whitespace-pre-line">
            {post.content || post.excerpt}
          </div>
        </div>
      </div>
    </section>
  );
}
