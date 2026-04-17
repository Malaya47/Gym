"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Search } from "lucide-react";
import { BlogPost, SiteText, getImageUrl } from "@/lib/content";

const API = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

const DEFAULT_POSTS: BlogPost[] = [
  {
    id: 1,
    title: "Lorem ipsum",
    excerpt: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    image: "/training-zone-1.png",
    isActive: true,
  },
  {
    id: 2,
    title: "Lorem ipsum",
    excerpt: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    image: "/training-zone-2.png",
    isActive: true,
  },
  {
    id: 3,
    title: "Lorem ipsum",
    excerpt: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    image: "/training-zone-3.png",
    isActive: true,
  },
  {
    id: 4,
    title: "Lorem ipsum",
    excerpt: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    image: "/training-zone-4.png",
    isActive: true,
  },
  {
    id: 5,
    title: "Lorem ipsum",
    excerpt: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    image: "/equipment-1.png",
    isActive: true,
  },
  {
    id: 6,
    title: "Lorem ipsum",
    excerpt: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    image: "/equipment-2.png",
    isActive: true,
  },
];

export function BlogSection() {
  const [query, setQuery] = useState("");
  const [posts, setPosts] = useState<BlogPost[]>(DEFAULT_POSTS);
  const [text, setText] = useState<SiteText>({});

  useEffect(() => {
    fetch(`${API}/content/blog`)
      .then((r) => (r.ok ? r.json() : null))
      .then((data) => data && data.length && setPosts(data))
      .catch(() => {});
    fetch(`${API}/content/text/blog`)
      .then((r) => (r.ok ? r.json() : null))
      .then((data) => data && setText(data))
      .catch(() => {});
  }, []);

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
            {text.blog_section_title || "BLOG"}
          </h1>
          <p className="text-white/60 text-sm sm:text-base max-w-xl mx-auto">
            {text.blog_section_subtitle ||
              "Lorem ipsum dolor sit amet, consectetur adipiscing elit."}
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
                  src={getImageUrl(post.image) || "/training-zone-1.png"}
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
