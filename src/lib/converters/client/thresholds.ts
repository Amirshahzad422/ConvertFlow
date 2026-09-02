/**
 * File-size thresholds that decide when a converter function should hand
 * off from a browser-side conversion to an existing server API route.
 * Kept as one constant so every converter picks the same cutoff.
 */
export const SERVER_FALLBACK_IMAGE_SIZE_MB = 15;
export const SERVER_FALLBACK_IMAGE_SIZE_BYTES = SERVER_FALLBACK_IMAGE_SIZE_MB * 1024 * 1024;

export const LARGE_MEDIA_WARNING_SIZE_MB = 100;
export const LARGE_MEDIA_WARNING_SIZE_BYTES = LARGE_MEDIA_WARNING_SIZE_MB * 1024 * 1024;
