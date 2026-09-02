import { runFFmpeg } from "./ffmpeg";

/**
 * Extracts the audio track from any video file and encodes it as MP3,
 * entirely client-side via FFmpeg.wasm.
 */
export async function videoToMp3(file: File): Promise<{ blob: Blob; filename: string }> {
  const ext = file.name.split(".").pop()?.toLowerCase() || "mp4";
  const inputName = `input.${ext}`;
  const outputName = "output.mp3";

  const blob = await runFFmpeg(
    inputName,
    file,
    ["-i", inputName, "-vn", "-c:a", "libmp3lame", "-ar", "44100", "-ac", "2", "-b:a", "192k", "-y", outputName],
    outputName,
    "audio/mpeg"
  );

  const filename = file.name.replace(/\.[^/.]+$/, "") + ".mp3";
  return { blob, filename };
}
