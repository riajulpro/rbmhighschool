"use client";

import type { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, Eye, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { CrudDataTable } from "@/components/ui/crud-data-table";
import type { ITeacher, FormField } from "@/types/index";

const columns: ColumnDef<ITeacher>[] = [
  {
    accessorKey: "profileImg",
    header: "Photo",
    cell: ({ row }) => {
      const profileImg = row.getValue("profileImg") as string;
      const teacherName = row.original.teacherName;
      return (
        <Avatar className="h-12 w-12">
          <AvatarImage
            src={profileImg || "/placeholder.svg?height=48&width=48"}
            alt={teacherName}
          />
          <AvatarFallback className="text-sm font-medium">
            {teacherName
              ?.split(" ")
              .map((n) => n[0])
              .join("")
              .toUpperCase() || "T"}
          </AvatarFallback>
        </Avatar>
      );
    },
  },
  {
    accessorKey: "teacherName",
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
      <div className="font-medium text-base">{row.getValue("teacherName")}</div>
    ),
  },
  {
    accessorKey: "designation",
    header: "Designation",
    cell: ({ row }) => (
      <Badge variant="outline">{row.getValue("designation")}</Badge>
    ),
  },
  {
    accessorKey: "phone",
    header: "Phone",
    cell: ({ row }) => (
      <div className="flex items-center gap-1 text-sm">
        <Phone className="h-3 w-3 text-muted-foreground" />
        <a href={`tel:${row.getValue("phone")}`} className="hover:underline">
          {row.getValue("phone")}
        </a>
      </div>
    ),
  },
  {
    accessorKey: "specialization",
    header: "Specialization",
    cell: ({ row }) => {
      const specialization = row.getValue("specialization") as string[];
      return (
        <div className="flex flex-wrap gap-1">
          {specialization?.length > 0 ? (
            specialization.map((spec, index) => (
              <Badge key={index} variant="secondary">
                {spec}
              </Badge>
            ))
          ) : (
            <span className="text-muted-foreground text-sm">N/A</span>
          )}
        </div>
      );
    },
  },
  {
    accessorKey: "createdAt",
    header: "Joined On",
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
      const teacher = row.original;
      return (
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="ghost" size="sm">
              <Eye className="h-4 w-4" />
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Teacher Details</DialogTitle>
              <DialogDescription>
                Complete information for {teacher.teacherName}
              </DialogDescription>
            </DialogHeader>
            <div className="flex flex-col items-center space-y-4 py-6">
              <Avatar className="h-24 w-24">
                <AvatarImage
                  src={
                    teacher.profileImg || "/placeholder.svg?height=96&width=96"
                  }
                  alt={teacher.teacherName}
                />
                <AvatarFallback className="text-2xl font-bold">
                  {teacher.teacherName
                    ?.split(" ")
                    .map((n) => n[0])
                    .join("")
                    .toUpperCase() || "T"}
                </AvatarFallback>
              </Avatar>
              <div className="text-center space-y-2">
                <h3 className="text-xl font-semibold">{teacher.teacherName}</h3>
                <Badge variant="outline" className="text-sm">
                  {teacher.designation}
                </Badge>
              </div>
              <div className="w-full space-y-2 text-sm">
                <div>
                  <span className="font-medium">Phone:</span>{" "}
                  <a href={`tel:${teacher.phone}`} className="hover:underline">
                    {teacher.phone}
                  </a>
                </div>
                <div>
                  <span className="font-medium">Institution:</span>{" "}
                  {teacher.institution}
                </div>
                <div>
                  <span className="font-medium">Specialization:</span>{" "}
                  {teacher.specialization &&
                  teacher.specialization.length > 0 ? (
                    <div className="inline-flex flex-wrap gap-1">
                      {teacher.specialization.map((spec, index) => (
                        <Badge key={index} variant="secondary">
                          {spec}
                        </Badge>
                      ))}
                    </div>
                  ) : (
                    "N/A"
                  )}
                </div>
                <div className="flex justify-between border-t pt-2">
                  <span className="font-medium">Joined:</span>
                  <span>
                    {new Date(teacher.createdAt || "").toLocaleDateString()}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">Last Updated:</span>
                  <span>
                    {new Date(teacher.updatedAt || "").toLocaleDateString()}
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
    name: "userId",
    label: "User ID",
    type: "text",
    required: true,
    placeholder: "Enter associated user ID",
  },
  {
    name: "teacherName",
    label: "Teacher Name",
    type: "text",
    required: true,
    placeholder: "Enter teacher's full name",
  },
  {
    name: "designation",
    label: "Designation",
    type: "select",
    required: true,
    options: [
      { value: "Head Teacher", label: "Head Teacher" },
      { value: "Senior Teacher", label: "Senior Teacher" },
      { value: "Assistant Teacher", label: "Assistant Teacher" },
      { value: "Lecturer", label: "Lecturer" },
      { value: "Subject Coordinator", label: "Subject Coordinator" },
      { value: "Class Teacher", label: "Class Teacher" },
      { value: "Counselor", label: "Counselor" },
      { value: "Sports Coach", label: "Sports Coach" },
      { value: "Art Teacher", label: "Art Teacher" },
      { value: "Music Teacher", label: "Music Teacher" },
      { value: "IT Teacher", label: "IT Teacher" },
      { value: "Other", label: "Other" },
    ],
  },
  {
    name: "phone",
    label: "Phone Number",
    type: "text",
    required: true,
    placeholder: "Enter phone number",
  },
  {
    name: "institution",
    label: "Institution",
    type: "text",
    required: true,
    placeholder: "Enter institution name",
  },
  {
    name: "profileImg",
    label: "Profile Image URL",
    type: "text",
    placeholder: "Enter profile image URL (optional)",
  },
  {
    name: "specialization",
    label: "Specialization (comma-separated)",
    type: "text",
    placeholder: "e.g., Math, Physics, English Literature",
  },
];

interface TeacherTableProps {
  data: ITeacher[];
  onAdd: (
    teacher: Omit<ITeacher, "_id" | "createdAt" | "updatedAt">
  ) => Promise<void>;
  onEdit: (id: string, teacher: Partial<ITeacher>) => Promise<void>;
  onDelete: (id: string) => Promise<void>;
}

export function TeacherTable({
  data,
  onAdd,
  onEdit,
  onDelete,
}: TeacherTableProps) {
  // Transform specialization from comma-separated string to array for form submission
  const handleAddWithSpecialization = async (
    teacherData: Omit<ITeacher, "_id" | "createdAt" | "updatedAt">
  ) => {
    const transformedData = {
      ...teacherData,
      specialization:
        typeof teacherData.specialization === "string"
          ? (teacherData.specialization as string)
              .split(",")
              .map((s) => s.trim())
          : [],
    };
    await onAdd(transformedData);
  };

  const handleEditWithSpecialization = async (
    id: string,
    teacherData: Partial<ITeacher>
  ) => {
    const transformedData = {
      ...teacherData,
      specialization:
        typeof teacherData.specialization === "string"
          ? (teacherData.specialization as string)
              .split(",")
              .map((s) => s.trim())
          : teacherData.specialization,
    };
    await onEdit(id, transformedData);
  };

  return (
    <CrudDataTable
      data={data}
      columns={columns}
      onAdd={handleAddWithSpecialization}
      onEdit={handleEditWithSpecialization}
      onDelete={onDelete}
      title="Teachers"
      createFormFields={formFields}
      editFormFields={formFields.map((field) =>
        field.name === "specialization"
          ? {
              ...field,
              defaultValue: (item: ITeacher) =>
                item.specialization?.join(", ") || "",
            }
          : field
      )}
    />
  );
}
