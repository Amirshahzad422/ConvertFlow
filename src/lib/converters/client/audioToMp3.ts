import { runFFmpeg } from "./ffmpeg";

/**
 * Converts any supported audio format (WAV, OGG, FLAC, AAC, M4A, WMA, AIFF, AU, ...)
 * to MP3, entirely client-side via FFmpeg.wasm.
 */
export async function audioToMp3(file: File): Promise<{ blob: Blob; filename: string }> {
  const ext = file.name.split(".").pop()?.toLowerCase() || "audio";
  const inputName = `input.${ext}`;
  const outputName = "output.mp3";

  const blob = await runFFmpeg(
    inputName,
    file,
    ["-i", inputName, "-c:a", "libmp3lame", "-ar", "44100", "-ac", "2", "-b:a", "192k", "-y", outputName],
    outputName,
    "audio/mpeg"
  );

  const filename = file.name.replace(/\.[^/.]+$/, "") + ".mp3";
  return { blob, filename };
}
