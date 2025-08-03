"use client";

import { useState } from "react";
import { AdmissionTable } from "@/components/tables/admission-table";
import type { IAdmission } from "@/types/index";

// Mock data - replace with your actual API calls
const mockAdmissions: IAdmission[] = [
  {
    _id: "1",
    class: "5",
    studentName: "আহমেদ আলী",
    studentNameEnglish: "Ahmed Ali",
    academicYear: "2024-25",
    dateOfBirth: new Date("2014-03-15"),
    fatherName: "মোহাম্মদ আলী",
    motherName: "ফাতেমা খাতুন",
    fatherOccupation: "Business",
    address: "123 Main Street, Dhaka, Bangladesh",
    mobileNumber: "+8801712345678",
    email: "ahmed.ali@example.com",
    photo: "/placeholder.svg?height=40&width=40",
    previousInstitution: "ABC Primary School",
    previousInstitutionAddress: "456 School Road, Dhaka",
    createdAt: new Date("2024-01-15"),
    updatedAt: new Date("2024-01-15"),
  },
  {
    _id: "2",
    class: "3",
    studentName: "সারা খান",
    studentNameEnglish: "Sara Khan",
    academicYear: "2024-25",
    dateOfBirth: new Date("2016-07-22"),
    fatherName: "রহিম খান",
    motherName: "সালমা খান",
    fatherOccupation: "Teacher",
    address: "789 Park Avenue, Chittagong, Bangladesh",
    mobileNumber: "+8801812345679",
    email: "sara.khan@example.com",
    photo: "/placeholder.svg?height=40&width=40",
    createdAt: new Date("2024-01-10"),
    updatedAt: new Date("2024-01-10"),
  },
  {
    _id: "3",
    class: "8",
    studentName: "রাহুল দাস",
    studentNameEnglish: "Rahul Das",
    academicYear: "2024-25",
    dateOfBirth: new Date("2011-11-08"),
    fatherName: "সুনীল দাস",
    motherName: "গীতা দাস",
    fatherOccupation: "Engineer",
    address: "321 Lake View, Sylhet, Bangladesh",
    mobileNumber: "+8801912345680",
    photo: "/placeholder.svg?height=40&width=40",
    createdAt: new Date("2024-01-05"),
    updatedAt: new Date("2024-01-05"),
  },
];

export default function AdmissionsPage({
  admissionData,
}: {
  admissionData: IAdmission[];
}) {
  const [admissions, setAdmissions] = useState<IAdmission[]>(
    admissionData || mockAdmissions
  );

  const handleAdd = async (
    admission: Omit<IAdmission, "_id" | "createdAt" | "updatedAt">
  ) => {
    // Replace with your actual API call
    const newAdmission: IAdmission = {
      ...admission,
      _id: Date.now().toString(),
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    setAdmissions((prev) => [...prev, newAdmission]);
  };

  const handleEdit = async (
    id: string,
    updatedAdmission: Partial<IAdmission>
  ) => {
    // Replace with your actual API call
    setAdmissions((prev) =>
      prev.map((admission) =>
        admission._id === id
          ? { ...admission, ...updatedAdmission, updatedAt: new Date() }
          : admission
      )
    );
  };

  const handleDelete = async (id: string) => {
    // Replace with your actual API call
    setAdmissions((prev) => prev.filter((admission) => admission._id !== id));
  };

  return (
    <div className="container mx-auto py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Admissions Management</h1>
        <p className="text-muted-foreground">
          Manage student admission records and applications
        </p>
      </div>

      <AdmissionTable
        data={admissions}
        onAdd={handleAdd}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    </div>
  );
}
