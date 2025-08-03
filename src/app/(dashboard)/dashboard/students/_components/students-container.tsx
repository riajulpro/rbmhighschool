"use client";

import { useState } from "react";
import { StudentTable } from "@/components/tables/student-table";
import type { IStudent } from "@/types/index";

// Mock data - replace with your actual API calls
const mockStudents: IStudent[] = [
  {
    _id: "1",
    studentName: "John Doe",
    fatherName: "Robert Doe",
    motherName: "Jane Doe",
    class: "10",
    section: "A",
    session: "2024-25",
    rollNumber: "001",
    gender: "male",
    dob: new Date("2008-05-15"),
    guardianName: "Robert Doe",
    guardianPhone: "+1234567890",
    address: "123 Main St, City, State",
    createdAt: new Date("2024-01-15"),
    updatedAt: new Date("2024-01-15"),
  },
  {
    _id: "2",
    studentName: "Alice Smith",
    fatherName: "David Smith",
    motherName: "Sarah Smith",
    class: "10",
    section: "B",
    session: "2024-25",
    rollNumber: "002",
    gender: "female",
    dob: new Date("2008-08-22"),
    guardianName: "David Smith",
    guardianPhone: "+1234567891",
    address: "456 Oak Ave, City, State",
    createdAt: new Date("2024-01-10"),
    updatedAt: new Date("2024-01-10"),
  },
];

export default function StudentsPage({
  studentsData,
}: {
  studentsData: IStudent[];
}) {
  const [students, setStudents] = useState<IStudent[]>(
    studentsData || mockStudents
  );

  const handleAdd = async (
    student: Omit<IStudent, "_id" | "createdAt" | "updatedAt">
  ) => {
    // Replace with your actual API call
    const newStudent: IStudent = {
      ...student,
      _id: Date.now().toString(),
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    setStudents((prev) => [...prev, newStudent]);
  };

  const handleEdit = async (id: string, updatedStudent: Partial<IStudent>) => {
    // Replace with your actual API call
    setStudents((prev) =>
      prev.map((student) =>
        student._id === id
          ? { ...student, ...updatedStudent, updatedAt: new Date() }
          : student
      )
    );
  };

  const handleDelete = async (id: string) => {
    // Replace with your actual API call
    setStudents((prev) => prev.filter((student) => student._id !== id));
  };

  return (
    <div className="container mx-auto py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Students Management</h1>
        <p className="text-muted-foreground">
          Manage student records and information
        </p>
      </div>

      <StudentTable
        data={students}
        onAdd={handleAdd}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    </div>
  );
}
