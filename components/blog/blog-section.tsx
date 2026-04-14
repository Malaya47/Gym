"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Search } from "lucide-react";

const blogImages = [
  "/training-zone-1.png",
  "/training-zone-2.png",
  "/training-zone-3.png",
  "/training-zone-4.png",
  "/equipment-1.png",
  "/equipment-2.png",
];

const posts = blogImages.map((img, i) => ({
  id: i + 1,
  image: img,
  title: "Lorem ipsum",
  excerpt:
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
}));

export function BlogSection() {
  const [query, setQuery] = useState("");

  const filtered = posts.filter(
    (p) =>
      p.title.toLowerCase().includes(query.toLowerCase()) ||
      p.excerpt.toLowerCase().includes(query.toLowerCase()),
  );

  return (
    <section className="py-20 bg-transparent">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <div className="text-center mb-6">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-white tracking-wide mb-4">
            BLOG
          </h1>
          <p className="text-white/60 text-sm sm:text-base max-w-xl mx-auto">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum
            dolor sit amet, consectetur adipiscing elit.
          </p>
        </div>

        {/* Search */}
        <div className="flex justify-center mb-12">
          <div className="relative w-full max-w-md">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search"
              className="w-full rounded-full bg-white text-black placeholder-gray-400 px-5 py-3 pr-12 text-sm outline-none"
            />
            <Search
              className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500"
              size={18}
            />
          </div>
        </div>

        {/* Blog Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filtered.map((post) => (
            <div key={post.id} className="flex flex-col">
              {/* Image */}
              <div className="relative w-full aspect-[4/3] rounded-xl overflow-hidden mb-4">
                <Image
                  src={post.image}
                  alt={post.title}
                  fill
                  className="object-cover"
                />
              </div>

              {/* Content */}
              <h3 className="text-white font-semibold text-lg mb-2">
                {post.title}
              </h3>
              <p className="text-white/60 text-sm leading-relaxed mb-3 flex-1">
                {post.excerpt}
              </p>
              <Link
                href={`/blog/${post.id}`}
                className="text-white/60 text-sm hover:text-white transition-colors self-end"
              >
                read more..
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
