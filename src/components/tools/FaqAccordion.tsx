"use client";

import { useState } from "react";
import { cn } from "@/lib/utils/cn";

export interface FaqItem {
  question: string;
  answer: string;
}

interface FaqAccordionProps {
  items: FaqItem[];
  className?: string;
}

export function FaqAccordion({ items, className }: FaqAccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  if (items.length === 0) return null;

  return (
    <div className={cn("flex flex-col divide-y divide-gray-200 border-y border-gray-200", className)}>
      {items.map((item, index) => {
        const isOpen = openIndex === index;
        return (
          <div key={index}>
            <button
              onClick={() => setOpenIndex(isOpen ? null : index)}
              className="flex w-full items-center justify-between gap-4 py-4 text-left"
              aria-expanded={isOpen}
            >
              <span className="text-sm font-medium text-[#1A2B4C]">{item.question}</span>
              <span
                className={cn(
                  "shrink-0 text-[#00B4D8] transition-transform",
                  isOpen && "rotate-45"
                )}
              >
                +
              </span>
            </button>
            {isOpen && (
              <p className="pb-4 text-sm text-gray-600">{item.answer}</p>
            )}
          </div>
        );
      })}
    </div>
  );
}