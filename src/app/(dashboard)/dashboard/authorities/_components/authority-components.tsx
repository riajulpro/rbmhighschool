"use client";

import { useState } from "react";
import { AuthorityTable } from "@/components/tables/authority-table";
import type { IAuthority } from "@/types/index";

// Mock data - replace with your actual API calls
const mockAuthorities: IAuthority[] = [
  {
    _id: "1",
    name: "Dr. Mohammad Rahman",
    responsibility: "Principal",
    profilePic: "/placeholder.svg?height=96&width=96",
    createdAt: new Date("2024-01-15"),
    updatedAt: new Date("2024-01-15"),
  },
  {
    _id: "2",
    name: "Mrs. Fatema Khatun",
    responsibility: "Vice Principal",
    profilePic: "/placeholder.svg?height=96&width=96",
    createdAt: new Date("2024-01-10"),
    updatedAt: new Date("2024-01-10"),
  },
  {
    _id: "3",
    name: "Mr. Abdul Karim",
    responsibility: "Head Teacher",
    profilePic: "/placeholder.svg?height=96&width=96",
    createdAt: new Date("2024-01-08"),
    updatedAt: new Date("2024-01-08"),
  },
  {
    _id: "4",
    name: "Ms. Rashida Begum",
    responsibility: "Academic Coordinator",
    profilePic: "/placeholder.svg?height=96&width=96",
    createdAt: new Date("2024-01-05"),
    updatedAt: new Date("2024-01-05"),
  },
  {
    _id: "5",
    name: "Mr. Shahidul Islam",
    responsibility: "Administrative Officer",
    profilePic: "/placeholder.svg?height=96&width=96",
    createdAt: new Date("2024-01-03"),
    updatedAt: new Date("2024-01-03"),
  },
  {
    _id: "6",
    name: "Mrs. Nasreen Akter",
    responsibility: "Librarian",
    profilePic: "/placeholder.svg?height=96&width=96",
    createdAt: new Date("2024-01-01"),
    updatedAt: new Date("2024-01-01"),
  },
];

export default function AuthoritiesPage({
  authoritiesData,
}: {
  authoritiesData: IAuthority[];
}) {
  const [authorities, setAuthorities] = useState<IAuthority[]>(
    authoritiesData || mockAuthorities
  );

  const handleAdd = async (
    authority: Omit<IAuthority, "_id" | "createdAt" | "updatedAt">
  ) => {
    // Replace with your actual API call
    const newAuthority: IAuthority = {
      ...authority,
      _id: Date.now().toString(),
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    setAuthorities((prev) => [...prev, newAuthority]);
  };

  const handleEdit = async (
    id: string,
    updatedAuthority: Partial<IAuthority>
  ) => {
    // Replace with your actual API call
    setAuthorities((prev) =>
      prev.map((authority) =>
        authority._id === id
          ? { ...authority, ...updatedAuthority, updatedAt: new Date() }
          : authority
      )
    );
  };

  const handleDelete = async (id: string) => {
    // Replace with your actual API call
    setAuthorities((prev) => prev.filter((authority) => authority._id !== id));
  };

  return (
    <div className="container mx-auto py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">School Authorities</h1>
        <p className="text-muted-foreground">
          Manage school administration and authority members
        </p>
      </div>

      <AuthorityTable
        data={authorities}
        onAdd={handleAdd}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    </div>
  );
}
