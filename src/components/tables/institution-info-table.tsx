"use client";

import type { ColumnDef } from "@tanstack/react-table";
import { Eye, Mail, Phone } from "lucide-react";
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
    header: "Institution Name",
    cell: ({ row }) => (
      <div className="font-medium text-base">{row.getValue("name")}</div>
    ),
  },
  {
    accessorKey: "establishedDate",
    header: "Est. Date",
    cell: ({ row }) => {
      const date = row.getValue("establishedDate") as string;
      return date ? (
        <Badge variant="outline">{date}</Badge>
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
    id: "actions",
    header: "Actions",
    cell: ({ row }) => {
      const info = row.original;
      return (
        <div className="flex items-center gap-2">
          {/* Eye button beside 3-dot */}
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="ghost" size="sm">
                <Eye className="h-4 w-4" />
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-3xl overflow-y-auto max-h-[80vh]">
              <DialogHeader>
                <DialogTitle>{info.name}</DialogTitle>
                <DialogDescription>
                  Complete information about the institution.
                </DialogDescription>
              </DialogHeader>

              <div className="space-y-6 py-4">
                {/* Logo + Name */}
                <div className="flex flex-col items-center space-y-3">
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
                  {info.establishedDate && (
                    <Badge variant="secondary">
                      Established: {info.establishedDate}
                    </Badge>
                  )}
                </div>

                {/* Contact Info */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
                  <div className="space-y-2">
                    <h4 className="font-semibold">Contact Information</h4>
                    <p>
                      <strong>Email:</strong> {info.contactEmail}
                    </p>
                    <p>
                      <strong>Phone:</strong> {info.phone}
                    </p>
                    <p>
                      <strong>Location:</strong> {info.location}
                    </p>
                    <p>
                      <strong>Full Address:</strong> {info.fullAddress}
                    </p>
                  </div>

                  <div className="space-y-2">
                    <h4 className="font-semibold">Institutional Codes</h4>
                    {info.eiinNumber && (
                      <p>
                        <strong>EIIN:</strong> {info.eiinNumber}
                      </p>
                    )}
                    {info.schoolCode && (
                      <p>
                        <strong>School Code:</strong> {info.schoolCode}
                      </p>
                    )}
                    {info.mpoCode && (
                      <p>
                        <strong>MPO Code:</strong> {info.mpoCode}
                      </p>
                    )}
                    {info.boardCode && (
                      <p>
                        <strong>Board Code:</strong> {info.boardCode}
                      </p>
                    )}
                    {info.centreCode && (
                      <p>
                        <strong>Centre Code:</strong> {info.centreCode}
                      </p>
                    )}
                    {info.stipendCode && (
                      <p>
                        <strong>Stipend Code:</strong> {info.stipendCode}
                      </p>
                    )}
                  </div>
                </div>

                {/* Acknowledgements */}
                <div className="space-y-2 text-sm">
                  <h4 className="font-semibold">Acknowledgements</h4>
                  {info.firstAcknowledgementDate && (
                    <p>
                      <strong>First:</strong> {info.firstAcknowledgementDate}
                    </p>
                  )}
                  {info.recentAcknowledgementDate && (
                    <p>
                      <strong>Recent:</strong> {info.recentAcknowledgementDate}
                    </p>
                  )}
                  {info.mpoAssignmentDate && (
                    <p>
                      <strong>MPO Assignment:</strong> {info.mpoAssignmentDate}
                    </p>
                  )}
                </div>

                {/* About */}
                {info.about && (
                  <div>
                    <h4 className="font-semibold">About Us</h4>
                    <p className="text-muted-foreground text-sm">
                      {info.about}
                    </p>
                  </div>
                )}

                {/* Footer */}
                <div className="border-t pt-4 text-xs text-muted-foreground space-y-1">
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

          {/* Your 3-dot actions from CrudDataTable will remain here */}
        </div>
      );
    },
  },
];

const formFields: FormField[] = [
  { name: "name", label: "Institution Name", type: "text", required: true },
  { name: "logo", label: "Logo URL", type: "text" },
  { name: "establishedDate", label: "Established Date", type: "text" },
  {
    name: "firstAcknowledgementDate",
    label: "First Acknowledgement Date",
    type: "text",
  },
  {
    name: "recentAcknowledgementDate",
    label: "Recent Acknowledgement Date",
    type: "text",
  },
  { name: "mpoAssignmentDate", label: "MPO Assignment Date", type: "text" },
  { name: "eiinNumber", label: "EIIN Number", type: "text" },
  { name: "schoolCode", label: "School Code", type: "text" },
  { name: "mpoCode", label: "MPO Code", type: "text" },
  { name: "boardCode", label: "Board Code", type: "text" },
  { name: "centreCode", label: "Centre Code", type: "text" },
  { name: "stipendCode", label: "Stipend Code", type: "text" },
  { name: "location", label: "Location", type: "text", required: true },
  {
    name: "contactEmail",
    label: "Contact Email",
    type: "email",
    required: true,
  },
  { name: "phone", label: "Phone Number", type: "text", required: true },
  { name: "about", label: "About Institution", type: "textarea" },
  { name: "shortInfo", label: "Short Info", type: "text" },
  {
    name: "fullAddress",
    label: "Full Address",
    type: "textarea",
    required: true,
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
      title="Institution Info   "
      createFormFields={formFields}
      editFormFields={formFields}
    />
  );
}
