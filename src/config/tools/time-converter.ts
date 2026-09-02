import type { ToolConfig } from "./types";

export const timeConverterConfig: ToolConfig = {
  slug: "time-converter",
  name: "Time Converter",
  description:
    "Convert between nanoseconds, milliseconds, seconds, minutes, hours, days, weeks, months, years, decades, and centuries, plus special units like leap years, sidereal time, and lunar months.",
  category: "utility",
  operation: "tool",
  fromFormat: "Time",
  toFormat: "Time",
  howToSteps: [
    "Pick a category: Standard Units, Extended Units, or Astronomical Units.",
    "Select the \"From\" unit and enter the value you want to convert.",
    "Select the \"To\" unit — the converted value updates instantly.",
    "Use the swap button to flip the from/to units in one click.",
  ],
  faq: [
    {
      question: "What time units are supported?",
      answer:
        "Standard units (nanosecond through year), extended units (decade, century, millennium, fortnight, quarter, semester), and astronomical units (leap year, sidereal day, sidereal year, lunar month).",
    },
    {
      question: "How accurate are the conversions?",
      answer:
        "Conversions use precise factors (e.g. a year is treated as 365 days for standard units, and true sidereal/lunar durations for astronomical units) and are calculated instantly as you type.",
    },
    {
      question: "Can I convert astronomical time units like sidereal days?",
      answer:
        "Yes — the Astronomical Units category includes leap year, sidereal day, sidereal year, and lunar month conversions alongside the standard ones.",
    },
    {
      question: "Is there a limit to how large a value I can convert?",
      answer:
        "No practical limit — enter any numeric value and it converts instantly using the selected unit's factor.",
    },
  ],
  converterFn: "",
  relatedTools: ["age-calculator", "unit-converter"],
  metaTitle: "Time Converter — Convert Between Time Units Online Free",
  metaDescription:
    "Convert between nanoseconds, seconds, minutes, hours, days, years, and special units like sidereal time and lunar months. Free online time converter.",
  icon: "⏱️",
  popular: false,
  customPage: true,
  route: "/convert/time-converter",
};
