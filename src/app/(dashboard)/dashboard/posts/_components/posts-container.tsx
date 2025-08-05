"use client";

import { PostTable } from "@/components/tables/post-table";
import axiosInstance from "@/lib/axios";
import { IPost } from "@/types/index";
import { useRouter } from "next/navigation";

export default function PostsPage({
  postsData: posts,
}: {
  postsData: IPost[];
}) {
  const router = useRouter();

  const handleAdd = async (
    post: Omit<IPost, "_id" | "createdAt" | "updatedAt">
  ) => {
    const res = await axiosInstance.post(`/api/posts`, post);

    if (res.status === 200 || res.status === 201) {
      router.refresh();
    }
  };

  const handleEdit = async (id: string, updatedPost: Partial<IPost>) => {
    const res = await axiosInstance.put(`/api/posts/${id}`, updatedPost);

    if (res.status === 200) {
      router.refresh();
    }
  };

  const handleDelete = async (id: string) => {
    const res = await axiosInstance.delete(`/api/posts/${id}`);

    if (res.status === 200) {
      router.refresh();
    }
  };

  return (
    <div className="container mx-auto py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Blog Posts</h1>
        <p className="text-muted-foreground">
          Manage articles, news, and announcements for your school blog
        </p>
      </div>

      <PostTable
        data={posts}
        onAdd={handleAdd}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    </div>
  );
}
