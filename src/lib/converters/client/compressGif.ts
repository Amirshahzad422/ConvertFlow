import { loadFFmpeg, fetchFile } from "./ffmpeg";

/**
 * Shrinks a GIF using FFmpeg's two-pass palette workflow (palettegen +
 * paletteuse), the same approach the old server route used, run entirely
 * client-side via FFmpeg.wasm.
 */
export async function compressGif(file: File): Promise<{ blob: Blob; filename: string }> {
  const ffmpeg = await loadFFmpeg();

  const inputName = "input.gif";
  const paletteName = "palette.png";
  const outputName = "output.gif";
  const filters = "fps=10,scale=iw:ih:flags=lanczos";

  await ffmpeg.writeFile(inputName, await fetchFile(file));

  try {
    await ffmpeg.exec(["-i", inputName, "-vf", `${filters},palettegen=max_colors=128`, "-y", paletteName]);

    await ffmpeg.exec([
      "-i", inputName,
      "-i", paletteName,
      "-lavfi", `${filters}[x];[x][1:v]paletteuse=dither=sierra2_4a`,
      "-gifflags", "+transdiff",
      "-y", outputName,
    ]);

    const data = await ffmpeg.readFile(outputName);
    const blob = new Blob([data as BlobPart], { type: "image/gif" });
    const filename = file.name.replace(/\.[^/.]+$/, "") + "-compressed.gif";
    return { blob, filename };
  } finally {
    for (const name of [inputName, paletteName, outputName]) {
      try {
        await ffmpeg.deleteFile(name);
      } catch {}
    }
  }
}
