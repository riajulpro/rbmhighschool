"use client";

import { ExamResultTable } from "@/components/tables/exam-result-table";
import axiosInstance from "@/lib/axios";
import { IExamResult } from "@/types/exam-results";
import { useRouter } from "next/navigation";

export default function ResultStatisticsPage({
  facilityData: facilities,
}: {
  facilityData: IExamResult[];
}) {
  const router = useRouter();

  const handleAdd = async (
    facility: Omit<IExamResult, "_id" | "createdAt" | "updatedAt">
  ) => {
    const res = await axiosInstance.post(`/api/exam-results`, facility);

    if (res.status === 200 || res.status === 201) {
      router.refresh();
    }
  };

  const handleEdit = async (
    id: string,
    updatedFacility: Partial<IExamResult>
  ) => {
    const res = await axiosInstance.put(
      `/api/exam-results/${id}`,
      updatedFacility
    );

    if (res.status === 200) {
      router.refresh();
    }
  };

  const handleDelete = async (id: string) => {
    const res = await axiosInstance.delete(`/api/exam-results/${id}`);

    if (res.status === 200) {
      router.refresh();
    }
  };

  return (
    <div className="container mx-auto py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Board Exam Results</h1>
        <p className="text-muted-foreground">
          Manage and analyze the performance of students in board exams over the
          years.
        </p>
      </div>

      <ExamResultTable
        data={facilities}
        onAdd={handleAdd}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    </div>
  );
}
