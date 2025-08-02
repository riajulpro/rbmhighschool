"use client";

import { useState } from "react";
import { InstitutionInfoTable } from "@/components/tables/institution-info-table";
import type { IInstitutionInfo } from "@/types/index";

// Mock data - typically, there would only be one record for institution info
const mockInstitutionInfo: IInstitutionInfo[] = [
  {
    _id: "1",
    name: "Example International School",
    logo: "/placeholder.svg?height=96&width=96&text=EIS",
    establishedYear: 1995,
    location: "Dhaka",
    contactEmail: "info@example.edu",
    phone: "+8801234567890",
    about:
      "Example International School is dedicated to providing high-quality education and fostering holistic development in students. We believe in nurturing young minds to become global citizens.",
    shortInfo: "Excellence in Education since 1995",
    eiinNumber: "123456",
    schoolCode: "EIS-BD",
    fullAddress: "123 School Road, Gulshan-1, Dhaka 1212, Bangladesh",
    createdAt: new Date("2020-01-01"),
    updatedAt: new Date("2024-07-20"),
  },
];

export default function InstitutionInfoPage() {
  const [institutionInfo, setInstitutionInfo] =
    useState<IInstitutionInfo[]>(mockInstitutionInfo);

  const handleAdd = async (
    info: Omit<IInstitutionInfo, "_id" | "createdAt" | "updatedAt">
  ) => {
    // In a real application, you'd likely prevent adding more than one record
    // or handle it as an update if a record already exists.
    if (institutionInfo.length > 0) {
      console.warn(
        "Institution info already exists. Consider updating instead of adding."
      );
      return;
    }
    // Replace with your actual API call
    const newInfo: IInstitutionInfo = {
      ...info,
      _id: Date.now().toString(),
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    setInstitutionInfo((prev) => [...prev, newInfo]);
  };

  const handleEdit = async (
    id: string,
    updatedInfo: Partial<IInstitutionInfo>
  ) => {
    // Replace with your actual API call
    setInstitutionInfo((prev) =>
      prev.map((info) =>
        info._id === id
          ? { ...info, ...updatedInfo, updatedAt: new Date() }
          : info
      )
    );
  };

  const handleDelete = async (id: string) => {
    // In a real application, you might want to prevent deleting the only institution info record.
    // Replace with your actual API call
    setInstitutionInfo((prev) => prev.filter((info) => info._id !== id));
  };

  return (
    <div className="container mx-auto py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Institution Information</h1>
        <p className="text-muted-foreground">
          Manage the core details of your institution
        </p>
      </div>

      <InstitutionInfoTable
        data={institutionInfo}
        onAdd={handleAdd}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
      {institutionInfo.length === 0 && (
        <div className="mt-4 p-4 border rounded-md bg-blue-50 text-blue-700">
          <p className="font-semibold">Note:</p>
          <p>
            {`Typically, there should only be one "Institution Info" record. If
            you add one, the "Add" button will likely be disabled or hidden in a
            real application, and you'd only use "Edit".`}
          </p>
        </div>
      )}
    </div>
  );
}
