"use client";

import { useState } from "react";
import { GalleryTable } from "@/components/tables/gallery-table";
import type { IGallery } from "@/types/index";

// Mock data - replace with your actual API calls
const mockGalleryItems: IGallery[] = [
  {
    _id: "1",
    title: "Annual Sports Day",
    type: "photo",
    url: "/placeholder.svg?height=100&width=150&text=Sports+Day",
    description: "Highlights from the annual sports day event.",
    createdAt: new Date("2024-03-01"),
    updatedAt: new Date("2024-03-01"),
  },
  {
    _id: "2",
    title: "School Cultural Program",
    type: "video",
    url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ", // Example YouTube URL
    description: "Performances from our talented students.",
    createdAt: new Date("2024-02-20"),
    updatedAt: new Date("2024-02-20"),
  },
  {
    _id: "3",
    title: "New Library Inauguration",
    type: "photo",
    url: "/placeholder.svg?height=100&width=150&text=Library",
    description: "Grand opening of the new school library.",
    createdAt: new Date("2024-01-25"),
    updatedAt: new Date("2024-01-25"),
  },
  {
    _id: "4",
    title: "Science Fair Projects",
    type: "photo",
    url: "/placeholder.svg?height=100&width=150&text=Science+Fair",
    description: "Innovative projects by our science enthusiasts.",
    createdAt: new Date("2023-11-10"),
    updatedAt: new Date("2023-11-10"),
  },
  {
    _id: "5",
    title: "Graduation Ceremony 2023",
    type: "video",
    url: "https://vimeo.com/example-graduation-video", // Example Vimeo URL
    description: "Memorable moments from the 2023 graduation.",
    createdAt: new Date("2023-07-01"),
    updatedAt: new Date("2023-07-01"),
  },
];

export default function GalleryPage() {
  const [galleryItems, setGalleryItems] =
    useState<IGallery[]>(mockGalleryItems);

  const handleAdd = async (
    item: Omit<IGallery, "_id" | "createdAt" | "updatedAt">
  ) => {
    // Replace with your actual API call
    const newItem: IGallery = {
      ...item,
      _id: Date.now().toString(),
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    setGalleryItems((prev) => [...prev, newItem]);
  };

  const handleEdit = async (id: string, updatedItem: Partial<IGallery>) => {
    // Replace with your actual API call
    setGalleryItems((prev) =>
      prev.map((item) =>
        item._id === id
          ? { ...item, ...updatedItem, updatedAt: new Date() }
          : item
      )
    );
  };

  const handleDelete = async (id: string) => {
    // Replace with your actual API call
    setGalleryItems((prev) => prev.filter((item) => item._id !== id));
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
