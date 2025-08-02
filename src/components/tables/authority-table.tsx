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
import { CrudDataTable } from "../ui/crud-data-table";
import type { IAuthority, FormField } from "@/types/index";

const columns: ColumnDef<IAuthority>[] = [
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
              .toUpperCase() || "A"}
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
      const authority = row.original;
      return (
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="ghost" size="sm">
              <Eye className="h-4 w-4" />
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Authority Details</DialogTitle>
              <DialogDescription>
                Complete information for {authority.name}
              </DialogDescription>
            </DialogHeader>
            <div className="flex flex-col items-center space-y-4 py-6">
              <Avatar className="h-24 w-24">
                <AvatarImage
                  src={
                    authority.profilePic ||
                    "/placeholder.svg?height=96&width=96"
                  }
                  alt={authority.name}
                />
                <AvatarFallback className="text-2xl font-bold">
                  {authority.name
                    ?.split(" ")
                    .map((n) => n[0])
                    .join("")
                    .toUpperCase() || "A"}
                </AvatarFallback>
              </Avatar>
              <div className="text-center space-y-2">
                <h3 className="text-xl font-semibold">{authority.name}</h3>
                <Badge variant="secondary" className="text-sm">
                  {authority.responsibility}
                </Badge>
              </div>
              <div className="w-full space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="font-medium">Added:</span>
                  <span>
                    {new Date(authority.createdAt || "").toLocaleDateString()}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">Last Updated:</span>
                  <span>
                    {new Date(authority.updatedAt || "").toLocaleDateString()}
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
    label: "Responsibility/Position",
    type: "select",
    required: true,
    options: [
      { value: "Principal", label: "Principal" },
      { value: "Vice Principal", label: "Vice Principal" },
      { value: "Head Teacher", label: "Head Teacher" },
      { value: "Assistant Head Teacher", label: "Assistant Head Teacher" },
      { value: "Academic Coordinator", label: "Academic Coordinator" },
      { value: "Administrative Officer", label: "Administrative Officer" },
      { value: "Librarian", label: "Librarian" },
      { value: "Sports Coordinator", label: "Sports Coordinator" },
      { value: "IT Administrator", label: "IT Administrator" },
      { value: "Counselor", label: "Counselor" },
      { value: "Finance Officer", label: "Finance Officer" },
      { value: "Examination Controller", label: "Examination Controller" },
      { value: "Student Affairs Officer", label: "Student Affairs Officer" },
      { value: "Discipline Officer", label: "Discipline Officer" },
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

interface AuthorityTableProps {
  data: IAuthority[];
  onAdd: (
    authority: Omit<IAuthority, "_id" | "createdAt" | "updatedAt">
  ) => Promise<void>;
  onEdit: (id: string, authority: Partial<IAuthority>) => Promise<void>;
  onDelete: (id: string) => Promise<void>;
}

export function AuthorityTable({
  data,
  onAdd,
  onEdit,
  onDelete,
}: AuthorityTableProps) {
  return (
    <CrudDataTable
      data={data}
      columns={columns}
      onAdd={onAdd}
      onEdit={onEdit}
      onDelete={onDelete}
      title="Authorities"
      createFormFields={formFields}
      editFormFields={formFields}
    />
  );
}
