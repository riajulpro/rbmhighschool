"use client";

import type { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, Eye, BarChart } from "lucide-react";
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
import type { FormField } from "@/types/index";
import { IExamResult } from "@/types/exam-results";

const columns: ColumnDef<IExamResult>[] = [
  {
    accessorKey: "year",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Year
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => <Badge variant="outline">{row.getValue("year")}</Badge>,
  },
  {
    accessorKey: "exam",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Exam
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => (
      <div className="flex items-center gap-2">
        <BarChart className="h-4 w-4 text-muted-foreground" />
        <span className="font-medium">{row.getValue("exam")}</span>
      </div>
    ),
  },
  {
    accessorKey: "totalExaminee",
    header: "Total Examinees",
    cell: ({ row }) => (
      <Badge variant="secondary" className="font-mono">
        {row.getValue("totalExaminee")}
      </Badge>
    ),
  },
  {
    accessorKey: "totalPassed",
    header: "Passed",
    cell: ({ row }) => (
      <Badge variant="secondary" className="font-mono">
        {row.getValue("totalPassed")}
      </Badge>
    ),
  },
  {
    accessorKey: "totalFailed",
    header: "Failed",
    cell: ({ row }) => (
      <Badge variant="destructive" className="font-mono">
        {row.getValue("totalFailed")}
      </Badge>
    ),
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
      const examResult = row.original;
      return (
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="ghost" size="sm">
              <Eye className="h-4 w-4" />
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-lg">
            <DialogHeader>
              <DialogTitle>Exam Result Details</DialogTitle>
              <DialogDescription>
                Complete information for {examResult.exam} ({examResult.year})
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="font-medium">Total Examinee:</span>{" "}
                  {examResult.totalExaminee}
                </div>
                <div>
                  <span className="font-medium">Passed:</span>{" "}
                  {examResult.totalPassed}
                </div>
                <div>
                  <span className="font-medium">Failed:</span>{" "}
                  {examResult.totalFailed}
                </div>
                <div>
                  <span className="font-medium">Pass %:</span>{" "}
                  {examResult.totalPassPercentage}%
                </div>
                <div>
                  <span className="font-medium">Fail %:</span>{" "}
                  {examResult.totalFailPercentage}%
                </div>
                <div>
                  <span className="font-medium">Pass (Male):</span>{" "}
                  {examResult.totalPassMale}
                </div>
                <div>
                  <span className="font-medium">Pass (Female):</span>{" "}
                  {examResult.totalPassFemale}
                </div>
                <div>
                  <span className="font-medium">A+:</span>{" "}
                  {examResult.totalAPlus}
                </div>
                <div>
                  <span className="font-medium">A:</span>{" "}
                  {examResult.totalAGrade}
                </div>
                <div>
                  <span className="font-medium">A-:</span>{" "}
                  {examResult.totalAMinus}
                </div>
                <div>
                  <span className="font-medium">B:</span> {examResult.totalB}
                </div>
                <div>
                  <span className="font-medium">C:</span> {examResult.totalC}
                </div>
                <div>
                  <span className="font-medium">D:</span> {examResult.totalD}
                </div>
              </div>

              <div className="border-t pt-4 text-xs text-muted-foreground">
                <div className="flex justify-between">
                  <span>Added:</span>
                  <span>
                    {new Date(examResult.createdAt || "").toLocaleDateString()}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Last Updated:</span>
                  <span>
                    {new Date(examResult.updatedAt || "").toLocaleDateString()}
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
    name: "year",
    label: "Year",
    type: "text",
    required: true,
    placeholder: "Enter exam year",
  },
  {
    name: "exam",
    label: "Exam",
    type: "text",
    required: true,
    placeholder: "Enter exam name",
  },
  {
    name: "totalExaminee",
    label: "Total Examinee",
    type: "text",
    required: true,
  },
  {
    name: "totalPassed",
    label: "Total Passed",
    type: "text",
    required: true,
  },
  {
    name: "totalFailed",
    label: "Total Failed",
    type: "text",
    required: true,
  },
  { name: "totalPassMale", label: "Pass Male", type: "text" },
  { name: "totalPassFemale", label: "Pass Female", type: "text" },
  { name: "totalAPlus", label: "A+", type: "text" },
  { name: "totalAGrade", label: "A", type: "text" },
  { name: "totalAMinus", label: "A-", type: "text" },
  { name: "totalB", label: "B", type: "text" },
  { name: "totalC", label: "C", type: "text" },
  { name: "totalD", label: "D", type: "text" },
];

interface ExamResultTableProps {
  data: IExamResult[];
  onAdd: (
    exam: Omit<IExamResult, "_id" | "createdAt" | "updatedAt">
  ) => Promise<void>;
  onEdit: (id: string, exam: Partial<IExamResult>) => Promise<void>;
  onDelete: (id: string) => Promise<void>;
}

export function ExamResultTable({
  data,
  onAdd,
  onEdit,
  onDelete,
}: ExamResultTableProps) {
  // Convert createdAt and updatedAt to Date objects for compatibility
  const normalizedData = data.map((item) => ({
    ...item,
    createdAt: item.createdAt ? new Date(item.createdAt) : undefined,
    updatedAt: item.updatedAt ? new Date(item.updatedAt) : undefined,
  }));

  return (
    <CrudDataTable
      data={normalizedData}
      columns={columns}
      onAdd={onAdd}
      onEdit={(id, item) => {
        // Convert Date fields back to string before passing to onEdit
        const convertedItem: Partial<IExamResult> = {
          ...item,
          createdAt:
            item.createdAt instanceof Date
              ? item.createdAt.toISOString()
              : item.createdAt,
          updatedAt:
            item.updatedAt instanceof Date
              ? item.updatedAt.toISOString()
              : item.updatedAt,
        };
        return onEdit(id, convertedItem);
      }}
      onDelete={onDelete}
      title="Exam Results"
      createFormFields={formFields}
      editFormFields={formFields}
    />
  );
}
