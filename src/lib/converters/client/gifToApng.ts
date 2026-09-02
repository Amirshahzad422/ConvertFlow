import { runFFmpeg } from "./ffmpeg";

/**
 * Converts an animated GIF to APNG format, preserving looping and
 * transparency.
 */
export async function gifToApng(file: File): Promise<{ blob: Blob; filename: string }> {
  const inputName = "input.gif";
  const outputName = "output.apng";

  const blob = await runFFmpeg(
    inputName,
    file,
    ["-i", inputName, "-plays", "0", "-f", "apng", outputName],
    outputName,
    "image/apng"
  );

  const filename = file.name.replace(/\.[^/.]+$/, ".apng");
  return { blob, filename };
}
