import type { ToolConfig } from "./types";

import { ageCalculatorConfig } from "./age-calculator";
import { apngGifConfig } from "./apng-gif";
import { archiveConverterConfig } from "./archive-converter";
import { audioConverterConfig } from "./audio-converter";
import { audioJoinerConfig } from "./audio-joiner";
import { audioTrimmerConfig } from "./audio-trimmer";
import { aviGifConfig } from "./avi-gif";
import { colorPickerConfig } from "./color-picker";
import { gifApngConfig } from "./gif-apng";
import { gifCompressorConfig } from "./gif-compressor";
import { gifMp4Config } from "./gif-mp4";
import { heicJpgConfig } from "./heic-jpg";
import { heicPdfConfig } from "./heic-pdf";
import { heicPngConfig } from "./heic-png";
import { imageCompressorConfig } from "./image-compressor";
import { imageConverterConfig } from "./image-converter";
import { imageCropperConfig } from "./image-cropper";
import { imageGifConfig } from "./image-gif";
import { imageRotateConfig } from "./image-rotate";
import { imageToPdfConfig } from "./image-to-pdf";
import { jfifPngConfig } from "./jfif-png";
import { jpegCompressorConfig } from "./jpeg-compressor";
import { jpgPdfConfig } from "./jpg-pdf";
import { movGifConfig } from "./mov-gif";
import { movMp4Config } from "./mov-mp4";
import { mp3CompressorConfig } from "./mp3-compressor";
import { mp3ConverterConfig } from "./mp3-converter";
import { mp3OggConfig } from "./mp3-ogg";
import { mp4ConverterConfig } from "./mp4-converter";
import { mp4GifConfig } from "./mp4-gif";
import { mp4Mp3Config } from "./mp4-mp3";
import { pdfCompressorConfig } from "./pdf-compressor";
import { pdfMergeConfig } from "./pdf-merge";
import { pdfRotateConfig } from "./pdf-rotate";
import { pdfSplitConfig } from "./pdf-split";
import { pdfToImagesConfig } from "./pdf-to-images";
import { pngCompressorConfig } from "./png-compressor";
import { svgConverterConfig } from "./svg-converter";
import { timeConverterConfig } from "./time-converter";
import { unitConverterConfig } from "./unit-converter";
import { videoCompressorConfig } from "./video-compressor";
import { videoGifConfig } from "./video-gif";
import { videoJoinerConfig } from "./video-joiner";
import { videoMp3Config } from "./video-mp3";
import { wavCompressorConfig } from "./wav-compressor";
import { webmGifConfig } from "./webm-gif";
import { webpJpgConfig } from "./webp-jpg";
import { webpPngConfig } from "./webp-png";

export const tools: ToolConfig[] = [
  ageCalculatorConfig,
  apngGifConfig,
  archiveConverterConfig,
  audioConverterConfig,
  audioJoinerConfig,
  audioTrimmerConfig,
  aviGifConfig,
  colorPickerConfig,
  gifApngConfig,
  gifCompressorConfig,
  gifMp4Config,
  heicJpgConfig,
  heicPdfConfig,
  heicPngConfig,
  imageCompressorConfig,
  imageConverterConfig,
  imageCropperConfig,
  imageGifConfig,
  imageRotateConfig,
  imageToPdfConfig,
  jfifPngConfig,
  jpegCompressorConfig,
  jpgPdfConfig,
  movGifConfig,
  movMp4Config,
  mp3CompressorConfig,
  mp3ConverterConfig,
  mp3OggConfig,
  mp4ConverterConfig,
  mp4GifConfig,
  mp4Mp3Config,
  pdfCompressorConfig,
  pdfMergeConfig,
  pdfRotateConfig,
  pdfSplitConfig,
  pdfToImagesConfig,
  pngCompressorConfig,
  svgConverterConfig,
  timeConverterConfig,
  unitConverterConfig,
  videoCompressorConfig,
  videoGifConfig,
  videoJoinerConfig,
  videoMp3Config,
  wavCompressorConfig,
  webmGifConfig,
  webpJpgConfig,
  webpPngConfig,
];

export function getToolBySlug(slug: string): ToolConfig | undefined {
  return tools.find((tool) => tool.slug === slug);
}

export function getToolsByCategory(category: ToolConfig["category"]): ToolConfig[] {
  return tools.filter((tool) => tool.category === category);
}
