"use client";

import type { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, Eye } from "lucide-react";
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
import type { IStaff, FormField } from "@/types/index";

const columns: ColumnDef<IStaff>[] = [
  {
    accessorKey: "profilePic",
    header: "Photo",
    cell: ({ row }) => {
      const profilePic = row.getValue("profilePic") as string;
      const name = row.getValue("name") as string;
      return (
        <Avatar className="h-12 w-12">
          <AvatarImage
            src={profilePic || "/placeholder.svg?height=48&width=48"}
            alt={name}
          />
          <AvatarFallback className="text-sm font-medium">
            {name
              ?.split(" ")
              .map((n) => n[0])
              .join("")
              .toUpperCase() || "S"}
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
    accessorKey: "responsibility",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Responsibility
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const responsibility = row.getValue("responsibility") as string;
      return (
        <div className="max-w-[300px]">
          <Badge variant="outline" className="text-sm">
            {responsibility}
          </Badge>
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
      const staff = row.original;
      return (
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="ghost" size="sm">
              <Eye className="h-4 w-4" />
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Staff Details</DialogTitle>
              <DialogDescription>
                Complete information for {staff.name}
              </DialogDescription>
            </DialogHeader>
            <div className="flex flex-col items-center space-y-4 py-6">
              <Avatar className="h-24 w-24">
                <AvatarImage
                  src={
                    staff.profilePic || "/placeholder.svg?height=96&width=96"
                  }
                  alt={staff.name}
                />
                <AvatarFallback className="text-2xl font-bold">
                  {staff.name
                    ?.split(" ")
                    .map((n) => n[0])
                    .join("")
                    .toUpperCase() || "S"}
                </AvatarFallback>
              </Avatar>
              <div className="text-center space-y-2">
                <h3 className="text-xl font-semibold">{staff.name}</h3>
                <Badge variant="secondary" className="text-sm">
                  {staff.responsibility}
                </Badge>
              </div>
              <div className="w-full space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="font-medium">Joined:</span>
                  <span>
                    {new Date(staff.createdAt || "").toLocaleDateString()}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">Last Updated:</span>
                  <span>
                    {new Date(staff.updatedAt || "").toLocaleDateString()}
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
    label: "Full Name",
    type: "text",
    required: true,
    placeholder: "Enter full name",
  },
  {
    name: "responsibility",
    label: "Responsibility/Role",
    type: "select",
    required: true,
    options: [
      { value: "Teacher", label: "Teacher" },
      { value: "Librarian", label: "Librarian" },
      { value: "Counselor", label: "Counselor" },
      { value: "IT Support", label: "IT Support" },
      { value: "Administrative Staff", label: "Administrative Staff" },
      { value: "Accountant", label: "Accountant" },
      { value: "Security Guard", label: "Security Guard" },
      { value: "Cleaner", label: "Cleaner" },
      { value: "Bus Driver", label: "Bus Driver" },
      { value: "Lab Assistant", label: "Lab Assistant" },
      { value: "Sports Coach", label: "Sports Coach" },
      { value: "Nurse", label: "Nurse" },
      { value: "Other", label: "Other" },
    ],
  },
  {
    name: "profilePic",
    label: "Profile Picture URL",
    type: "text",
    placeholder: "Enter profile picture URL (optional)",
  },
];

interface StaffTableProps {
  data: IStaff[];
  onAdd: (
    staff: Omit<IStaff, "_id" | "createdAt" | "updatedAt">
  ) => Promise<void>;
  onEdit: (id: string, staff: Partial<IStaff>) => Promise<void>;
  onDelete: (id: string) => Promise<void>;
}

export function StaffTable({ data, onAdd, onEdit, onDelete }: StaffTableProps) {
  return (
    <CrudDataTable
      data={data}
      columns={columns}
      onAdd={onAdd}
      onEdit={onEdit}
      onDelete={onDelete}
      title="Staff Members"
      createFormFields={formFields}
      editFormFields={formFields}
    />
  );
}
