"use client";

import { useState } from "react";
import { FacilityTable } from "@/components/tables/facility-table";
import type { IFacility } from "@/types/index";

// Mock data - replace with your actual API calls
const mockFacilities: IFacility[] = [
  {
    _id: "1",
    serial: "FAC-001",
    name: "Computer Lab",
    quantity: "30 computers",
    createdAt: new Date("2024-01-15"),
    updatedAt: new Date("2024-01-15"),
  },
  {
    _id: "2",
    serial: "FAC-002",
    name: "Science Laboratory",
    quantity: "1 lab",
    createdAt: new Date("2024-01-10"),
    updatedAt: new Date("2024-01-12"),
  },
  {
    _id: "3",
    serial: "FAC-003",
    name: "Library Books",
    quantity: "5000 books",
    createdAt: new Date("2024-01-08"),
    updatedAt: new Date("2024-01-08"),
  },
  {
    _id: "4",
    serial: "FAC-004",
    name: "Playground Equipment",
    quantity: "1 set",
    createdAt: new Date("2024-01-05"),
    updatedAt: new Date("2024-01-05"),
  },
  {
    _id: "5",
    serial: "FAC-005",
    name: "Projectors",
    quantity: "15 units",
    createdAt: new Date("2024-01-03"),
    updatedAt: new Date("2024-01-03"),
  },
  {
    _id: "6",
    serial: "FAC-006",
    name: "Desks and Chairs",
    quantity: "200 sets",
    createdAt: new Date("2024-01-01"),
    updatedAt: new Date("2024-01-01"),
  },
  {
    _id: "7",
    serial: "FAC-007",
    name: "Audio System",
    quantity: "3 systems",
    createdAt: new Date("2023-12-28"),
    updatedAt: new Date("2023-12-28"),
  },
  {
    _id: "8",
    serial: "FAC-008",
    name: "Air Conditioners",
    quantity: "12 units",
    createdAt: new Date("2023-12-25"),
    updatedAt: new Date("2023-12-25"),
  },
];

export default function FacilitiesPage({
  facilityData,
}: {
  facilityData: IFacility[];
}) {
  const [facilities, setFacilities] = useState<IFacility[]>(
    facilityData || mockFacilities
  );

  const handleAdd = async (
    facility: Omit<IFacility, "_id" | "createdAt" | "updatedAt">
  ) => {
    // Replace with your actual API call
    const newFacility: IFacility = {
      ...facility,
      _id: Date.now().toString(),
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    setFacilities((prev) => [...prev, newFacility]);
  };

  const handleEdit = async (
    id: string,
    updatedFacility: Partial<IFacility>
  ) => {
    // Replace with your actual API call
    setFacilities((prev) =>
      prev.map((facility) =>
        facility._id === id
          ? { ...facility, ...updatedFacility, updatedAt: new Date() }
          : facility
      )
    );
  };

  const handleDelete = async (id: string) => {
    // Replace with your actual API call
    setFacilities((prev) => prev.filter((facility) => facility._id !== id));
  };

  return (
    <div className="container mx-auto py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">School Facilities</h1>
        <p className="text-muted-foreground">
          Manage school facilities, equipment, and resources
        </p>
      </div>

      <FacilityTable
        data={facilities}
        onAdd={handleAdd}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    </div>
  );
}
