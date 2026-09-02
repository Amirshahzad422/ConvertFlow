import JSZip from "jszip";

/**
 * Wraps a single uploaded file into a .zip archive, entirely client-side.
 *
 * Scope: this compresses ONE file into ONE zip archive. It does not (yet)
 * support batching multiple files into a single archive, nor does it read
 * or create RAR/7z archives — see the archive-converter FAQ for details.
 */
export async function zipFile(file: File): Promise<{ blob: Blob; filename: string }> {
  const zip = new JSZip();
  zip.file(file.name, file);
  const blob = await zip.generateAsync({ type: "blob" });
  return { blob, filename: `${file.name}.zip` };
}
