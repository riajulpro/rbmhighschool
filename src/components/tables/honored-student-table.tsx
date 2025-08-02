"use client";

import type { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { CrudDataTable } from "@/components/ui/crud-data-table";
import type { IHonoredStudent, FormField } from "@/types/index";

const columns: ColumnDef<IHonoredStudent>[] = [
  {
    accessorKey: "photo",
    header: "Photo",
    cell: ({ row }) => {
      const photo = row.getValue("photo") as string;
      const name = row.getValue("name") as string;
      return (
        <Avatar className="h-12 w-12">
          <AvatarImage
            src={photo || "/placeholder.svg?height=48&width=48"}
            alt={name}
          />
          <AvatarFallback className="text-sm font-medium">
            {name
              ?.split(" ")
              .map((n) => n[0])
              .join("")
              .toUpperCase() || "HS"}
          </AvatarFallback>
        </Avatar>
      );
    },
  },
  {
    accessorKey: "name",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Name
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => (
      <div className="font-medium text-base">{row.getValue("name")}</div>
    ),
  },
  {
    accessorKey: "year",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Year
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => (
      <Badge variant="secondary">{row.getValue("year")}</Badge>
    ),
  },
  {
    accessorKey: "reason",
    header: "Reason for Honor",
    cell: ({ row }) => (
      <div
        className="max-w-[300px] truncate text-sm text-muted-foreground"
        title={row.getValue("reason") || "No reason specified"}
      >
        {row.getValue("reason") || "No reason specified"}
      </div>
    ),
  },
  {
    accessorKey: "createdAt",
    header: "Added On",
    cell: ({ row }) => {
      const date = row.getValue("createdAt") as Date;
      return (
        <div className="text-sm text-muted-foreground">
          {new Date(date).toLocaleDateString()}
        </div>
      );
    },
  },
  {
    id: "details",
    header: "Details",
    cell: ({ row }) => {
      const student = row.original;
      return (
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="ghost" size="sm">
              <Eye className="h-4 w-4" />
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Honored Student Details</DialogTitle>
              <DialogDescription>
                Complete information for {student.name}
              </DialogDescription>
            </DialogHeader>
            <div className="flex flex-col items-center space-y-4 py-6">
              <Avatar className="h-24 w-24">
                <AvatarImage
                  src={student.photo || "/placeholder.svg?height=96&width=96"}
                  alt={student.name}
                />
                <AvatarFallback className="text-2xl font-bold">
                  {student.name
                    ?.split(" ")
                    .map((n) => n[0])
                    .join("")
                    .toUpperCase() || "HS"}
                </AvatarFallback>
              </Avatar>
              <div className="text-center space-y-2">
                <h3 className="text-xl font-semibold">{student.name}</h3>
                <Badge variant="secondary" className="text-sm">
                  Year: {student.year}
                </Badge>
              </div>
              <div className="w-full space-y-2 text-sm">
                <div>
                  <span className="font-medium">Reason for Honor:</span>
                  <p className="mt-1 text-muted-foreground">{student.reason}</p>
                </div>
                <div className="flex justify-between border-t pt-2">
                  <span className="font-medium">Added:</span>
                  <span>
                    {new Date(student.createdAt || "").toLocaleDateString()}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">Last Updated:</span>
                  <span>
                    {new Date(student.updatedAt || "").toLocaleDateString()}
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
    name: "name",
    label: "Student Name",
    type: "text",
    required: true,
    placeholder: "Enter student's full name",
  },
  {
    name: "year",
    label: "Year of Honor",
    type: "text", // Could be 'select' with options like "2023-2024", "2022-2023"
    required: true,
    placeholder: "e.g., 2024, 2023-2024",
  },
  {
    name: "reason",
    label: "Reason for Honor",
    type: "textarea",
    required: true,
    placeholder: "e.g., Academic Excellence, Sports Achievement, Leadership",
  },
  {
    name: "photo",
    label: "Photo URL",
    type: "text",
    placeholder: "Enter photo URL (optional)",
  },
];

interface HonoredStudentTableProps {
  data: IHonoredStudent[];
  onAdd: (
    student: Omit<IHonoredStudent, "_id" | "createdAt" | "updatedAt">
  ) => Promise<void>;
  onEdit: (id: string, student: Partial<IHonoredStudent>) => Promise<void>;
  onDelete: (id: string) => Promise<void>;
}

export function HonoredStudentTable({
  data,
  onAdd,
  onEdit,
  onDelete,
}: HonoredStudentTableProps) {
  return (
    <CrudDataTable
      data={data}
      columns={columns}
      onAdd={onAdd}
      onEdit={onEdit}
      onDelete={onDelete}
      title="Honored Students"
      createFormFields={formFields}
      editFormFields={formFields}
    />
  );
}
