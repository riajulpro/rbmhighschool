import { extractGoogleDriveFileId } from "./getDriveFileId";

export function detectImageSourceType(url: string): string {
  const drivePattern =
    /^https?:\/\/drive\.google\.com\/file\/d\/[a-zA-Z0-9_-]+/;
  const imagePattern = /\.(jpeg|jpg|png|gif|webp|svg|bmp|tiff|ico)(\?.*)?$/i;

  if (drivePattern.test(url)) {
    const fileId = extractGoogleDriveFileId(url);

    return `https://drive.google.com/uc?export=view&id=${fileId}`;
  } else if (imagePattern.test(url)) {
    return url;
  } else {
    return "unknown";
  }
}
