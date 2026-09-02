import { runFFmpeg } from "./ffmpeg";

/**
 * Re-encodes an MP3 file at a lower constant bitrate (96kbps) to shrink its
 * file size, entirely client-side via FFmpeg.wasm.
 */
export async function compressMp3(file: File): Promise<{ blob: Blob; filename: string }> {
  const inputName = "input.mp3";
  const outputName = "output.mp3";

  const blob = await runFFmpeg(
    inputName,
    file,
    ["-i", inputName, "-c:a", "libmp3lame", "-b:a", "96k", "-ar", "44100", "-ac", "2", "-y", outputName],
    outputName,
    "audio/mpeg"
  );

  const filename = file.name.replace(/\.[^/.]+$/, "") + "-compressed.mp3";
  return { blob, filename };
}
