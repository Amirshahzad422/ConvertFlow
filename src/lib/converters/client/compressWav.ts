import { runFFmpeg } from "./ffmpeg";

/**
 * Shrinks a WAV file by downsampling it to 22.05kHz / 16-bit PCM stereo,
 * entirely client-side via FFmpeg.wasm.
 */
export async function compressWav(file: File): Promise<{ blob: Blob; filename: string }> {
  const inputName = "input.wav";
  const outputName = "output.wav";

  const blob = await runFFmpeg(
    inputName,
    file,
    ["-i", inputName, "-ar", "22050", "-ac", "2", "-acodec", "pcm_s16le", "-y", outputName],
    outputName,
    "audio/wav"
  );

  const filename = file.name.replace(/\.[^/.]+$/, "") + "-compressed.wav";
  return { blob, filename };
}
