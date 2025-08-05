"use client";

import { ResultTable } from "@/components/tables/result-table";
import axiosInstance from "@/lib/axios";
import type { IResult } from "@/types/index";
import { useRouter } from "next/navigation";

export default function ResultsPage({
  resultData: results,
}: {
  resultData: IResult[];
}) {
  const router = useRouter();

  const handleAdd = async (
    result: Omit<IResult, "_id" | "createdAt" | "updatedAt">
  ) => {
    const payload = {
      student: result.studentId,
      semester: result.semester,
      year: result.session,
      subjects: result.subjects,
    };

    const res = await axiosInstance.post(`/api/results`, payload);

    if (res.status === 200 || res.status === 201) {
      router.refresh();
    }
  };

  const handleEdit = async (id: string, updatedResult: Partial<IResult>) => {
    const res = await axiosInstance.put(`/api/results/${id}`, updatedResult);

    if (res.status === 200) {
      router.refresh();
    }
  };

  const handleDelete = async (id: string) => {
    const res = await axiosInstance.delete(`/api/results/${id}`);

    if (res.status === 200) {
      router.refresh();
    }
  };

  return (
    <div className="container mx-auto py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Student Results</h1>
        <p className="text-muted-foreground">
          Manage academic results for students by semester and year
        </p>
      </div>

      <ResultTable
        data={results}
        onAdd={handleAdd}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    </div>
  );
}
