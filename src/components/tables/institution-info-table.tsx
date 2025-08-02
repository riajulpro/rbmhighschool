"use client";

import type { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, Eye, Mail, Phone } from "lucide-react";
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
import type { IInstitutionInfo, FormField } from "@/types/index";

const columns: ColumnDef<IInstitutionInfo>[] = [
  {
    accessorKey: "logo",
    header: "Logo",
    cell: ({ row }) => {
      const logo = row.getValue("logo") as string;
      const name = row.getValue("name") as string;
      return (
        <Avatar className="h-12 w-12 rounded-none">
          <AvatarImage
            src={logo || "/placeholder.svg?height=48&width=48&text=Logo"}
            alt={name}
          />
          <AvatarFallback className="text-sm font-medium">
            {name
              ?.split(" ")
              .map((n) => n[0])
              .join("")
              .toUpperCase() || "I"}
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
          Institution Name
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => (
      <div className="font-medium text-base">{row.getValue("name")}</div>
    ),
  },
  {
    accessorKey: "establishedYear",
    header: "Est. Year",
    cell: ({ row }) => {
      const year = row.getValue("establishedYear") as number;
      return year ? (
        <Badge variant="outline">{year}</Badge>
      ) : (
        <span className="text-muted-foreground">-</span>
      );
    },
  },
  {
    accessorKey: "location",
    header: "Location",
    cell: ({ row }) => (
      <div
        className="max-w-[150px] truncate text-sm"
        title={row.getValue("location")}
      >
        {row.getValue("location")}
      </div>
    ),
  },
  {
    accessorKey: "contactEmail",
    header: "Email",
    cell: ({ row }) => (
      <div className="flex items-center gap-1 text-sm">
        <Mail className="h-3 w-3 text-muted-foreground" />
        <a
          href={`mailto:${row.getValue("contactEmail")}`}
          className="hover:underline"
        >
          {row.getValue("contactEmail")}
        </a>
      </div>
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
    id: "details",
    header: "Details",
    cell: ({ row }) => {
      const info = row.original;
      return (
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="ghost" size="sm">
              <Eye className="h-4 w-4" />
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>{info.name}</DialogTitle>
              <DialogDescription>
                Complete information about the institution.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-6 py-4">
              <div className="flex flex-col items-center space-y-4">
                <Avatar className="h-24 w-24 rounded-none">
                  <AvatarImage
                    src={
                      info.logo ||
                      "/placeholder.svg?height=96&width=96&text=Logo"
                    }
                    alt={info.name}
                  />
                  <AvatarFallback className="text-2xl font-bold">
                    {info.name
                      ?.split(" ")
                      .map((n) => n[0])
                      .join("")
                      .toUpperCase() || "I"}
                  </AvatarFallback>
                </Avatar>
                <h3 className="text-xl font-semibold">{info.name}</h3>
                {info.establishedYear && (
                  <Badge variant="secondary">
                    Established: {info.establishedYear}
                  </Badge>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div className="space-y-2">
                  <h4 className="font-semibold">Contact Information</h4>
                  <div>
                    <strong>Email:</strong> {info.contactEmail}
                  </div>
                  <div>
                    <strong>Phone:</strong> {info.phone}
                  </div>
                  <div>
                    <strong>Location:</strong> {info.location}
                  </div>
                  <div>
                    <strong>Full Address:</strong> {info.fullAddress}
                  </div>
                </div>
                <div className="space-y-2">
                  <h4 className="font-semibold">Institutional Details</h4>
                  {info.eiinNumber && (
                    <div>
                      <strong>EIIN Number:</strong> {info.eiinNumber}
                    </div>
                  )}
                  {info.schoolCode && (
                    <div>
                      <strong>School Code:</strong> {info.schoolCode}
                    </div>
                  )}
                  {info.shortInfo && (
                    <div>
                      <strong>Short Info:</strong> {info.shortInfo}
                    </div>
                  )}
                </div>
              </div>

              {info.about && (
                <div>
                  <h4 className="font-semibold">About Us</h4>
                  <p className="text-muted-foreground text-sm">{info.about}</p>
                </div>
              )}

              <div className="border-t pt-4 space-y-2 text-xs text-muted-foreground">
                <div className="flex justify-between">
                  <span>Added:</span>
                  <span>
                    {new Date(info.createdAt || "").toLocaleDateString()}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Last Updated:</span>
                  <span>
                    {new Date(info.updatedAt || "").toLocaleDateString()}
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
    label: "Institution Name",
    type: "text",
    required: true,
    placeholder: "Enter full institution name",
  },
  {
    name: "logo",
    label: "Logo URL",
    type: "text",
    placeholder: "Enter URL for institution logo (optional)",
  },
  {
    name: "establishedYear",
    label: "Established Year",
    type: "text",
    placeholder: "e.g., 1990",
  },
  {
    name: "location",
    label: "Location (City/District)",
    type: "text",
    required: true,
    placeholder: "e.g., Dhaka, Bangladesh",
  },
  {
    name: "contactEmail",
    label: "Contact Email",
    type: "email",
    required: true,
    placeholder: "Enter contact email",
  },
  {
    name: "phone",
    label: "Phone Number",
    type: "text",
    required: true,
    placeholder: "Enter phone number",
  },
  {
    name: "about",
    label: "About Institution",
    type: "textarea",
    placeholder: "A detailed description about the institution (optional)",
  },
  {
    name: "shortInfo",
    label: "Short Info",
    type: "text",
    placeholder: "A brief tagline or summary (optional)",
  },
  {
    name: "eiinNumber",
    label: "EIIN Number",
    type: "text",
    placeholder: "Enter EIIN number (optional)",
  },
  {
    name: "schoolCode",
    label: "School Code",
    type: "text",
    placeholder: "Enter school code (optional)",
  },
  {
    name: "fullAddress",
    label: "Full Address",
    type: "textarea",
    required: true,
    placeholder: "Enter full physical address",
  },
];

interface InstitutionInfoTableProps {
  data: IInstitutionInfo[];
  onAdd: (
    info: Omit<IInstitutionInfo, "_id" | "createdAt" | "updatedAt">
  ) => Promise<void>;
  onEdit: (id: string, info: Partial<IInstitutionInfo>) => Promise<void>;
  onDelete: (id: string) => Promise<void>;
}

export function InstitutionInfoTable({
  data,
  onAdd,
  onEdit,
  onDelete,
}: InstitutionInfoTableProps) {
  return (
    <CrudDataTable
      data={data}
      columns={columns}
      onAdd={onAdd}
      onEdit={onEdit}
      onDelete={onDelete}
      title="Institution Info"
      createFormFields={formFields}
      editFormFields={formFields}
    />
  );
}
