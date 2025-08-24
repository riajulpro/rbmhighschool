/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { ResultTable } from "@/components/tables/result-table";
import { Button } from "@/components/ui/button";
import axiosInstance from "@/lib/axios";
import type { IResult } from "@/types/index";
import { Atom } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function ResultsPage({
  resultData: results,
}: {
  resultData: IResult[];
}) {
  const router = useRouter();

  const handleAdd = async (result: any) => {
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

  const handleEdit = async (id: string, updatedResult: any) => {
    // Transform the form data to match the API format
    const subjects = updatedResult.subjects?.map((sub: any) => {
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

    const payload: any = {
      semester: updatedResult.semester,
      year: Number(updatedResult.session),
    };

    // Only include subjects if they exist
    if (subjects && subjects.length > 0) {
      payload.subjects = subjects;
    }

    // Only include student if it exists and is different
    if (updatedResult.studentId) {
      payload.student = updatedResult.studentId;
    }

    const res = await axiosInstance.put(`/api/results/${id}`, payload);

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
      <div className="mb-8 flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Student Results</h1>
          <p className="text-muted-foreground">
            Manage academic results for students by semester and year
          </p>
        </div>
        <div>
          <Link href="/dashboard/results/marksheet">
            <Button className="bg-[var(--primary-color)] cursor-pointer">
              <Atom />
              Generate Marksheet
            </Button>
          </Link>
        </div>
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
