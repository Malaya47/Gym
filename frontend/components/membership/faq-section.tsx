"use client";

import { useEffect, useState } from "react";
import { ChevronUp, ChevronDown } from "lucide-react";

const API = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

type FaqItem = { id: number; question: string; answer: string; order: number };

export function FaqSection() {
  const [faqs, setFaqs] = useState<FaqItem[]>([]);
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  useEffect(() => {
    fetch(`${API}/content/faqs`)
      .then((r) => r.json())
      .then((data: FaqItem[]) => {
        setFaqs(data);
        if (data.length > 0) setOpenIndex(data[0].id);
      })
      .catch(() => {});
  }, []);

  if (faqs.length === 0) return null;

  return (
    <section className="py-20 bg-transparent">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl sm:text-5xl font-extrabold text-white text-center mb-12 tracking-wide">
          FAQ
        </h2>

        <div className="flex flex-col gap-4">
          {faqs.map((faq) => {
            const isOpen = openIndex === faq.id;
            return (
              <div
                key={faq.id}
                className="rounded-xl border overflow-hidden"
                style={{
                  borderColor: isOpen ? "#7C3AED" : "rgba(255,255,255,0.12)",
                  background: "#0300044D",
                }}
              >
                <button
                  className="w-full flex items-center justify-between px-6 py-5 text-left"
                  style={{ background: "#0a0a0a" }}
                  onClick={() => setOpenIndex(isOpen ? null : faq.id)}
                >
                  <span className="text-white font-medium text-base sm:text-lg">
                    {faq.question}
                  </span>
                  {isOpen ? (
                    <ChevronUp className="text-white shrink-0 ml-4" size={22} />
                  ) : (
                    <ChevronDown
                      className="text-white shrink-0 ml-4"
                      size={22}
                    />
                  )}
                </button>

                <div
                  className={`px-6 pb-6 text-white/70 text-sm sm:text-base leading-relaxed border-t border-white/10 pt-4 transition-all duration-300 ease-in-out overflow-hidden ${isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0 border-t-0 pt-0 pb-0"}`}
                  style={{
                    maxHeight: isOpen ? 400 : 0,
                    opacity: isOpen ? 1 : 0,
                    transition:
                      "max-height 0.3s cubic-bezier(0.4,0,0.2,1), opacity 0.3s cubic-bezier(0.4,0,0.2,1), padding 0.3s cubic-bezier(0.4,0,0.2,1)",
                    paddingTop: isOpen ? 16 : 0,
                    paddingBottom: isOpen ? 24 : 0,
                    borderTopWidth: isOpen ? 1 : 0,
                  }}
                  aria-hidden={!isOpen}
                >
                  {faq.answer}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
