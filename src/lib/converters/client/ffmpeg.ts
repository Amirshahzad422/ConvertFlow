import { fetchFile, toBlobURL } from "@ffmpeg/util";
import type { FFmpeg } from "@ffmpeg/ffmpeg";

let ffmpegPromise: Promise<FFmpeg> | null = null;

/**
 * Single shared FFmpeg.wasm instance, self-hosted from /public/ffmpeg
 * (not unpkg) so it works offline and under the site's CSP. Every
 * ffmpeg-based converter function should call this instead of booting
 * its own instance.
 */
export function loadFFmpeg(onProgress?: (ratio: number) => void): Promise<FFmpeg> {
  if (!ffmpegPromise) {
    ffmpegPromise = (async () => {
      const { FFmpeg } = await import("@ffmpeg/ffmpeg");
      const instance = new FFmpeg();
      const baseURL = "/ffmpeg";
      await instance.load({
        coreURL: await toBlobURL(`${baseURL}/ffmpeg-core.js`, "text/javascript"),
        wasmURL: await toBlobURL(`${baseURL}/ffmpeg-core.wasm`, "application/wasm"),
      });
      return instance;
    })();
  }

  if (onProgress) {
    ffmpegPromise.then((instance) => {
      instance.on("progress", ({ progress }) => onProgress(Math.min(1, Math.max(0, progress))));
    });
  }

  return ffmpegPromise;
}

export { fetchFile };

export async function runFFmpeg(
  inputName: string,
  inputFile: File,
  args: string[],
  outputName: string,
  outputMimeType: string,
  onProgress?: (ratio: number) => void
): Promise<Blob> {
  const ffmpeg = await loadFFmpeg(onProgress);
  await ffmpeg.writeFile(inputName, await fetchFile(inputFile));
  try {
    await ffmpeg.exec(args);
    const data = await ffmpeg.readFile(outputName);
    return new Blob([data as BlobPart], { type: outputMimeType });
  } finally {
    try {
      await ffmpeg.deleteFile(inputName);
    } catch {}
    try {
      await ffmpeg.deleteFile(outputName);
    } catch {}
  }
}
