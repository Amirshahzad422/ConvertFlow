import { runFFmpeg } from "./ffmpeg";

/**
 * Converts an animated GIF into an MP4 video. Pads width/height to even
 * numbers (required by yuv420p) and enables faststart for web playback.
 */
export async function gifToMp4(file: File): Promise<{ blob: Blob; filename: string }> {
  const inputName = "input.gif";
  const outputName = "output.mp4";

  const blob = await runFFmpeg(
    inputName,
    file,
    [
      "-i",
      inputName,
      "-movflags",
      "faststart",
      "-pix_fmt",
      "yuv420p",
      "-vf",
      "scale=trunc(iw/2)*2:trunc(ih/2)*2",
      outputName,
    ],
    outputName,
    "video/mp4"
  );

  const filename = file.name.replace(/\.[^/.]+$/, ".mp4");
  return { blob, filename };
}
