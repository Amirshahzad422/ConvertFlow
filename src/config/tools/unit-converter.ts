import type { ToolConfig } from "./types";

export const unitConverterConfig: ToolConfig = {
  slug: "unit-converter",
  name: "Unit Converter",
  description:
    "Convert between units across 8 categories — length, weight, temperature, area, volume, time, speed, and pressure — with over 50 supported units and instant, real-time results.",
  category: "utility",
  operation: "tool",
  fromFormat: "Unit",
  toFormat: "Unit",
  howToSteps: [
    "Choose a category: length, weight, temperature, area, volume, time, speed, or pressure.",
    "Select the \"From\" unit and type in the value you want to convert.",
    "Select the \"To\" unit — the result appears instantly.",
    "Use the swap button to reverse the conversion direction.",
  ],
  faq: [
    {
      question: "Which unit categories are supported?",
      answer:
        "Length, weight, temperature, area, volume, time, speed, and pressure — 8 categories covering more than 50 individual units.",
    },
    {
      question: "Does it handle temperature conversions correctly?",
      answer:
        "Yes. Temperature (Celsius, Fahrenheit, Kelvin) uses proper formula-based conversion rather than a simple multiplier, since temperature scales don't share a common zero point.",
    },
    {
      question: "How precise are the results?",
      answer:
        "Results are calculated to 8 decimal places of precision and trimmed of trailing zeros for readability.",
    },
    {
      question: "Can I quickly reverse a conversion?",
      answer:
        "Yes — the swap button flips the \"From\" and \"To\" units and carries the current result over as the new input.",
    },
  ],
  converterFn: "",
  relatedTools: ["time-converter", "age-calculator"],
  metaTitle: "Unit Converter — Convert Length, Weight, Temperature & More",
  metaDescription:
    "Convert between length, weight, temperature, area, volume, speed, and pressure units online for free. Fast, accurate unit conversion with 50+ units.",
  icon: "📐",
  popular: false,
  customPage: true,
  route: "/convert/unit-converter",
};
