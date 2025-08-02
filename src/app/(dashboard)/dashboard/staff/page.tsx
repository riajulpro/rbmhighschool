"use client";

import { useState } from "react";
import { StaffTable } from "@/components/tables/staff-table";
import type { IStaff } from "@/types/index";

// Mock data - replace with your actual API calls
const mockStaff: IStaff[] = [
  {
    _id: "staff1",
    name: "Mr. David Lee",
    responsibility: "Teacher",
    profilePic: "/placeholder.svg?height=96&width=96&text=DL",
    createdAt: new Date("2022-08-10"),
    updatedAt: new Date("2024-01-05"),
  },
  {
    _id: "staff2",
    name: "Ms. Emily White",
    responsibility: "Librarian",
    profilePic: "/placeholder.svg?height=96&width=96&text=EW",
    createdAt: new Date("2021-09-01"),
    updatedAt: new Date("2023-11-20"),
  },
  {
    _id: "staff3",
    name: "Mr. John Brown",
    responsibility: "Security Guard",
    profilePic: "/placeholder.svg?height=96&width=96&text=JB",
    createdAt: new Date("2020-03-15"),
    updatedAt: new Date("2024-02-10"),
  },
  {
    _id: "staff4",
    name: "Mrs. Sarah Green",
    responsibility: "Administrative Staff",
    profilePic: "/placeholder.svg?height=96&width=96&text=SG",
    createdAt: new Date("2023-01-20"),
    updatedAt: new Date("2024-03-01"),
  },
  {
    _id: "staff5",
    name: "Mr. Michael Chen",
    responsibility: "IT Support",
    profilePic: "/placeholder.svg?height=96&width=96&text=MC",
    createdAt: new Date("2022-05-01"),
    updatedAt: new Date("2024-04-10"),
  },
];

export default function StaffPage() {
  const [staffMembers, setStaffMembers] = useState<IStaff[]>(mockStaff);

  const handleAdd = async (
    staff: Omit<IStaff, "_id" | "createdAt" | "updatedAt">
  ) => {
    // Replace with your actual API call
    const newStaff: IStaff = {
      ...staff,
      _id: Date.now().toString(),
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    setStaffMembers((prev) => [...prev, newStaff]);
  };

  const handleEdit = async (id: string, updatedStaff: Partial<IStaff>) => {
    // Replace with your actual API call
    setStaffMembers((prev) =>
      prev.map((staff) =>
        staff._id === id
          ? { ...staff, ...updatedStaff, updatedAt: new Date() }
          : staff
      )
    );
  };

  const handleDelete = async (id: string) => {
    // Replace with your actual API call
    setStaffMembers((prev) => prev.filter((staff) => staff._id !== id));
  };

  return (
    <div className="container mx-auto py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Staff Management</h1>
        <p className="text-muted-foreground">
          Manage all non-teaching and support staff members
        </p>
      </div>

      <StaffTable
        data={staffMembers}
        onAdd={handleAdd}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    </div>
  );
}
