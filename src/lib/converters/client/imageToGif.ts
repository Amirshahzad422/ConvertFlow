import { runFFmpeg } from "./ffmpeg";

/**
 * Turns a single static image (JPG/PNG/WEBP) into a short looping
 * animated GIF (3 seconds, looping forever). The original tool combined
 * multiple images into a slideshow GIF; this fits the one-file-in/
 * one-file-out converter contract by scoping to a single source image.
 */
export async function imageToGif(file: File): Promise<{ blob: Blob; filename: string }> {
  const extension = file.type === "image/jpeg" ? "jpg" : file.type === "image/webp" ? "webp" : "png";
  const inputName = `input.${extension}`;
  const outputName = "output.gif";

  const blob = await runFFmpeg(
    inputName,
    file,
    [
      "-loop",
      "1",
      "-i",
      inputName,
      "-t",
      "3",
      "-vf",
      "fps=10,scale=480:-1:flags=lanczos",
      "-loop",
      "0",
      "-y",
      outputName,
    ],
    outputName,
    "image/gif"
  );

  const filename = file.name.replace(/\.[^/.]+$/, ".gif");
  return { blob, filename };
}
