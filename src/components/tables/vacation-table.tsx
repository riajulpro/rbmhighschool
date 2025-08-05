"use client";

import type { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, Package } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CrudDataTable } from "@/components/ui/crud-data-table";
import type { IVacation, FormField } from "@/types/index";

const columns: ColumnDef<IVacation>[] = [
  {
    accessorKey: "date",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Date
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
    accessorKey: "day",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Day
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
    accessorKey: "reason",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Reason
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
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
];

const formFields: FormField[] = [
  {
    name: "Date",
    label: "Date",
    type: "date",
    required: true,
    placeholder: "Pick a date",
  },
  {
    name: "day",
    label: "Day",
    type: "text",
    required: true,
    placeholder: "Enter day name",
  },
  {
    name: "reason",
    label: "Reason",
    type: "text",
    placeholder: "Enter quantity (e.g., 5 sets)",
  },
];

interface FacilityTableProps {
  data: IVacation[];
  onAdd: (
    facility: Omit<IVacation, "_id" | "createdAt" | "updatedAt">
  ) => Promise<void>;
  onEdit: (id: string, facility: Partial<IVacation>) => Promise<void>;
  onDelete: (id: string) => Promise<void>;
}

export function VacationTable({
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
      title="Vacation  "
      createFormFields={formFields}
      editFormFields={formFields}
    />
  );
}
