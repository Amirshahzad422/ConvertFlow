import { runFFmpeg } from "./ffmpeg";

/**
 * Converts an MP3 (or other audio) file to OGG Vorbis at a balanced
 * "medium" quality (-q:a 4), matching the default settings of the
 * original MP3 to OGG tool.
 */
export async function mp3ToOgg(file: File): Promise<{ blob: Blob; filename: string }> {
  const inputName = "input.mp3";
  const outputName = "output.ogg";

  const blob = await runFFmpeg(
    inputName,
    file,
    ["-i", inputName, "-c:a", "libvorbis", "-q:a", "4", "-y", outputName],
    outputName,
    "audio/ogg"
  );

  const filename = file.name.replace(/\.[^/.]+$/, ".ogg");
  return { blob, filename };
}
