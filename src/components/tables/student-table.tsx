"use client";

import { useState } from "react";
import type { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, Eye, Printer } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CrudDataTable } from "@/components/ui/crud-data-table";
import type { IStudent, FormField } from "@/types/index";
import { StudentDetailsModal } from "./student-modal-details";

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
    type: "select",
    options: [
      { label: "Six", value: "6" },
      { label: "Seven", value: "7" },
      { label: "Eight", value: "8" },
      { label: "Nine", value: "9" },
      { label: "Ten", value: "10" },
    ],
    required: true,
    placeholder: "Enter class",
  },
  {
    name: "section",
    label: "Section",
    type: "select",
    options: [
      {
        label: "Section A",
        value: "A",
      },
      {
        label: "Section B",
        value: "B",
      },
      {
        label: "Section C",
        value: "C",
      },
      {
        label: "Section D",
        value: "D",
      },
      {
        label: "Section E",
        value: "E",
      },
    ],
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
  const [selectedStudent, setSelectedStudent] = useState<IStudent | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

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
    {
      id: "actions",
      cell: ({ row }) => {
        const student = row.original;
        return (
          <div className="flex gap-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => {
                setSelectedStudent(student);
                setIsModalOpen(true);
              }}
              title="View Student"
            >
              <Eye className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => {
                // Print student details
                const printWindow = window.open("", "_blank");
                printWindow?.document.write(`
                  <html>
                    <head>
                      <title>Student Information - ${student.studentName}</title>
                      <style>
                        body { font-family: Arial, sans-serif; padding: 20px; }
                        h1 { text-align: center; }
                        .info { margin: 20px 0; }
                        .info p { margin: 5px 0; }
                      </style>
                    </head>
                    <body>
                      <h1>Student Information</h1>
                      <div class="info">
                        <p><strong>Name:</strong> ${student.studentName}</p>
                        <p><strong>Roll Number:</strong> ${student.rollNumber}</p>
                        <p><strong>Class:</strong> ${student.class}</p>
                        <p><strong>Section:</strong> ${student.section}</p>
                        <p><strong>Session:</strong> ${student.session}</p>
                        <p><strong>Father's Name:</strong> ${student.fatherName}</p>
                        <p><strong>Mother's Name:</strong> ${student.motherName}</p>
                        <p><strong>Gender:</strong> ${student.gender}</p>
                        <p><strong>Date of Birth:</strong> ${student.dob}</p>
                        <p><strong>Guardian Name:</strong> ${student.guardianName}</p>
                        <p><strong>Guardian Phone:</strong> ${student.guardianPhone}</p>
                        <p><strong>Address:</strong> ${student.address}</p>
                      </div>
                      <script>
                        window.print();
                        window.onafterprint = () => window.close();
                      </script>
                    </body>
                  </html>
                `);
                printWindow?.document.close();
              }}
              title="Print Student Info"
            >
              <Printer className="h-4 w-4" />
            </Button>
          </div>
        );
      },
    },
  ];

  return (
    <>
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

      <StudentDetailsModal
        student={selectedStudent}
        open={isModalOpen}
        onOpenChange={setIsModalOpen}
      />
    </>
  );
}
