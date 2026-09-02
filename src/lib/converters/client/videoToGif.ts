import { runFFmpeg } from "./ffmpeg";

/**
 * Converts a generic video file (MP4, AVI, MOV, WMV, FLV, WEBM, ...) to
 * an animated GIF using a palette-based two-pass filter, capped to the
 * first 5 seconds to keep output size reasonable.
 */
export async function videoToGif(file: File): Promise<{ blob: Blob; filename: string }> {
  const extension = file.name.split(".").pop() || "mp4";
  const inputName = `input.${extension}`;
  const outputName = "output.gif";

  const blob = await runFFmpeg(
    inputName,
    file,
    [
      "-i",
      inputName,
      "-vf",
      "fps=10,scale=480:-1:flags=lanczos,split[s0][s1];[s0]palettegen[p];[s1][p]paletteuse",
      "-loop",
      "0",
      "-t",
      "5",
      outputName,
    ],
    outputName,
    "image/gif"
  );

  const filename = file.name.replace(/\.[^/.]+$/, ".gif");
  return { blob, filename };
}
