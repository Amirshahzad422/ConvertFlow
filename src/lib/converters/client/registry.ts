import { apngToGif } from "./apngToGif";
import { audioToMp3 } from "./audioToMp3";
import { aviToGif } from "./aviToGif";
import { compressGif } from "./compressGif";
import { compressJpeg } from "./compressJpeg";
import { compressMp3 } from "./compressMp3";
import { compressPdf } from "./compressPdf";
import { compressPng } from "./compressPng";
import { compressVideo } from "./compressVideo";
import { compressWav } from "./compressWav";
import { convertToMp3 } from "./convertToMp3";
import { convertToMp4 } from "./convertToMp4";
import { gifToApng } from "./gifToApng";
import { gifToMp4 } from "./gifToMp4";
import { heicToJpg } from "./heicToJpg";
import { heicToPdf } from "./heicToPdf";
import { heicToPng } from "./heicToPng";
import { imageToGif } from "./imageToGif";
import { imageToPdf } from "./imageToPdf";
import { jfifToPng } from "./jfifToPng";
import { jpgToPdf } from "./jpgToPdf";
import { movToGif } from "./movToGif";
import { movToMp4 } from "./movToMp4";
import { mp3ToOgg } from "./mp3ToOgg";
import { mp4ToGif } from "./mp4ToGif";
import { mp4ToMp3 } from "./mp4ToMp3";
import { pdfToImages } from "./pdfToImages";
import { mergePdfs, rotatePdf, splitPdf } from "./pdfTools";
import { svgToPng } from "./svgToPng";
import { videoToGif } from "./videoToGif";
import { videoToMp3 } from "./videoToMp3";
import { webmToGif } from "./webmToGif";
import { webpToJpg } from "./webpToJpg";
import { webpToPng } from "./webpToPng";
import { zipFile } from "./zipFile";

export type ConverterFn = (file: File) => Promise<{ blob: Blob; filename: string }>;
export type BatchConverterFn = (files: File[]) => Promise<{ blob: Blob; filename: string }>;

export const converterRegistry: Record<string, ConverterFn> = {
  apngToGif,
  audioToMp3,
  aviToGif,
  compressGif,
  compressJpeg,
  compressMp3,
  compressPdf,
  compressPng,
  compressVideo,
  compressWav,
  convertToMp3,
  convertToMp4,
  gifToApng,
  gifToMp4,
  heicToJpg,
  heicToPdf,
  heicToPng,
  imageToGif,
  imageToPdf,
  jfifToPng,
  jpgToPdf,
  movToGif,
  movToMp4,
  mp3ToOgg,
  mp4ToGif,
  mp4ToMp3,
  pdfToImages,
  rotatePdf,
  splitPdf,
  svgToPng,
  videoToGif,
  videoToMp3,
  webmToGif,
  webpToJpg,
  webpToPng,
  zipFile,
};

export const batchConverterRegistry: Record<string, BatchConverterFn> = {
  mergePdfs,
};
