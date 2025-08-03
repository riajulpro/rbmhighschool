"use client";

import type { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, Eye, Video } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { CrudDataTable } from "@/components/ui/crud-data-table";
import type { IGallery, FormField } from "@/types/index";
import Image from "next/image";
import { detectImageSourceType } from "@/lib/detect-img-url";

const columns: ColumnDef<IGallery>[] = [
  {
    accessorKey: "url",
    header: "Preview",
    cell: ({ row }) => {
      const type = row.original.type;
      const url = row.getValue("url") as string;
      const title = row.original.title;

      return (
        <div className="flex items-center justify-center h-12 w-16 overflow-hidden rounded-md bg-muted">
          {type === "photo" ? (
            <Image
              src={detectImageSourceType(url) || "/placeholder.svg"}
              alt={title}
              width={200}
              height={200}
              className="h-full w-full object-cover"
            />
          ) : (
            <Video className="h-6 w-6 text-muted-foreground" />
          )}
        </div>
      );
    },
  },
  {
    accessorKey: "title",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Title
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => (
      <div className="font-medium">{row.getValue("title")}</div>
    ),
  },
  {
    accessorKey: "type",
    header: "Type",
    cell: ({ row }) => {
      const type = row.getValue("type") as string;
      return (
        <Badge variant={type === "photo" ? "default" : "secondary"}>
          {type.charAt(0).toUpperCase() + type.slice(1)}
        </Badge>
      );
    },
  },
  {
    accessorKey: "description",
    header: "Description",
    cell: ({ row }) => (
      <div
        className="max-w-[200px] truncate text-sm text-muted-foreground"
        title={row.getValue("description") || "No description"}
      >
        {row.getValue("description") || "No description"}
      </div>
    ),
  },
  {
    accessorKey: "createdAt",
    header: "Added On",
    cell: ({ row }) => {
      const date = row.getValue("createdAt") as Date;
      return (
        <div className="text-sm text-muted-foreground">
          {new Date(date).toLocaleDateString()}
        </div>
      );
    },
  },
  {
    id: "details",
    header: "Details",
    cell: ({ row }) => {
      const item = row.original;
      return (
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="ghost" size="sm">
              <Eye className="h-4 w-4" />
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>{item.title}</DialogTitle>
              <DialogDescription>
                Details for this gallery item.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="flex flex-col items-center space-y-4">
                {item.type === "photo" ? (
                  <Image
                    src={detectImageSourceType(item.url) || "/placeholder.svg"}
                    alt={item.title}
                    width={200}
                    height={200}
                    className="max-h-96 w-auto rounded-md object-contain"
                  />
                ) : (
                  <div className="flex h-48 w-full items-center justify-center rounded-md bg-muted">
                    <Video className="h-16 w-16 text-muted-foreground" />
                  </div>
                )}
                <div className="text-center">
                  <h3 className="text-lg font-semibold">{item.title}</h3>
                  <Badge
                    variant={item.type === "photo" ? "default" : "secondary"}
                  >
                    {item.type.charAt(0).toUpperCase() + item.type.slice(1)}
                  </Badge>
                </div>
              </div>
              <div className="space-y-2 text-sm">
                <div>
                  <span className="font-medium">URL:</span>{" "}
                  <a
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline"
                  >
                    {item.url}
                  </a>
                </div>
                <div>
                  <span className="font-medium">Description:</span>{" "}
                  {item.description || "N/A"}
                </div>
                <div>
                  <span className="font-medium">Added On:</span>{" "}
                  {new Date(item.createdAt || "").toLocaleDateString()}
                </div>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      );
    },
  },
];

const formFields: FormField[] = [
  {
    name: "title",
    label: "Title",
    type: "text",
    required: true,
    placeholder: "Enter title for the item",
  },
  {
    name: "type",
    label: "Type",
    type: "select",
    required: true,
    options: [
      { value: "photo", label: "Photo" },
      { value: "video", label: "Video" },
    ],
  },
  {
    name: "url",
    label: "URL",
    type: "text",
    required: true,
    placeholder: "Enter URL for photo or video",
  },
  {
    name: "description",
    label: "Description",
    type: "textarea",
    placeholder: "Enter a brief description (optional)",
  },
];

interface GalleryTableProps {
  data: IGallery[];
  onAdd: (
    item: Omit<IGallery, "_id" | "createdAt" | "updatedAt">
  ) => Promise<void>;
  onEdit: (id: string, item: Partial<IGallery>) => Promise<void>;
  onDelete: (id: string) => Promise<void>;
}

export function GalleryTable({
  data,
  onAdd,
  onEdit,
  onDelete,
}: GalleryTableProps) {
  return (
    <CrudDataTable
      data={data}
      columns={columns}
      onAdd={onAdd}
      onEdit={onEdit}
      onDelete={onDelete}
      title="Gallery Items"
      createFormFields={formFields}
      editFormFields={formFields}
    />
  );
}
