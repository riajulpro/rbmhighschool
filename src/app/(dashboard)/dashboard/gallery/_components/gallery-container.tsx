"use client";

import { GalleryTable } from "@/components/tables/gallery-table";
import type { IGallery } from "@/types/index";
import axiosInstance from "@/lib/axios";
import { useRouter } from "next/navigation";

export default function GalleryPage({
  galleryData: galleryItems,
}: {
  galleryData: IGallery[];
}) {
  const router = useRouter();

  const handleAdd = async (
    item: Omit<IGallery, "_id" | "createdAt" | "updatedAt">
  ) => {
    const res = await axiosInstance.post(`/api/gallery`, item);

    if (res.status === 200 || res.status === 201) {
      router.refresh();
    }
  };

  const handleEdit = async (id: string, updatedItem: Partial<IGallery>) => {
    const res = await axiosInstance.put(`/api/gallery/${id}`, updatedItem);

    if (res.status === 200) {
      router.refresh();
    }
  };

  const handleDelete = async (id: string) => {
    const res = await axiosInstance.delete(`/api/gallery/${id}`);

    if (res.status === 200) {
      router.refresh();
    }
  };

  return (
    <div className="container mx-auto py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">School Gallery</h1>
        <p className="text-muted-foreground">
          Manage photos and videos of school events and activities
        </p>
      </div>

      <GalleryTable
        data={galleryItems}
        onAdd={handleAdd}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    </div>
  );
}
