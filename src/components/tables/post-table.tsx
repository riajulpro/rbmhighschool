"use client";

import type { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, Eye, ImageIcon, UserIcon } from "lucide-react";
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
import type { IPost, FormField } from "@/types/index";
import Image from "next/image";
import { detectImageSourceType } from "@/lib/detect-img-url";

const columns: ColumnDef<IPost>[] = [
  {
    accessorKey: "coverImage",
    header: "Cover",
    cell: ({ row }) => {
      const coverImage = row.getValue("coverImage") as string;
      const title = row.original.title;
      return (
        <div className="flex items-center justify-center h-12 w-16 overflow-hidden rounded-md bg-muted">
          {coverImage ? (
            <Image
              src={detectImageSourceType(coverImage) || "/placeholder.svg"}
              alt={title}
              className="h-full w-full object-cover"
            />
          ) : (
            <ImageIcon className="h-6 w-6 text-muted-foreground" />
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
    accessorKey: "authorId",
    header: "Author ID",
    cell: ({ row }) => (
      <div className="flex items-center gap-1 text-sm text-muted-foreground">
        <UserIcon className="h-3 w-3" />
        {/* In a real application, you would populate this with the author's name from the User model */}
        <span className="font-mono">{row.getValue("authorId") || "N/A"}</span>
      </div>
    ),
  },
  {
    accessorKey: "tags",
    header: "Tags",
    cell: ({ row }) => {
      const tags = row.getValue("tags") as string[];
      return (
        <div className="flex flex-wrap gap-1">
          {tags?.length > 0 ? (
            tags.map((tag, index) => (
              <Badge key={index} variant="outline">
                {tag}
              </Badge>
            ))
          ) : (
            <span className="text-muted-foreground text-sm">No tags</span>
          )}
        </div>
      );
    },
  },
  {
    accessorKey: "createdAt",
    header: "Published On",
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
      const post = row.original;
      return (
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="ghost" size="sm">
              <Eye className="h-4 w-4" />
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-3xl">
            <DialogHeader>
              <DialogTitle>{post.title}</DialogTitle>
              <DialogDescription>Full details of the post.</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              {post.coverImage && (
                <div className="flex justify-center">
                  <Image
                    src={
                      detectImageSourceType(post.coverImage) ||
                      "/placeholder.svg"
                    }
                    alt={post.title}
                    className="max-h-64 w-auto rounded-md object-contain"
                  />
                </div>
              )}
              <div className="space-y-2 text-sm">
                <div>
                  <span className="font-medium">Title:</span> {post.title}
                </div>
                <div>
                  <span className="font-medium">Author ID:</span>{" "}
                  {post.authorId || "N/A"}
                </div>
                <div>
                  <span className="font-medium">Published On:</span>{" "}
                  {new Date(post.createdAt || "").toLocaleDateString()}
                </div>
                <div>
                  <span className="font-medium">Tags:</span>{" "}
                  {post.tags && post.tags.length > 0 ? (
                    <div className="inline-flex flex-wrap gap-1">
                      {post.tags.map((tag, index) => (
                        <Badge key={index} variant="outline">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  ) : (
                    "N/A"
                  )}
                </div>
                <div className="mt-4">
                  <span className="font-medium">Content:</span>
                  <p className="mt-1 text-muted-foreground whitespace-pre-wrap">
                    {post.content}
                  </p>
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
    placeholder: "Enter post title",
  },
  {
    name: "content",
    label: "Content",
    type: "textarea",
    required: true,
    placeholder: "Write your post content here...",
  },
  {
    name: "coverImage",
    label: "Cover Image URL",
    type: "text",
    placeholder: "Enter URL for cover image (optional)",
  },
  {
    name: "authorId",
    label: "Author ID",
    type: "text", // In a real app, this might be a select/lookup for users
    placeholder: "Enter author's user ID (optional)",
  },
  {
    name: "tags",
    label: "Tags (comma-separated)",
    type: "text",
    placeholder: "e.g., education, news, events",
  },
];

interface PostTableProps {
  data: IPost[];
  onAdd: (
    post: Omit<IPost, "_id" | "createdAt" | "updatedAt">
  ) => Promise<void>;
  onEdit: (id: string, post: Partial<IPost>) => Promise<void>;
  onDelete: (id: string) => Promise<void>;
}

export function PostTable({ data, onAdd, onEdit, onDelete }: PostTableProps) {
  // Transform tags from comma-separated string to array for form submission
  const handleAddWithTags = async (
    postData: Omit<IPost, "_id" | "createdAt" | "updatedAt">
  ) => {
    const transformedData = {
      ...postData,
      tags:
        typeof postData.tags === "string"
          ? (postData.tags as string).split(",").map((tag) => tag.trim())
          : [],
    };
    await onAdd(transformedData);
  };

  const handleEditWithTags = async (id: string, postData: Partial<IPost>) => {
    const transformedData = {
      ...postData,
      tags:
        typeof postData.tags === "string"
          ? (postData.tags as string).split(",").map((tag) => tag.trim())
          : [],
    };
    await onEdit(id, transformedData);
  };

  return (
    <CrudDataTable
      data={data}
      columns={columns}
      onAdd={handleAddWithTags}
      onEdit={handleEditWithTags}
      onDelete={onDelete}
      title="Posts"
      createFormFields={formFields}
      editFormFields={formFields.map((field) =>
        field.name === "tags"
          ? {
              ...field,
              defaultValue: (item: IPost) => item.tags?.join(", ") || "",
            }
          : field
      )}
    />
  );
}
