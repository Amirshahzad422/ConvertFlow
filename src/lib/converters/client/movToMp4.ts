import { runFFmpeg } from "./ffmpeg";

/**
 * Converts a MOV (QuickTime) video to MP4 using H.264 video + AAC audio
 * at a balanced "medium" quality (CRF 23), matching the default settings
 * of the original MOV to MP4 tool.
 */
export async function movToMp4(file: File): Promise<{ blob: Blob; filename: string }> {
  const inputName = "input.mov";
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
