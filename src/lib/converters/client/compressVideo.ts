import { runFFmpeg } from "./ffmpeg";

/**
 * Re-encodes a video at a higher CRF (lower quality/bitrate) using libx264
 * to shrink its file size, entirely client-side via FFmpeg.wasm. Large
 * source files are genuinely slow to process in-browser since it's all
 * WebAssembly with no hardware acceleration.
 */
export async function compressVideo(file: File): Promise<{ blob: Blob; filename: string }> {
  const ext = file.name.split(".").pop()?.toLowerCase() || "mp4";
  const inputName = `input.${ext}`;
  const outputName = "output.mp4";

  const blob = await runFFmpeg(
    inputName,
    file,
    [
      "-i", inputName,
      "-c:v", "libx264",
      "-crf", "28",
      "-preset", "veryfast",
      "-c:a", "aac",
      "-b:a", "128k",
      "-y", outputName,
    ],
    outputName,
    "video/mp4"
  );

  const filename = file.name.replace(/\.[^/.]+$/, "") + "-compressed.mp4";
  return { blob, filename };
}
