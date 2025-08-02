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
import type { IAdmission, FormField } from "@/types/index";
import { CrudDataTable } from "../ui/crud-data-table";

const columns: ColumnDef<IAdmission>[] = [
  {
    accessorKey: "photo",
    header: "Photo",
    cell: ({ row }) => {
      const photo = row.getValue("photo") as string;
      const studentName = row.getValue("studentName") as string;
      return (
        <Avatar className="h-10 w-10">
          <AvatarImage src={photo || "/placeholder.svg"} alt={studentName} />
          <AvatarFallback>
            {studentName?.charAt(0)?.toUpperCase()}
          </AvatarFallback>
        </Avatar>
      );
    },
  },
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
      <div>
        <div className="font-medium">{row.getValue("studentName")}</div>
        <div className="text-sm text-muted-foreground">
          {row.original.studentNameEnglish}
        </div>
      </div>
    ),
  },
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
    accessorKey: "academicYear",
    header: "Academic Year",
    cell: ({ row }) => (
      <Badge variant="secondary">{row.getValue("academicYear")}</Badge>
    ),
  },
  {
    accessorKey: "fatherName",
    header: "Father's Name",
    cell: ({ row }) => (
      <div className="max-w-[150px] truncate">{row.getValue("fatherName")}</div>
    ),
  },
  {
    accessorKey: "mobileNumber",
    header: "Mobile",
    cell: ({ row }) => (
      <div className="font-mono text-sm">
        <a
          href={`tel:${row.getValue("mobileNumber")}`}
          className="hover:underline"
        >
          {row.getValue("mobileNumber")}
        </a>
      </div>
    ),
  },
  {
    accessorKey: "dateOfBirth",
    header: "Date of Birth",
    cell: ({ row }) => {
      const date = row.getValue("dateOfBirth") as Date;
      return (
        <div className="text-sm">{new Date(date).toLocaleDateString()}</div>
      );
    },
  },
  {
    id: "details",
    header: "Details",
    cell: ({ row }) => {
      const admission = row.original;
      return (
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="ghost" size="sm">
              <Eye className="h-4 w-4" />
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Admission Details</DialogTitle>
              <DialogDescription>
                Complete information for {admission.studentName}
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h4 className="font-semibold mb-2">Personal Information</h4>
                  <div className="space-y-2 text-sm">
                    <div>
                      <strong>Name:</strong> {admission.studentName}
                    </div>
                    <div>
                      <strong>English Name:</strong>{" "}
                      {admission.studentNameEnglish}
                    </div>
                    <div>
                      <strong>Date of Birth:</strong>{" "}
                      {new Date(admission.dateOfBirth).toLocaleDateString()}
                    </div>
                    <div>
                      <strong>Class:</strong> {admission.class}
                    </div>
                    <div>
                      <strong>Academic Year:</strong> {admission.academicYear}
                    </div>
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Family Information</h4>
                  <div className="space-y-2 text-sm">
                    <div>
                      <strong>Father:</strong> {admission.fatherName}
                    </div>
                    <div>
                      <strong>Mother:</strong> {admission.motherName}
                    </div>
                    {admission.fatherOccupation && (
                      <div>
                        <strong>{`Father's Occupation:`}</strong>{" "}
                        {admission.fatherOccupation}
                      </div>
                    )}
                  </div>
                </div>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Contact Information</h4>
                <div className="space-y-2 text-sm">
                  <div>
                    <strong>Mobile:</strong> {admission.mobileNumber}
                  </div>
                  {admission.email && (
                    <div>
                      <strong>Email:</strong> {admission.email}
                    </div>
                  )}
                  <div>
                    <strong>Address:</strong> {admission.address}
                  </div>
                </div>
              </div>
              {(admission.previousInstitution ||
                admission.previousInstitutionAddress) && (
                <div>
                  <h4 className="font-semibold mb-2">Previous Institution</h4>
                  <div className="space-y-2 text-sm">
                    {admission.previousInstitution && (
                      <div>
                        <strong>Institution:</strong>{" "}
                        {admission.previousInstitution}
                      </div>
                    )}
                    {admission.previousInstitutionAddress && (
                      <div>
                        <strong>Address:</strong>{" "}
                        {admission.previousInstitutionAddress}
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </DialogContent>
        </Dialog>
      );
    },
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
    name: "studentNameEnglish",
    label: "Student Name (English)",
    type: "text",
    required: true,
    placeholder: "Enter student name in English",
  },
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
    name: "academicYear",
    label: "Academic Year",
    type: "select",
    required: true,
    options: [
      { value: "2023-24", label: "2023-24" },
      { value: "2024-25", label: "2024-25" },
      { value: "2025-26", label: "2025-26" },
    ],
  },
  {
    name: "dateOfBirth",
    label: "Date of Birth",
    type: "date",
    required: true,
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
    name: "fatherOccupation",
    label: "Father's Occupation",
    type: "text",
    placeholder: "Enter father's occupation (optional)",
  },
  {
    name: "address",
    label: "Address",
    type: "textarea",
    required: true,
    placeholder: "Enter complete address",
  },
  {
    name: "mobileNumber",
    label: "Mobile Number",
    type: "text",
    required: true,
    placeholder: "Enter mobile number",
  },
  {
    name: "email",
    label: "Email",
    type: "email",
    placeholder: "Enter email address (optional)",
  },
  {
    name: "photo",
    label: "Photo URL",
    type: "text",
    placeholder: "Enter photo URL (optional)",
  },
  {
    name: "previousInstitution",
    label: "Previous Institution",
    type: "text",
    placeholder: "Enter previous institution name (optional)",
  },
  {
    name: "previousInstitutionAddress",
    label: "Previous Institution Address",
    type: "textarea",
    placeholder: "Enter previous institution address (optional)",
  },
];

interface AdmissionTableProps {
  data: IAdmission[];
  onAdd: (
    admission: Omit<IAdmission, "_id" | "createdAt" | "updatedAt">
  ) => Promise<void>;
  onEdit: (id: string, admission: Partial<IAdmission>) => Promise<void>;
  onDelete: (id: string) => Promise<void>;
}

export function AdmissionTable({
  data,
  onAdd,
  onEdit,
  onDelete,
}: AdmissionTableProps) {
  return (
    <CrudDataTable
      data={data}
      columns={columns}
      onAdd={onAdd}
      onEdit={onEdit}
      onDelete={onDelete}
      title="Admissions"
      createFormFields={formFields}
      editFormFields={formFields}
    />
  );
}
