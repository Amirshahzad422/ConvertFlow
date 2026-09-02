"use client";

import dynamic from "next/dynamic";
import type { ComponentType } from "react";

/**
 * Registry of interactive tool panels. A ToolConfig with `customPanel: "<key>"`
 * renders the matching component here in place of the generic ToolConverterPanel,
 * while still using the shared src/app/(tools)/[slug]/page.tsx template for the
 * hero, how-to, FAQ, related tools, JSON-LD and metadata.
 *
 * To add an interactive tool: drop a `*Panel.tsx` component in this folder, add
 * one line below, and set `customPanel` in the tool's config file.
 */
const Loading = () => (
  <div className="flex min-h-[240px] items-center justify-center rounded-2xl border border-slate-200 bg-slate-50 text-sm font-medium text-slate-500">
    Loading tool…
  </div>
);

const panels: Record<string, ComponentType> = {
  "image-converter": dynamic(() => import("./ImageConverterPanel"), { loading: Loading }),
  "image-compressor": dynamic(() => import("./ImageCompressorPanel"), { loading: Loading }),
  "image-cropper": dynamic(() => import("./ImageCropperPanel"), { loading: Loading }),
  "image-rotate": dynamic(() => import("./ImageRotatePanel"), { loading: Loading }),
  "color-picker": dynamic(() => import("./ColorPickerPanel"), { loading: Loading }),
  "age-calculator": dynamic(() => import("./AgeCalculatorPanel"), { loading: Loading }),
  "unit-converter": dynamic(() => import("./UnitConverterPanel"), { loading: Loading }),
  "time-converter": dynamic(() => import("./TimeConverterPanel"), { loading: Loading }),
  "audio-joiner": dynamic(() => import("./AudioJoinerPanel"), { loading: Loading }),
  "audio-trimmer": dynamic(() => import("./AudioTrimmerPanel"), { loading: Loading }),
  "video-joiner": dynamic(() => import("./VideoJoinerPanel"), { loading: Loading }),
};

export function CustomToolPanel({ panelKey }: { panelKey: string }) {
  const Panel = panels[panelKey];
  if (!Panel) {
    return (
      <div className="rounded-2xl border border-rose-200 bg-rose-50 p-4 text-sm font-medium text-rose-700">
        No panel registered for &quot;{panelKey}&quot;.
      </div>
    );
  }
  return <Panel />;
}

export const registeredPanelKeys = Object.keys(panels);
