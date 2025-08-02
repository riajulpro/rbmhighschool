"use client";

import type { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, Eye, BookOpen } from "lucide-react";
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
import type { IResult, FormField } from "@/types/index";

const columns: ColumnDef<IResult>[] = [
  {
    accessorKey: "studentName",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Student Name
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => (
      <div className="font-medium">{row.getValue("studentName")}</div>
    ),
  },
  {
    accessorKey: "semester",
    header: "Semester",
    cell: ({ row }) => {
      const semester = row.getValue("semester") as string;
      return (
        <Badge variant="outline">
          {semester.replace(/([A-Z])/g, " $1").trim()}
        </Badge>
      );
    },
  },
  {
    accessorKey: "year",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Year
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => (
      <Badge variant="secondary">{row.getValue("year")}</Badge>
    ),
  },
  {
    accessorKey: "gpa",
    header: "GPA",
    cell: ({ row }) => (
      <div className="font-bold text-lg">{row.getValue("gpa")}</div>
    ),
  },
  {
    accessorKey: "overallGrade",
    header: "Overall Grade",
    cell: ({ row }) => (
      <Badge className="text-md font-semibold">
        {row.getValue("overallGrade")}
      </Badge>
    ),
  },
  {
    accessorKey: "createdAt",
    header: "Recorded On",
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
      const result = row.original;
      return (
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="ghost" size="sm">
              <Eye className="h-4 w-4" />
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-3xl">
            <DialogHeader>
              <DialogTitle>Result Details for {result.studentName}</DialogTitle>
              <DialogDescription>
                {result.semester.replace(/([A-Z])/g, " $1").trim()} -{" "}
                {result.year}
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-6 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h4 className="font-semibold mb-2">Overall Performance</h4>
                  <div className="space-y-2 text-sm">
                    <div>
                      <strong>GPA:</strong>{" "}
                      <span className="font-bold text-lg">{result.gpa}</span>
                    </div>
                    <div>
                      <strong>Overall Grade:</strong>{" "}
                      <Badge className="text-md font-semibold">
                        {result.overallGrade}
                      </Badge>
                    </div>
                    <div>
                      <strong>Semester:</strong>{" "}
                      {result.semester.replace(/([A-Z])/g, " $1").trim()}
                    </div>
                    <div>
                      <strong>Year:</strong> {result.year}
                    </div>
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Student Information</h4>
                  <div className="space-y-2 text-sm">
                    <div>
                      <strong>Student Name:</strong> {result.studentName}
                    </div>
                    <div>
                      <strong>Student ID:</strong> {result.studentId}
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="font-semibold mb-2 flex items-center gap-2">
                  <BookOpen className="h-4 w-4" /> Subject-wise Results
                </h4>
                {result.subjects && result.subjects.length > 0 ? (
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                      <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                          <th scope="col" className="px-4 py-2">
                            Subject
                          </th>
                          <th scope="col" className="px-4 py-2 text-center">
                            Marks
                          </th>
                          <th scope="col" className="px-4 py-2 text-center">
                            Grade
                          </th>
                          <th scope="col" className="px-4 py-2 text-center">
                            Point
                          </th>
                          <th scope="col" className="px-4 py-2">
                            Comments
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {result.subjects.map((sub, index) => (
                          <tr
                            key={index}
                            className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                          >
                            <td className="px-4 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                              {sub.subject}
                            </td>
                            <td className="px-4 py-2 text-center">
                              {sub.marks}
                            </td>
                            <td className="px-4 py-2 text-center">
                              {sub.grade || "N/A"}
                            </td>
                            <td className="px-4 py-2 text-center">
                              {sub.point || "N/A"}
                            </td>
                            <td className="px-4 py-2">
                              {sub.comments || "N/A"}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <p className="text-muted-foreground">
                    No subject results available.
                  </p>
                )}
              </div>

              <div className="border-t pt-4 space-y-2 text-xs text-muted-foreground">
                <div className="flex justify-between">
                  <span>Recorded:</span>
                  <span>
                    {new Date(result.createdAt || "").toLocaleDateString()}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Last Updated:</span>
                  <span>
                    {new Date(result.updatedAt || "").toLocaleDateString()}
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
    name: "studentId",
    label: "Student ID",
    type: "text",
    required: true,
    placeholder: "Enter student's MongoDB ID",
  },
  {
    name: "studentName",
    label: "Student Name",
    type: "text",
    required: true,
    placeholder: "Enter student's name (for display)",
  },
  {
    name: "semester",
    label: "Semester",
    type: "select",
    required: true,
    options: [
      { value: "FirstSemester", label: "First Semester" },
      { value: "MidTerm", label: "Mid Term" },
      { value: "Annual", label: "Annual" },
    ],
  },
  {
    name: "year",
    label: "Year",
    type: "text",
    required: true,
    placeholder: "e.g., 2024",
  },
  {
    name: "gpa",
    label: "GPA",
    type: "text",
    required: true,
    placeholder: "e.g., 4.00",
  },
  {
    name: "overallGrade",
    label: "Overall Grade",
    type: "text",
    required: true,
    placeholder: "e.g., A+, A, B",
  },
  {
    name: "subjects",
    label: "Subjects",
    type: "subject-list", // New type for dynamic subject inputs
    subjectFields: [
      {
        name: "subject",
        label: "Subject Name",
        type: "text",
        placeholder: "e.g., Math",
      },
      { name: "marks", label: "Marks", type: "text", placeholder: "e.g., 90" },
      { name: "grade", label: "Grade", type: "text", placeholder: "e.g., A+" },
      { name: "point", label: "Point", type: "text", placeholder: "e.g., 4.0" },
      {
        name: "comments",
        label: "Comments",
        type: "textarea",
        placeholder: "Optional comments",
      },
    ],
    defaultValue: (item: IResult) => item.subjects || [], // Initialize with existing subjects
  },
];

interface ResultTableProps {
  data: IResult[];
  onAdd: (
    result: Omit<IResult, "_id" | "createdAt" | "updatedAt">
  ) => Promise<void>;
  onEdit: (id: string, result: Partial<IResult>) => Promise<void>;
  onDelete: (id: string) => Promise<void>;
}

export function ResultTable({
  data,
  onAdd,
  onEdit,
  onDelete,
}: ResultTableProps) {
  // Helper to ensure numeric fields are numbers
  const transformResultData = (
    resultData: Partial<IResult>
  ): Partial<IResult> => {
    return {
      ...resultData,
      gpa: resultData.gpa ? Number(resultData.gpa) : undefined,
      year: resultData.year ? Number(resultData.year) : undefined,
      subjects: resultData.subjects?.map((sub) => ({
        ...sub,
        marks: Number(sub.marks),
        point: sub.point ? Number(sub.point) : undefined,
      })),
    };
  };

  const handleAddTransformed = async (
    resultData: Omit<IResult, "_id" | "createdAt" | "updatedAt">
  ) => {
    await onAdd(
      transformResultData(resultData) as Omit<
        IResult,
        "_id" | "createdAt" | "updatedAt"
      >
    );
  };

  const handleEditTransformed = async (
    id: string,
    resultData: Partial<IResult>
  ) => {
    await onEdit(id, transformResultData(resultData));
  };

  return (
    <CrudDataTable
      data={data}
      columns={columns}
      onAdd={handleAddTransformed}
      onEdit={handleEditTransformed}
      onDelete={onDelete}
      title="Results"
      createFormFields={formFields}
      editFormFields={formFields}
    />
  );
}
