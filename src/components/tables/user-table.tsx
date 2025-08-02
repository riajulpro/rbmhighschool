"use client";

import type { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, Eye, Mail, UserIcon } from "lucide-react";
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
import { CrudDataTable } from "@/components/ui/crud-data-table";
import type { IUser, FormField } from "@/types/index";
import { UserRole } from "@/types/index"; // Import UserRole

const columns: ColumnDef<IUser>[] = [
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
      <div className="font-medium">{row.getValue("name")}</div>
    ),
  },
  {
    accessorKey: "email",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Email
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => (
      <div className="flex items-center gap-1 text-sm">
        <Mail className="h-3 w-3 text-muted-foreground" />
        <a href={`mailto:${row.getValue("email")}`} className="hover:underline">
          {row.getValue("email")}
        </a>
      </div>
    ),
  },
  {
    accessorKey: "role",
    header: "Role",
    cell: ({ row }) => {
      const role = row.getValue("role") as UserRole;
      let variant: "default" | "secondary" | "outline" | "destructive" =
        "outline";
      if (role === UserRole.ADMIN) variant = "destructive";
      else if (role === UserRole.PRINCIPAL) variant = "default";
      else if (role === UserRole.TEACHER) variant = "secondary";

      return (
        <Badge variant={variant} className="text-sm">
          {role.charAt(0).toUpperCase() + role.slice(1)}
        </Badge>
      );
    },
  },
  {
    accessorKey: "createdAt",
    header: "Created On",
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
      const user = row.original;
      return (
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="ghost" size="sm">
              <Eye className="h-4 w-4" />
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>User Details</DialogTitle>
              <DialogDescription>
                Complete information for {user.name}
              </DialogDescription>
            </DialogHeader>
            <div className="flex flex-col items-center space-y-4 py-6">
              <div className="flex items-center justify-center h-24 w-24 rounded-full bg-primary/10 text-primary">
                <UserIcon className="h-12 w-12" />
              </div>
              <div className="text-center space-y-2">
                <h3 className="text-xl font-semibold">{user.name}</h3>
                <Badge variant="secondary" className="text-sm">
                  {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                </Badge>
              </div>
              <div className="w-full space-y-2 text-sm">
                <div>
                  <span className="font-medium">Email:</span>{" "}
                  <a href={`mailto:${user.email}`} className="hover:underline">
                    {user.email}
                  </a>
                </div>
                <div className="flex justify-between border-t pt-2">
                  <span className="font-medium">Created:</span>
                  <span>
                    {new Date(user.createdAt || "").toLocaleDateString()}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">Last Updated:</span>
                  <span>
                    {new Date(user.updatedAt || "").toLocaleDateString()}
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

const createFormFields: FormField[] = [
  {
    name: "name",
    label: "Name",
    type: "text",
    required: true,
    placeholder: "Enter user's full name",
  },
  {
    name: "email",
    label: "Email",
    type: "email",
    required: true,
    placeholder: "Enter user's email address",
  },
  {
    name: "password",
    label: "Password",
    type: "password",
    required: true,
    placeholder: "Enter password",
  },
  {
    name: "role",
    label: "Role",
    type: "select",
    required: true,
    options: Object.values(UserRole).map((role) => ({
      value: role,
      label: role.charAt(0).toUpperCase() + role.slice(1),
    })),
  },
];

const editFormFields: FormField[] = [
  {
    name: "name",
    label: "Name",
    type: "text",
    required: true,
    placeholder: "Enter user's full name",
  },
  {
    name: "email",
    label: "Email",
    type: "email",
    required: true,
    placeholder: "Enter user's email address",
  },
  {
    name: "password",
    label: "New Password (optional)",
    type: "password",
    required: false, // Password is optional for edit
    placeholder: "Leave blank to keep current password",
  },
  {
    name: "role",
    label: "Role",
    type: "select",
    required: true,
    options: Object.values(UserRole).map((role) => ({
      value: role,
      label: role.charAt(0).toUpperCase() + role.slice(1),
    })),
  },
];

interface UserTableProps {
  data: IUser[];
  onAdd: (
    user: Omit<IUser, "_id" | "createdAt" | "updatedAt">
  ) => Promise<void>;
  onEdit: (id: string, user: Partial<IUser>) => Promise<void>;
  onDelete: (id: string) => Promise<void>;
}

export function UserTable({ data, onAdd, onEdit, onDelete }: UserTableProps) {
  return (
    <CrudDataTable
      data={data}
      columns={columns}
      onAdd={onAdd}
      onEdit={onEdit}
      onDelete={onDelete}
      title="Users"
      createFormFields={createFormFields}
      editFormFields={editFormFields}
    />
  );
}
