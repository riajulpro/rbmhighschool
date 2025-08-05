"use client";

import { NoticeTable } from "@/components/tables/notice-table";
import axiosInstance from "@/lib/axios";
import type { INotice } from "@/types/index";
import { useRouter } from "next/navigation";

export default function NoticesPage({
  noticeData: notices,
}: {
  noticeData: INotice[];
}) {
  const router = useRouter();

  const handleAdd = async (
    notice: Omit<INotice, "_id" | "createdAt" | "updatedAt">
  ) => {
    const res = await axiosInstance.post(`/api/notices`, notice);

    if (res.status === 200 || res.status === 201) {
      router.refresh();
    }
  };

  const handleEdit = async (id: string, updatedNotice: Partial<INotice>) => {
    const res = await axiosInstance.put(`/api/notices/${id}`, updatedNotice);

    if (res.status === 200) {
      router.refresh();
    }
  };

  const handleDelete = async (id: string) => {
    const res = await axiosInstance.delete(`/api/notices/${id}`);

    if (res.status === 200) {
      router.refresh();
    }
  };

  return (
    <div className="container mx-auto py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Notices Management</h1>
        <p className="text-muted-foreground">
          Manage school notices and announcements
        </p>
      </div>

      <NoticeTable
        data={notices}
        onAdd={handleAdd}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    </div>
  );
}
