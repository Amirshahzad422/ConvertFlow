import { runFFmpeg } from "./ffmpeg";

/**
 * Converts a generic video file (AVI, MOV, WEBM, MKV, FLV, WMV, 3GP, ...)
 * to MP4 using H.264 video + AAC audio at a balanced "medium" quality
 * (CRF 23), matching the default settings of the original MP4 Converter
 * tool.
 */
export async function convertToMp4(file: File): Promise<{ blob: Blob; filename: string }> {
  const extension = file.name.split(".").pop() || "mp4";
  const inputName = `input.${extension}`;
  const outputName = "output.mp4";

  const blob = await runFFmpeg(
    inputName,
    file,
    [
      "-i",
      inputName,
      "-c:v",
      "libx264",
      "-crf",
      "23",
      "-c:a",
      "aac",
      "-b:a",
      "128k",
      "-y",
      outputName,
    ],
    outputName,
    "video/mp4"
  );

  const filename = file.name.replace(/\.[^/.]+$/, ".mp4");
  return { blob, filename };
}
