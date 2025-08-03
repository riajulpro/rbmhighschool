/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import { PostTable } from "@/components/tables/post-table";
import { IPost } from "@/types/index";

// Mock data - replace with your actual API calls
const mockPosts: any = [
  {
    _id: "1",
    title: "Back to School: A New Academic Year Begins",
    content:
      "As the summer holidays draw to a close, we eagerly welcome our students back for another exciting academic year. We have prepared new learning materials and renovated facilities to ensure a conducive environment for growth and discovery.",
    coverImage: "/placeholder.svg?height=100&width=150&text=School+Reopen",
    authorId: "user123",
    tags: ["school", "news", "academic year"],
    createdAt: new Date("2024-08-01"),
    updatedAt: new Date("2024-08-01"),
  },
  {
    _id: "2",
    title: "Celebrating Our Science Fair Winners",
    content:
      "Our annual science fair was a resounding success, showcasing the incredible talent and innovative spirit of our students. Congratulations to all participants and especially to the winners who presented groundbreaking projects!",
    coverImage: "/placeholder.svg?height=100&width=150&text=Science+Fair",
    authorId: "user124",
    tags: ["science", "events", "achievements"],
    createdAt: new Date("2024-07-25"),
    updatedAt: new Date("2024-07-25"),
  },
  {
    _id: "3",
    title: "Tips for Effective Online Learning",
    content:
      "In today's digital age, online learning has become an integral part of education. Here are some practical tips to help students maximize their online learning experience, from setting up a dedicated study space to managing time effectively.",
    coverImage: "/placeholder.svg?height=100&width=150&text=Online+Learning",
    authorId: "user123",
    tags: ["education", "tips", "online learning"],
    createdAt: new Date("2024-07-10"),
    updatedAt: new Date("2024-07-10"),
  },
  {
    _id: "4",
    title: "Annual Sports Day Highlights",
    content:
      "Relive the excitement of our Annual Sports Day! From thrilling races to team sports, our students displayed incredible sportsmanship and athletic prowess. Check out the photo gallery for more!",
    coverImage: "/placeholder.svg?height=100&width=150&text=Sports+Day",
    authorId: "user125",
    tags: ["sports", "events", "gallery"],
    createdAt: new Date("2024-06-15"),
    updatedAt: new Date("2024-06-15"),
  },
];

export default function PostsPage({ postsData }: { postsData: IPost[] }) {
  const [posts, setPosts] = useState<IPost[]>(postsData || mockPosts);

  const handleAdd = async (
    post: Omit<IPost, "_id" | "createdAt" | "updatedAt">
  ) => {
    // Replace with your actual API call
    const newPost: IPost = {
      ...post,
      _id: Date.now().toString(),
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    setPosts((prev) => [...prev, newPost]);
  };

  const handleEdit = async (id: string, updatedPost: Partial<IPost>) => {
    // Replace with your actual API call
    setPosts((prev) =>
      prev.map((post) =>
        post._id === id
          ? { ...post, ...updatedPost, updatedAt: new Date() }
          : post
      )
    );
  };

  const handleDelete = async (id: string) => {
    // Replace with your actual API call
    setPosts((prev) => prev.filter((post) => post._id !== id));
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
