import { runFFmpeg } from "./ffmpeg";

/**
 * Converts an APNG (or PNG) animation to an animated GIF using a
 * palette-based two-pass filter for better color quality than a naive
 * single-pass GIF encode.
 */
export async function apngToGif(file: File): Promise<{ blob: Blob; filename: string }> {
  const inputName = "input.apng";
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
      outputName,
    ],
    outputName,
    "image/gif"
  );

  const filename = file.name.replace(/\.[^/.]+$/, ".gif");
  return { blob, filename };
}
