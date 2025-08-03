"use client";

import { useState } from "react";
import { TeacherTable } from "@/components/tables/teacher-table";
import type { ITeacher } from "@/types/index";

// Mock data - replace with your actual API calls
const mockTeachers: ITeacher[] = [
  {
    _id: "t1",
    userId: "user_teacher_1",
    teacherName: "Mr. Alex Johnson",
    designation: "Head Teacher",
    phone: "+1234567890",
    institution: "Example International School",
    profileImg: "/placeholder.svg?height=96&width=96&text=AJ",
    specialization: ["Mathematics", "Physics"],
    createdAt: new Date("2018-09-01"),
    updatedAt: new Date("2024-03-10"),
  },
  {
    _id: "t2",
    userId: "user_teacher_2",
    teacherName: "Ms. Sarah Davis",
    designation: "Senior Teacher",
    phone: "+1234567891",
    institution: "Example International School",
    profileImg: "/placeholder.svg?height=96&width=96&text=SD",
    specialization: ["English Literature", "History"],
    createdAt: new Date("2019-08-15"),
    updatedAt: new Date("2024-02-20"),
  },
  {
    _id: "t3",
    userId: "user_teacher_3",
    teacherName: "Dr. Ben Carter",
    designation: "Lecturer",
    phone: "+1234567892",
    institution: "Example International School",
    profileImg: "/placeholder.svg?height=96&width=96&text=BC",
    specialization: ["Chemistry", "Biology"],
    createdAt: new Date("2020-09-01"),
    updatedAt: new Date("2024-01-15"),
  },
  {
    _id: "t4",
    userId: "user_teacher_4",
    teacherName: "Mrs. Olivia Wilson",
    designation: "Assistant Teacher",
    phone: "+1234567893",
    institution: "Example International School",
    profileImg: "/placeholder.svg?height=96&width=96&text=OW",
    specialization: ["Art", "Music"],
    createdAt: new Date("2021-01-01"),
    updatedAt: new Date("2023-11-01"),
  },
];

export default function TeachersPage({
  teacherData,
}: {
  teacherData: ITeacher[];
}) {
  const [teachers, setTeachers] = useState<ITeacher[]>(
    teacherData || mockTeachers
  );

  const handleAdd = async (
    teacher: Omit<ITeacher, "_id" | "createdAt" | "updatedAt">
  ) => {
    // Replace with your actual API call
    const newTeacher: ITeacher = {
      ...teacher,
      _id: Date.now().toString(),
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    setTeachers((prev) => [...prev, newTeacher]);
  };

  const handleEdit = async (id: string, updatedTeacher: Partial<ITeacher>) => {
    // Replace with your actual API call
    setTeachers((prev) =>
      prev.map((teacher) =>
        teacher._id === id
          ? { ...teacher, ...updatedTeacher, updatedAt: new Date() }
          : teacher
      )
    );
  };

  const handleDelete = async (id: string) => {
    // Replace with your actual API call
    setTeachers((prev) => prev.filter((teacher) => teacher._id !== id));
  };

  return (
    <div className="container mx-auto py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Teachers Management</h1>
        <p className="text-muted-foreground">
          Manage profiles and details of teaching staff
        </p>
      </div>

      <TeacherTable
        data={teachers}
        onAdd={handleAdd}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    </div>
  );
}
