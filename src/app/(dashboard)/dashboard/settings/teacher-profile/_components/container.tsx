/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import axiosInstance from "@/lib/axios";
import { TeacherForm } from "./teacher-form";
import { toast } from "sonner";

export default function TeacherProfileSettingsComp({
  teacherData,
}: {
  teacherData?: any;
}) {
  const handleSubmit = async (data: any) => {
    console.log("Form submitted:", data);

    const res = await axiosInstance.put(
      `/api/teachers/${teacherData._id}`,
      data
    );

    if (res.status === 200) {
      toast.success("Profile updated successfully!");
    } else {
      toast.error("Failed to update profile.");
    }
  };

  return (
    <main className="min-h-screen py-8">
      <TeacherForm initialData={teacherData} onSubmit={handleSubmit} />
    </main>
  );
}
