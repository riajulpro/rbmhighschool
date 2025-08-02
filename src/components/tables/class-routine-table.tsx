"use client";

import type { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, Clock, Home, BookOpen, User, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { CrudDataTable } from "../ui/crud-data-table";
import type { IClassRoutine, FormField } from "@/types/index";

const columns: ColumnDef<IClassRoutine>[] = [
  {
    accessorKey: "class",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Class
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => <Badge variant="outline">{row.getValue("class")}</Badge>,
  },
  {
    accessorKey: "section",
    header: "Section",
    cell: ({ row }) => (
      <Badge variant="secondary">{row.getValue("section")}</Badge>
    ),
  },
  {
    accessorKey: "day",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Day
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => <div className="font-medium">{row.getValue("day")}</div>,
  },
  {
    accessorKey: "subject",
    header: "Subject",
    cell: ({ row }) => (
      <div className="flex items-center gap-1">
        <BookOpen className="h-4 w-4 text-muted-foreground" />
        {row.getValue("subject")}
      </div>
    ),
  },
  {
    accessorKey: "teacher",
    header: "Teacher",
    cell: ({ row }) => (
      <div className="flex items-center gap-1">
        <User className="h-4 w-4 text-muted-foreground" />
        {row.getValue("teacher")}
      </div>
    ),
  },
  {
    accessorKey: "time",
    header: "Time",
    cell: ({ row }) => (
      <div className="flex items-center gap-1">
        <Clock className="h-4 w-4 text-muted-foreground" />
        {row.original.startTime} - {row.original.endTime}
      </div>
    ),
  },
  {
    accessorKey: "room",
    header: "Room",
    cell: ({ row }) => (
      <div className="flex items-center gap-1">
        <Home className="h-4 w-4 text-muted-foreground" />
        {row.getValue("room") || (
          <span className="text-muted-foreground">-</span>
        )}
      </div>
    ),
  },
  {
    id: "details",
    header: "Details",
    cell: ({ row }) => {
      const routine = row.original;
      return (
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="ghost" size="sm">
              <Eye className="h-4 w-4" />
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Class Routine Details</DialogTitle>
              <DialogDescription>
                {routine.class} - {routine.section} on {routine.day}
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="space-y-2">
                  <div>
                    <strong>Class:</strong>{" "}
                    <Badge variant="outline">{routine.class}</Badge>
                  </div>
                  <div>
                    <strong>Section:</strong>{" "}
                    <Badge variant="secondary">{routine.section}</Badge>
                  </div>
                  <div>
                    <strong>Day:</strong> {routine.day}
                  </div>
                  <div>
                    <strong>Subject:</strong> {routine.subject}
                  </div>
                </div>
                <div className="space-y-2">
                  <div>
                    <strong>Teacher:</strong> {routine.teacher}
                  </div>
                  <div>
                    <strong>Time:</strong> {routine.startTime} -{" "}
                    {routine.endTime}
                  </div>
                  <div>
                    <strong>Room:</strong> {routine.room || "N/A"}
                  </div>
                </div>
              </div>
              <div className="border-t pt-4 space-y-2 text-xs text-muted-foreground">
                <div className="flex justify-between">
                  <span>Created:</span>
                  <span>
                    {new Date(routine.createdAt || "").toLocaleDateString()}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Last Updated:</span>
                  <span>
                    {new Date(routine.updatedAt || "").toLocaleDateString()}
                  </span>
                </div>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      );
    },
  },
];

const formFields: FormField[] = [
  {
    name: "class",
    label: "Class",
    type: "select",
    required: true,
    options: [
      { value: "Nursery", label: "Nursery" },
      { value: "KG", label: "KG" },
      { value: "1", label: "Class 1" },
      { value: "2", label: "Class 2" },
      { value: "3", label: "Class 3" },
      { value: "4", label: "Class 4" },
      { value: "5", label: "Class 5" },
      { value: "6", label: "Class 6" },
      { value: "7", label: "Class 7" },
      { value: "8", label: "Class 8" },
      { value: "9", label: "Class 9" },
      { value: "10", label: "Class 10" },
    ],
  },
  {
    name: "section",
    label: "Section",
    type: "select",
    required: true,
    options: [
      { value: "A", label: "Section A" },
      { value: "B", label: "Section B" },
      { value: "C", label: "Section C" },
      { value: "D", label: "Section D" },
      { value: "Morning", label: "Morning Shift" },
      { value: "Day", label: "Day Shift" },
    ],
  },
  {
    name: "day",
    label: "Day",
    type: "select",
    required: true,
    options: [
      { value: "Sunday", label: "Sunday" },
      { value: "Monday", label: "Monday" },
      { value: "Tuesday", label: "Tuesday" },
      { value: "Wednesday", label: "Wednesday" },
      { value: "Thursday", label: "Thursday" },
      { value: "Friday", label: "Friday" },
      { value: "Saturday", label: "Saturday" },
    ],
  },
  {
    name: "subject",
    label: "Subject",
    type: "text",
    required: true,
    placeholder: "e.g., Mathematics, English, Science",
  },
  {
    name: "teacher",
    label: "Teacher",
    type: "text",
    required: true,
    placeholder: "e.g., Mr. Smith, Ms. Johnson",
  },
  {
    name: "startTime",
    label: "Start Time",
    type: "text",
    required: true,
    placeholder: "e.g., 09:00 AM",
  },
  {
    name: "endTime",
    label: "End Time",
    type: "text",
    required: true,
    placeholder: "e.g., 10:00 AM",
  },
  {
    name: "room",
    label: "Room (Optional)",
    type: "text",
    placeholder: "e.g., Room 101, Lab A",
  },
];

interface ClassRoutineTableProps {
  data: IClassRoutine[];
  onAdd: (
    routine: Omit<IClassRoutine, "_id" | "createdAt" | "updatedAt">
  ) => Promise<void>;
  onEdit: (id: string, routine: Partial<IClassRoutine>) => Promise<void>;
  onDelete: (id: string) => Promise<void>;
}

export function ClassRoutineTable({
  data,
  onAdd,
  onEdit,
  onDelete,
}: ClassRoutineTableProps) {
  return (
    <CrudDataTable
      data={data}
      columns={columns}
      onAdd={onAdd}
      onEdit={onEdit}
      onDelete={onDelete}
      title="Class Routines"
      createFormFields={formFields}
      editFormFields={formFields}
    />
  );
}
