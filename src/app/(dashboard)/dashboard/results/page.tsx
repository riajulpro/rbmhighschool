"use client";

import { useState } from "react";
import { ResultTable } from "@/components/tables/result-table";
import type { IResult } from "@/types/index";

// Mock data - replace with your actual API calls
const mockResults: IResult[] = [
  {
    _id: "res1",
    studentId: "std1",
    studentName: "John Doe",
    semester: "Annual",
    year: 2023,
    subjects: [
      { subject: "Mathematics", marks: 92, grade: "A+", point: 4.0 },
      { subject: "Physics", marks: 88, grade: "A", point: 3.7 },
      { subject: "Chemistry", marks: 85, grade: "A-", point: 3.5 },
      { subject: "Biology", marks: 90, grade: "A", point: 3.8 },
      { subject: "English", marks: 78, grade: "B+", point: 3.0 },
    ],
    gpa: 3.8,
    overallGrade: "A",
    createdAt: new Date("2024-01-10"),
    updatedAt: new Date("2024-01-10"),
  },
  {
    _id: "res2",
    studentId: "std2",
    studentName: "Alice Smith",
    semester: "MidTerm",
    year: 2024,
    subjects: [
      { subject: "History", marks: 75, grade: "B", point: 2.8 },
      { subject: "Geography", marks: 80, grade: "B+", point: 3.0 },
      { subject: "Civics", marks: 82, grade: "A-", point: 3.2 },
    ],
    gpa: 3.0,
    overallGrade: "B+",
    createdAt: new Date("2024-05-20"),
    updatedAt: new Date("2024-05-20"),
  },
  {
    _id: "res3",
    studentId: "std1",
    studentName: "John Doe",
    semester: "FirstSemester",
    year: 2024,
    subjects: [
      { subject: "Mathematics", marks: 85, grade: "A-", point: 3.5 },
      { subject: "Physics", marks: 80, grade: "B+", point: 3.0 },
      { subject: "Chemistry", marks: 78, grade: "B+", point: 3.0 },
    ],
    gpa: 3.17,
    overallGrade: "B+",
    createdAt: new Date("2024-03-15"),
    updatedAt: new Date("2024-03-15"),
  },
];

export default function ResultsPage() {
  const [results, setResults] = useState<IResult[]>(mockResults);

  const handleAdd = async (
    result: Omit<IResult, "_id" | "createdAt" | "updatedAt">
  ) => {
    // Replace with your actual API call
    const newResult: IResult = {
      ...result,
      _id: Date.now().toString(),
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    setResults((prev) => [...prev, newResult]);
  };

  const handleEdit = async (id: string, updatedResult: Partial<IResult>) => {
    // Replace with your actual API call
    setResults((prev) =>
      prev.map((result) =>
        result._id === id
          ? { ...result, ...updatedResult, updatedAt: new Date() }
          : result
      )
    );
  };

  const handleDelete = async (id: string) => {
    // Replace with your actual API call
    setResults((prev) => prev.filter((result) => result._id !== id));
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
