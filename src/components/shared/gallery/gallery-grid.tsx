"use client";

import { TGallery } from "@/types/gallery";
import { GalleryCard } from "./gallery-card";

export default function GalleryGrid({ data }: { data: TGallery }) {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {data.map((item) => (
          <GalleryCard key={item._id} item={item} />
        ))}
      </div>
    </div>
  );
}
