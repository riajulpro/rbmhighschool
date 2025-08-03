"use client";

import { useState } from "react";
import { NoticeTable } from "@/components/tables/notice-table";
import type { INotice } from "@/types/index";

// Mock data - replace with your actual API calls
const mockNotices: INotice[] = [
  {
    _id: "1",
    title: "School Holiday Notice",
    docPath: "/documents/holiday-notice.pdf",
    audience: "all",
    createdAt: new Date("2024-01-15"),
    updatedAt: new Date("2024-01-15"),
  },
  {
    _id: "2",
    title: "Exam Schedule",
    docPath: "/documents/exam-schedule.pdf",
    audience: "students",
    createdAt: new Date("2024-01-10"),
    updatedAt: new Date("2024-01-10"),
  },
];

export default function NoticesPage({ noticeData }: { noticeData: INotice[] }) {
  const [notices, setNotices] = useState<INotice[]>(noticeData || mockNotices);

  const handleAdd = async (
    notice: Omit<INotice, "_id" | "createdAt" | "updatedAt">
  ) => {
    // Replace with your actual API call
    const newNotice: INotice = {
      ...notice,
      _id: Date.now().toString(),
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    setNotices((prev) => [...prev, newNotice]);
  };

  const handleEdit = async (id: string, updatedNotice: Partial<INotice>) => {
    // Replace with your actual API call
    setNotices((prev) =>
      prev.map((notice) =>
        notice._id === id
          ? { ...notice, ...updatedNotice, updatedAt: new Date() }
          : notice
      )
    );
  };

  const handleDelete = async (id: string) => {
    // Replace with your actual API call
    setNotices((prev) => prev.filter((notice) => notice._id !== id));
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
