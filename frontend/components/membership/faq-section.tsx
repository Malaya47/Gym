"use client";

import { useState } from "react";
import { ChevronUp, ChevronDown } from "lucide-react";

const faqs = [
  {
    question: "Lorem Ipsum Dolor Sit Amet, Consectetur Adipiscing Elit. ?",
    answer:
      "Lorem Ipsum Dolor Sit Amet, Consectetur Adipiscing Elit. Lorem Ipsum Dolor Sit Amet, Consectetur Adipiscing Elit. Lorem Ipsum Dolor Sit Amet, Consectetur Adipiscing Elit. Lorem Ipsum Dolor Sit Amet, Consectetur Adipiscing Elit. Lorem Ipsum Dolor Sit Amet, Consectetur Adipiscing Elit.",
  },
  {
    question: "Lorem Ipsum Dolor Sit Amet, Consectetur Adipiscing Elit.",
    answer:
      "Lorem Ipsum Dolor Sit Amet, Consectetur Adipiscing Elit. Lorem Ipsum Dolor Sit Amet, Consectetur Adipiscing Elit.",
  },
  {
    question: "Lorem Ipsum Dolor Sit Amet, Consectetur Adipiscing Elit.",
    answer:
      "Lorem Ipsum Dolor Sit Amet, Consectetur Adipiscing Elit. Lorem Ipsum Dolor Sit Amet, Consectetur Adipiscing Elit.",
  },
  {
    question: "Lorem Ipsum Dolor Sit Amet, Consectetur Adipiscing Elit.",
    answer:
      "Lorem Ipsum Dolor Sit Amet, Consectetur Adipiscing Elit. Lorem Ipsum Dolor Sit Amet, Consectetur Adipiscing Elit.",
  },
  {
    question: "Lorem Ipsum Dolor Sit Amet, Consectetur Adipiscing Elit.",
    answer:
      "Lorem Ipsum Dolor Sit Amet, Consectetur Adipiscing Elit. Lorem Ipsum Dolor Sit Amet, Consectetur Adipiscing Elit.",
  },
];

export function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="py-20 bg-transparent">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl sm:text-5xl font-extrabold text-white text-center mb-12 tracking-wide">
          FAQ
        </h2>

        <div className="flex flex-col gap-4">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={index}
                className="rounded-xl border overflow-hidden"
                style={{
                  borderColor: isOpen ? "#7C3AED" : "rgba(255,255,255,0.12)",
                  background: "#0300044D",
                }}
              >
                <button
                  className="w-full flex items-center justify-between px-6 py-5 text-left"
                  style={{ background: "#0a0a0a" }}
                  onClick={() => setOpenIndex(isOpen ? null : index)}
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

                {isOpen && (
                  <div className="px-6 pb-6 text-white/70 text-sm sm:text-base leading-relaxed border-t border-white/10 pt-4">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
