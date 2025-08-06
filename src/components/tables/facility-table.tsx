"use client";

import type { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, Eye, Package } from "lucide-react";
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
import type { IFacility, FormField } from "@/types/index";

const columns: ColumnDef<IFacility>[] = [
  {
    accessorKey: "serial",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Serial No.
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => (
      <div className="font-mono text-sm font-medium">
        <Badge variant="outline">{row.getValue("serial")}</Badge>
      </div>
    ),
  },
  {
    accessorKey: "name",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Facility Name
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => (
      <div className="flex items-center gap-2">
        <Package className="h-4 w-4 text-muted-foreground" />
        <span className="font-medium">{row.getValue("name")}</span>
      </div>
    ),
  },
  {
    accessorKey: "quantity",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Quantity
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const quantity = row.getValue("quantity") as string;
      return (
        <div className="text-center">
          {quantity ? (
            <Badge variant="secondary" className="font-mono">
              {quantity}
            </Badge>
          ) : (
            <span className="text-muted-foreground text-sm">Not specified</span>
          )}
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
    accessorKey: "updatedAt",
    header: "Last Updated",
    cell: ({ row }) => {
      const date = row.getValue("updatedAt") as Date;
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
      const facility = row.original;
      return (
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="ghost" size="sm">
              <Eye className="h-4 w-4" />
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Facility Details</DialogTitle>
              <DialogDescription>
                Complete information for {facility.name}
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-6 py-4">
              <div className="flex items-center justify-center">
                <div className="flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full">
                  <Package className="h-8 w-8 text-primary" />
                </div>
              </div>

              <div className="space-y-4">
                <div className="text-center">
                  <h3 className="text-lg font-semibold">{facility.name}</h3>
                  <Badge variant="outline" className="mt-1">
                    Serial: {facility.serial}
                  </Badge>
                </div>

                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="space-y-2">
                    <div>
                      <span className="font-medium text-muted-foreground">
                        Quantity:
                      </span>
                      <div className="mt-1">
                        {facility.quantity ? (
                          <Badge variant="secondary">{facility.quantity}</Badge>
                        ) : (
                          <span className="text-muted-foreground">
                            Not specified
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div>
                      <span className="font-medium text-muted-foreground">
                        Status:
                      </span>
                      <div className="mt-1">
                        <Badge variant="default">Active</Badge>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="border-t pt-4 space-y-2 text-xs text-muted-foreground">
                  <div className="flex justify-between">
                    <span>Added:</span>
                    <span>
                      {new Date(facility.createdAt || "").toLocaleDateString()}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Last Updated:</span>
                    <span>
                      {new Date(facility.updatedAt || "").toLocaleDateString()}
                    </span>
                  </div>
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
    name: "serial",
    label: "Serial Number",
    type: "text",
    required: true,
    placeholder: "Enter serial number (e.g., FAC-001)",
  },
  {
    name: "name",
    label: "Facility Name",
    type: "text",
    required: true,
    placeholder: "Enter facility name",
  },
  {
    name: "quantity",
    label: "Quantity",
    type: "text",
    placeholder: "Enter quantity (e.g., 10 units, 5 sets, etc.)",
  },
];

interface FacilityTableProps {
  data: IFacility[];
  onAdd: (
    facility: Omit<IFacility, "_id" | "createdAt" | "updatedAt">
  ) => Promise<void>;
  onEdit: (id: string, facility: Partial<IFacility>) => Promise<void>;
  onDelete: (id: string) => Promise<void>;
}

export function FacilityTable({
  data,
  onAdd,
  onEdit,
  onDelete,
}: FacilityTableProps) {
  return (
    <CrudDataTable
      data={data}
      columns={columns}
      onAdd={onAdd}
      onEdit={onEdit}
      onDelete={onDelete}
      title="Facilities   "
      createFormFields={formFields}
      editFormFields={formFields}
    />
  );
}
