import type { ToolConfig } from "./types";

export const ageCalculatorConfig: ToolConfig = {
  slug: "age-calculator",
  name: "Age Calculator",
  description:
    "Calculate your exact age in days, weeks, months, years, decades, and centuries. See your next birthday countdown and age broken down into every unit at once.",
  category: "utility",
  operation: "tool",
  fromFormat: "Date",
  toFormat: "Age",
  howToSteps: [
    "Enter your birth date.",
    "Optionally set a different \"current date\" to calculate age as of a specific day (defaults to today).",
    "Choose a display unit (days, weeks, months, years, decades, centuries, or millennia).",
    'Click "Calculate Age" to see your exact age in every unit, plus your next birthday countdown.',
  ],
  faq: [
    {
      question: "What units can I calculate my age in?",
      answer:
        "Days, weeks, months, years, decades, centuries, and millennia — the results panel shows your age broken down into all of these at once.",
    },
    {
      question: "Can I calculate age as of a past or future date instead of today?",
      answer:
        "Yes. Leave the \"Current Date\" field empty to use today's date, or set it to any other date to calculate age as of that day.",
    },
    {
      question: "Does it account for leap years?",
      answer:
        "Yes, the calculation accounts for leap years and returns the exact number of leap years within your lifespan along with your precise age in years, months, and days.",
    },
    {
      question: "Does it tell me when my next birthday is?",
      answer:
        "Yes — the results include your next birthday date and exactly how many days remain until it.",
    },
  ],
  converterFn: "",
  relatedTools: ["time-converter", "unit-converter"],
  metaTitle: "Age Calculator — Calculate Your Exact Age Online Free",
  metaDescription:
    "Calculate your exact age in days, weeks, months, years, decades, and centuries. Free online age calculator with next-birthday countdown.",
  icon: "🎂",
  popular: false,
  customPanel: "age-calculator",
  legacyPaths: ["/convert/age-calculator"],
};
