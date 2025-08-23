/* eslint-disable @typescript-eslint/no-explicit-any */
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
    // result: Omit<IResult, "_id" | "createdAt" | "updatedAt">
    result: any
  ) => {
    const subjects = result.subjects.map((sub: any) => {
      return {
        subject: sub.subject,
        marks: {
          written: {
            score: Number(sub.written_score),
            outOf: Number(sub.written_outOf),
          },
          mcq: {
            score: Number(sub.mcq_score || "0"),
            outOf: Number(sub.mcq_outOf || "0"),
          },
        },
        comments: sub.comments || "",
      };
    });

    const payload = {
      student: result.studentId,
      semester: result.semester,
      year: result.session,
      subjects: subjects,
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
