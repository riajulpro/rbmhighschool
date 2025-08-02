"use client";

import { useState } from "react";
import { HonoredStudentTable } from "@/components/tables/honored-student-table";
import type { IHonoredStudent } from "@/types/index";

// Mock data - replace with your actual API calls
const mockHonoredStudents: IHonoredStudent[] = [
  {
    _id: "1",
    name: "Aisha Begum",
    year: "2024",
    reason: "Achieved top scores in national examinations.",
    photo: "/placeholder.svg?height=96&width=96&text=Aisha",
    createdAt: new Date("2024-05-01"),
    updatedAt: new Date("2024-05-01"),
  },
  {
    _id: "2",
    name: "Kamal Hossain",
    year: "2023-2024",
    reason: "Captain of the championship-winning debate team.",
    photo: "/placeholder.svg?height=96&width=96&text=Kamal",
    createdAt: new Date("2024-04-15"),
    updatedAt: new Date("2024-04-15"),
  },
  {
    _id: "3",
    name: "Nadia Islam",
    year: "2023",
    reason: "Outstanding performance in inter-school science fair.",
    photo: "/placeholder.svg?height=96&width=96&text=Nadia",
    createdAt: new Date("2023-12-01"),
    updatedAt: new Date("2023-12-01"),
  },
  {
    _id: "4",
    name: "Rohan Chowdhury",
    year: "2022-2023",
    reason: "Exemplary leadership and community service.",
    photo: "/placeholder.svg?height=96&width=96&text=Rohan",
    createdAt: new Date("2023-06-20"),
    updatedAt: new Date("2023-06-20"),
  },
];

export default function HonoredStudentsPage() {
  const [honoredStudents, setHonoredStudents] =
    useState<IHonoredStudent[]>(mockHonoredStudents);

  const handleAdd = async (
    student: Omit<IHonoredStudent, "_id" | "createdAt" | "updatedAt">
  ) => {
    // Replace with your actual API call
    const newStudent: IHonoredStudent = {
      ...student,
      _id: Date.now().toString(),
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    setHonoredStudents((prev) => [...prev, newStudent]);
  };

  const handleEdit = async (
    id: string,
    updatedStudent: Partial<IHonoredStudent>
  ) => {
    // Replace with your actual API call
    setHonoredStudents((prev) =>
      prev.map((student) =>
        student._id === id
          ? { ...student, ...updatedStudent, updatedAt: new Date() }
          : student
      )
    );
  };

  const handleDelete = async (id: string) => {
    // Replace with your actual API call
    setHonoredStudents((prev) => prev.filter((student) => student._id !== id));
  };

  return (
    <div className="container mx-auto py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Honored Students</h1>
        <p className="text-muted-foreground">
          Recognize and manage students honored for their achievements
        </p>
      </div>

      <HonoredStudentTable
        data={honoredStudents}
        onAdd={handleAdd}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    </div>
  );
}
