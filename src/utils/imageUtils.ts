/**
 * Utilitas gambar: kompres foto sebelum upload, download, dan simpan ke galeri HP.
 */

function loadImageEl(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = () => reject(new Error('Gagal membaca gambar.'));
    img.src = src;
  });
}

/**
 * Perkecil foto (sisi terpanjang <= maxSide) lalu simpan sebagai JPEG.
 * Wajib: Vercel membatasi body request 4,5 MB, foto kamera HP bisa 5-10 MB.
 */
export async function downscaleDataUrl(
  dataUrl: string,
  maxSide = 1280,
  quality = 0.88,
): Promise<string> {
  if (!dataUrl.startsWith('data:image/')) return dataUrl;
  try {
    const img = await loadImageEl(dataUrl);
    const longest = Math.max(img.naturalWidth, img.naturalHeight);
    const scale = Math.min(1, maxSide / longest);
    const w = Math.max(1, Math.round(img.naturalWidth * scale));
    const h = Math.max(1, Math.round(img.naturalHeight * scale));

    const canvas = document.createElement('canvas');
    canvas.width = w;
    canvas.height = h;
    const ctx = canvas.getContext('2d');
    if (!ctx) return dataUrl;
    ctx.fillStyle = '#ffffff'; // PNG transparan -> latar putih
    ctx.fillRect(0, 0, w, h);
    ctx.drawImage(img, 0, 0, w, h);
    return canvas.toDataURL('image/jpeg', quality);
  } catch {
    return dataUrl;
  }
}

/** data URL / blob URL -> Blob */
export async function urlToBlob(url: string): Promise<Blob> {
  const res = await fetch(url);
  return res.blob();
}

/** Perangkat layar sentuh (HP / tablet). */
export function isTouchDevice(): boolean {
  if (typeof window === 'undefined') return false;
  return 'ontouchstart' in window || navigator.maxTouchPoints > 0;
}

export function extensionForBlob(blob: Blob): string {
  if (blob.type.includes('jpeg') || blob.type.includes('jpg')) return 'jpg';
  if (blob.type.includes('webp')) return 'webp';
  return 'png';
}

/** Bisa dibagikan sebagai file lewat share sheet native (Simpan ke Foto / Galeri)? */
export function canShareImageFile(blob: Blob, filename: string): boolean {
  if (typeof navigator === 'undefined' || typeof navigator.share !== 'function') return false;
  if (typeof navigator.canShare !== 'function') return false;
  try {
    return navigator.canShare({ files: [new File([blob], filename, { type: blob.type })] });
  } catch {
    return false;
  }
}

export type SaveResult = 'shared' | 'cancelled' | 'unsupported' | 'failed';

/**
 * Buka share sheet native. Di iPhone pilih "Simpan Gambar" -> masuk app Foto.
 * Di Android pilih Galeri / Foto / Files.
 * HARUS dipanggil langsung dari tap pengguna (user gesture).
 */
export async function shareImageToGallery(
  blob: Blob,
  filename: string,
  title = 'Kartu Yu-Gi-Oh!',
): Promise<SaveResult> {
  if (!canShareImageFile(blob, filename)) return 'unsupported';
  try {
    const file = new File([blob], filename, { type: blob.type });
    await navigator.share({ files: [file], title });
    return 'shared';
  } catch (err: any) {
    if (err?.name === 'AbortError') return 'cancelled';
    return 'failed';
  }
}

/** Download biasa lewat Blob URL (lebih andal dari data URL untuk file besar). */
export function downloadBlob(blob: Blob, filename: string): void {
  const objectUrl = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = objectUrl;
  link.download = filename;
  link.rel = 'noopener';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  setTimeout(() => URL.revokeObjectURL(objectUrl), 60_000);
}

/** Bersihkan nama file dari karakter yang tidak aman. */
export function safeFilename(name: string, suffix: string, ext: string): string {
  const base = (name || 'Kartu').trim().replace(/[^\p{L}\p{N}_-]+/gu, '_').replace(/^_+|_+$/g, '') || 'Kartu';
  return `${base}_${suffix}.${ext}`;
}