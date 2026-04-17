"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import {
  GalleryImage as GalleryImageType,
  SiteText,
  getImageUrl,
} from "@/lib/content";

const API = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

const DEFAULT_CATEGORIES = [
  "All",
  "Events",
  "Workouts",
  "Training Sessions",
  "Transformations",
];

const DEFAULT_IMAGES: GalleryImageType[] = [
  {
    id: 1,
    src: "/gallery-1.jpg",
    category: "Training Sessions",
    alt: "Group training session",
    gridCol: "1/3",
    gridRow: "1/2",
    order: 0,
    isActive: true,
  },
  {
    id: 2,
    src: "/gallery-2.jpg",
    category: "Workouts",
    alt: "Workout",
    gridCol: "3/4",
    gridRow: "1/4",
    order: 1,
    isActive: true,
  },
  {
    id: 3,
    src: "/gallery-3.jpg",
    category: "Events",
    alt: "Boxing event",
    gridCol: "4/5",
    gridRow: "1/2",
    order: 2,
    isActive: true,
  },
  {
    id: 4,
    src: "/gallery-4.jpg",
    category: "Training Sessions",
    alt: "Stretching session",
    gridCol: "5/6",
    gridRow: "1/2",
    order: 3,
    isActive: true,
  },
  {
    id: 5,
    src: "/gallery-5.jpg",
    category: "Training Sessions",
    alt: "Personal training",
    gridCol: "1/2",
    gridRow: "2/3",
    order: 4,
    isActive: true,
  },
  {
    id: 6,
    src: "/gallery-6.jpg",
    category: "Events",
    alt: "Nutrition workshop",
    gridCol: "2/3",
    gridRow: "2/3",
    order: 5,
    isActive: true,
  },
  {
    id: 7,
    src: "/gallery-7.jpg",
    category: "Workouts",
    alt: "Battle ropes workout",
    gridCol: "1/3",
    gridRow: "3/4",
    order: 6,
    isActive: true,
  },
  {
    id: 8,
    src: "/gallery-8.jpg",
    category: "Workouts",
    alt: "Weight training",
    gridCol: "4/5",
    gridRow: "2/3",
    order: 7,
    isActive: true,
  },
  {
    id: 9,
    src: "/gallery-9.jpg",
    category: "Transformations",
    alt: "Transformation",
    gridCol: "5/6",
    gridRow: "2/3",
    order: 8,
    isActive: true,
  },
  {
    id: 10,
    src: "/gallery-10.jpg",
    category: "Transformations",
    alt: "Pull-up transformation",
    gridCol: "4/5",
    gridRow: "3/4",
    order: 9,
    isActive: true,
  },
  {
    id: 11,
    src: "/gallery-11.jpg",
    category: "Workouts",
    alt: "Gym workout",
    gridCol: "5/6",
    gridRow: "3/4",
    order: 10,
    isActive: true,
  },
];

function GalleryImg({ src, alt }: { src: string; alt: string }) {
  return (
    <div className="relative w-full h-full overflow-hidden rounded-2xl group cursor-pointer">
      <Image
        src={src}
        alt={alt}
        fill
        className="object-cover transition-transform duration-500 group-hover:scale-105"
        sizes="(max-width: 768px) 50vw, 25vw"
      />
      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-300 rounded-2xl" />
    </div>
  );
}

export function GallerySection() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [images, setImages] = useState<GalleryImageType[]>(DEFAULT_IMAGES);
  const [text, setText] = useState<SiteText>({});

  useEffect(() => {
    fetch(`${API}/content/gallery`)
      .then((r) => (r.ok ? r.json() : null))
      .then((data) => data && data.length && setImages(data))
      .catch(() => {});
    fetch(`${API}/content/text/gallery`)
      .then((r) => (r.ok ? r.json() : null))
      .then((data) => data && setText(data))
      .catch(() => {});
  }, []);

  const allCategories = [
    "All",
    ...Array.from(new Set(images.map((i) => i.category).filter(Boolean))),
  ];
  const categories =
    allCategories.length > 1 ? allCategories : DEFAULT_CATEGORIES;

  const filtered = images.filter(
    (img) => activeCategory === "All" || img.category === activeCategory,
  );

  const gridItems = images.filter((img) => img.gridCol && img.gridRow);

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-white uppercase tracking-wide mb-4">
            {text.gallery_section_title || "Gallery"}
          </h1>
          <p className="text-white/50 text-sm max-w-xl mx-auto">
            {text.gallery_section_subtitle ||
              "Lorem ipsum dolor sit amet, consectetur adipiscing elit."}
          </p>
        </div>

        {/* Filter Tabs */}
        <div
          className="flex items-center gap-1 p-1 w-full mb-10 rounded-full border border-white/10"
          style={{
            background: "#0300044D",
            border: "1px solid rgba(255,255,255,0.1)",
          }}
        >
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`flex-1 text-center px-5 py-2 rounded-full text-sm font-medium transition-colors whitespace-nowrap ${
                activeCategory === cat
                  ? "bg-[#7a1f2e] text-white"
                  : "text-white/60 hover:text-white"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* All view: exact CSS grid matching the screenshot */}
        {activeCategory === "All" ? (
          <div
            className="w-full"
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(5, 1fr)",
              gridTemplateRows: "200px 200px 200px",
              gap: "12px",
            }}
          >
            {gridItems.map((item) => (
              <div
                key={item.id}
                style={{ gridColumn: item.gridCol!, gridRow: item.gridRow! }}
              >
                <GalleryImg src={getImageUrl(item.src)} alt={item.alt} />
              </div>
            ))}
          </div>
        ) : (
          /* Filtered view: simple responsive grid */
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {filtered.map((img) => (
              <div key={img.id} className="aspect-square">
                <GalleryImg src={getImageUrl(img.src)} alt={img.alt} />
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
