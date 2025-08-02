"use client";

import type { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CrudDataTable } from "@/components/ui/crud-data-table";
import type { INotice, FormField } from "@/types/index";

const columns: ColumnDef<INotice>[] = [
  {
    accessorKey: "title",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Title
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => (
      <div className="font-medium">{row.getValue("title")}</div>
    ),
  },
  {
    accessorKey: "docPath",
    header: "Document Path",
    cell: ({ row }) => (
      <div className="max-w-[200px] truncate" title={row.getValue("docPath")}>
        {row.getValue("docPath")}
      </div>
    ),
  },
  {
    accessorKey: "audience",
    header: "Audience",
    cell: ({ row }) => {
      const audience = row.getValue("audience") as string;
      return (
        <Badge variant={audience === "all" ? "default" : "secondary"}>
          {audience}
        </Badge>
      );
    },
  },
  {
    accessorKey: "createdAt",
    header: "Created At",
    cell: ({ row }) => {
      const date = row.getValue("createdAt") as Date;
      return <div>{new Date(date).toLocaleDateString()}</div>;
    },
  },
];

const formFields: FormField[] = [
  {
    name: "title",
    label: "Title",
    type: "text",
    required: true,
    placeholder: "Enter notice title",
  },
  {
    name: "docPath",
    label: "Document Path",
    type: "text",
    required: true,
    placeholder: "Enter document path",
  },
  {
    name: "audience",
    label: "Audience",
    type: "select",
    options: [
      { value: "students", label: "Students" },
      { value: "teachers", label: "Teachers" },
      { value: "all", label: "All" },
    ],
  },
];

interface NoticeTableProps {
  data: INotice[];
  onAdd: (
    notice: Omit<INotice, "_id" | "createdAt" | "updatedAt">
  ) => Promise<void>;
  onEdit: (id: string, notice: Partial<INotice>) => Promise<void>;
  onDelete: (id: string) => Promise<void>;
}

export function NoticeTable({
  data,
  onAdd,
  onEdit,
  onDelete,
}: NoticeTableProps) {
  return (
    <CrudDataTable
      data={data}
      columns={columns}
      onAdd={onAdd}
      onEdit={onEdit}
      onDelete={onDelete}
      title="Notices"
      createFormFields={formFields}
      editFormFields={formFields}
    />
  );
}
