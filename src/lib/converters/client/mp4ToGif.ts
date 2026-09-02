import { runFFmpeg } from "./ffmpeg";

/**
 * Converts an MP4 video to an animated GIF using a palette-based
 * two-pass filter, capped to the first 5 seconds to keep output size
 * reasonable (matching the original MP4 to GIF tool's behavior).
 */
export async function mp4ToGif(file: File): Promise<{ blob: Blob; filename: string }> {
  const inputName = "input.mp4";
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
