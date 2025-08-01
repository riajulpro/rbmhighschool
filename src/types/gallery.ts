export interface GalleryItem {
  _id: string;
  title: string;
  type: "photo" | "video";
  url: string;
  description?: string;
  createdAt: string;
  updatedAt: string;
}

export type TGallery = GalleryItem[];
