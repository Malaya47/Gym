"use client";

import Image from "next/image";
import { BlogPost, getImageUrl } from "@/lib/content";

interface BlogDetailHeroProps {
  post: BlogPost;
}

export function BlogDetailHero({ post }: BlogDetailHeroProps) {
  const imageUrl = getImageUrl(post.image) || "/training-zone-1.png";

  return (
    <section className="relative min-h-[70vh] flex items-end pb-16">
      {/* Blog Image as Background */}
      <div className="absolute inset-0 z-0">
        <Image
          src={imageUrl}
          alt={post.title}
          fill
          className="object-cover object-center"
          priority
        />
        {/* Purple tint overlay */}
        <div className="absolute inset-0 bg-purple-950/50 mix-blend-multiply" />
        <div className="absolute inset-0 bg-linear-to-b from-black/30 via-transparent to-black/90" />
      </div>

      <div className="relative z-10 w-full max-w-5xl mx-auto px-6 sm:px-8 lg:px-12">
        {post.createdAt && (
          <p className="text-white/50 text-sm font-medium mb-3 tracking-widest uppercase">
            {new Date(post.createdAt).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>
        )}
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-white tracking-wide">
          {post.title}
        </h1>
      </div>
    </section>
  );
}
