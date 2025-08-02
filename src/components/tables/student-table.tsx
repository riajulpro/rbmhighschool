"use client";

import type { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CrudDataTable } from "@/components/ui/crud-data-table";
import type { IStudent, FormField } from "@/types/index";

const columns: ColumnDef<IStudent>[] = [
  {
    accessorKey: "studentName",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Student Name
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => (
      <div className="font-medium">{row.getValue("studentName")}</div>
    ),
  },
  {
    accessorKey: "rollNumber",
    header: "Roll Number",
  },
  {
    accessorKey: "class",
    header: "Class",
  },
  {
    accessorKey: "section",
    header: "Section",
  },
  {
    accessorKey: "session",
    header: "Session",
  },
  {
    accessorKey: "guardianPhone",
    header: "Guardian Phone",
  },
];

const formFields: FormField[] = [
  {
    name: "studentName",
    label: "Student Name",
    type: "text",
    required: true,
    placeholder: "Enter student name",
  },
  {
    name: "fatherName",
    label: "Father's Name",
    type: "text",
    required: true,
    placeholder: "Enter father's name",
  },
  {
    name: "motherName",
    label: "Mother's Name",
    type: "text",
    required: true,
    placeholder: "Enter mother's name",
  },
  {
    name: "class",
    label: "Class",
    type: "text",
    required: true,
    placeholder: "Enter class",
  },
  {
    name: "section",
    label: "Section",
    type: "text",
    required: true,
    placeholder: "Enter section",
  },
  {
    name: "session",
    label: "Session",
    type: "text",
    required: true,
    placeholder: "Enter session",
  },
  {
    name: "rollNumber",
    label: "Roll Number",
    type: "text",
    required: true,
    placeholder: "Enter roll number",
  },
  {
    name: "gender",
    label: "Gender",
    type: "select",
    options: [
      { value: "male", label: "Male" },
      { value: "female", label: "Female" },
      { value: "other", label: "Other" },
    ],
  },
  {
    name: "dob",
    label: "Date of Birth",
    type: "date",
    required: true,
  },
  {
    name: "guardianName",
    label: "Guardian Name",
    type: "text",
    required: true,
    placeholder: "Enter guardian name",
  },
  {
    name: "guardianPhone",
    label: "Guardian Phone",
    type: "text",
    required: true,
    placeholder: "Enter guardian phone",
  },
  {
    name: "address",
    label: "Address",
    type: "textarea",
    required: true,
    placeholder: "Enter address",
  },
];

interface StudentTableProps {
  data: IStudent[];
  onAdd: (
    student: Omit<IStudent, "_id" | "createdAt" | "updatedAt">
  ) => Promise<void>;
  onEdit: (id: string, student: Partial<IStudent>) => Promise<void>;
  onDelete: (id: string) => Promise<void>;
}

export function StudentTable({
  data,
  onAdd,
  onEdit,
  onDelete,
}: StudentTableProps) {
  return (
    <CrudDataTable
      data={data}
      columns={columns}
      onAdd={onAdd}
      onEdit={onEdit}
      onDelete={onDelete}
      title="Students"
      createFormFields={formFields}
      editFormFields={formFields}
    />
  );
}
