"use client";

import { useState } from "react";
import { ClassRoutineTable } from "@/components/tables/class-routine-table";
import type { IClassRoutine } from "@/types/index";

// Mock data - replace with your actual API calls
const mockClassRoutines: IClassRoutine[] = [
  {
    _id: "cr1",
    class: "10",
    section: "A",
    day: "Sunday",
    subject: "Mathematics",
    teacher: "Mr. Rahman",
    startTime: "09:00 AM",
    endTime: "10:00 AM",
    room: "Room 301",
    createdAt: new Date("2024-01-01"),
    updatedAt: new Date("2024-01-01"),
  },
  {
    _id: "cr2",
    class: "10",
    section: "A",
    day: "Sunday",
    subject: "Physics",
    teacher: "Ms. Khan",
    startTime: "10:00 AM",
    endTime: "11:00 AM",
    room: "Lab 1",
    createdAt: new Date("2024-01-01"),
    updatedAt: new Date("2024-01-01"),
  },
  {
    _id: "cr3",
    class: "8",
    section: "B",
    day: "Monday",
    subject: "English",
    teacher: "Mrs. Ahmed",
    startTime: "11:00 AM",
    endTime: "12:00 PM",
    room: "Room 205",
    createdAt: new Date("2024-01-01"),
    updatedAt: new Date("2024-01-01"),
  },
  {
    _id: "cr4",
    class: "5",
    section: "C",
    day: "Tuesday",
    subject: "Science",
    teacher: "Mr. Islam",
    startTime: "09:30 AM",
    endTime: "10:30 AM",
    room: "Room 102",
    createdAt: new Date("2024-01-01"),
    updatedAt: new Date("2024-01-01"),
  },
  {
    _id: "cr5",
    class: "KG",
    section: "Morning",
    day: "Wednesday",
    subject: "Drawing",
    teacher: "Ms. Begum",
    startTime: "08:30 AM",
    endTime: "09:00 AM",
    room: "Art Room",
    createdAt: new Date("2024-01-01"),
    updatedAt: new Date("2024-01-01"),
  },
];

export default function ClassRoutinesPage({
  routineData,
}: {
  routineData: IClassRoutine[];
}) {
  const [classRoutines, setClassRoutines] = useState<IClassRoutine[]>(
    routineData || mockClassRoutines
  );

  const handleAdd = async (
    routine: Omit<IClassRoutine, "_id" | "createdAt" | "updatedAt">
  ) => {
    // Replace with your actual API call
    const newRoutine: IClassRoutine = {
      ...routine,
      _id: Date.now().toString(),
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    setClassRoutines((prev) => [...prev, newRoutine]);
  };

  const handleEdit = async (
    id: string,
    updatedRoutine: Partial<IClassRoutine>
  ) => {
    // Replace with your actual API call
    setClassRoutines((prev) =>
      prev.map((routine) =>
        routine._id === id
          ? { ...routine, ...updatedRoutine, updatedAt: new Date() }
          : routine
      )
    );
  };

  const handleDelete = async (id: string) => {
    // Replace with your actual API call
    setClassRoutines((prev) => prev.filter((routine) => routine._id !== id));
  };

  return (
    <div className="container mx-auto py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Class Routines</h1>
        <p className="text-muted-foreground">
          Manage daily class schedules for different classes and sections
        </p>
      </div>

      <ClassRoutineTable
        data={classRoutines}
        onAdd={handleAdd}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    </div>
  );
}
