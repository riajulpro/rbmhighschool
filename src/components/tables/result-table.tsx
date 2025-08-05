/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import type { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, Eye } from "lucide-react";
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
import { useEffect, useState, useMemo } from "react";
import axiosInstance from "@/lib/axios";

const columns: ColumnDef<IResult>[] = [
  {
    accessorKey: "studentName",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Student Name
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => {
      const student: { studentName: string } = row.getValue("student");
      return <div className="font-medium">{student.studentName}</div>;
    },
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
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Year
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
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
            {/* Details content omitted for brevity */}
          </DialogContent>
        </Dialog>
      );
    },
  },
];

function useResultFormFields() {
  const [session, setSession] = useState("2025");
  const [className, setClassName] = useState("10");
  const [students, setStudents] = useState<{ label: string; value: string }[]>(
    []
  );
  const [loading, setLoading] = useState(false);
  const [selectedStudentId, setSelectedStudentId] = useState("");

  useEffect(() => {
    const fetchStudents = async () => {
      if (session && className) {
        try {
          setLoading(true);

          const { data } = await axiosInstance.get(
            `https://rbmhighschool-server.onrender.com/api/students/select?session=${session}&class=${className}`
          );

          const options = data.students.map((s: any) => ({
            label: s.studentName,
            value: s._id,
          }));

          const nameMap: Record<string, string> = {};
          data.students.forEach((s: any) => {
            nameMap[s._id] = s.studentName;
          });

          setStudents(options);
          setSelectedStudentId("");
        } catch (error) {
          console.error("Failed to fetch students:", error);
          setStudents([]);
          setSelectedStudentId("");
        } finally {
          setLoading(false);
        }
      } else {
        setStudents([]);
        setSelectedStudentId("");
      }
    };

    fetchStudents();
  }, [session, className]);

  const formFields: FormField[] = useMemo(
    () => [
      {
        name: "session",
        label: "Session",
        type: "select",
        options: [
          { label: "2023", value: "2023" },
          { label: "2024", value: "2024" },
          { label: "2025", value: "2025" },
        ],
        value: session,
        onChange: (val: string) => setSession(val),
      },
      {
        name: "class",
        label: "Class",
        type: "select",
        options: [
          { label: "6", value: "6" },
          { label: "7", value: "7" },
          { label: "8", value: "8" },
          { label: "9", value: "9" },
          { label: "10", value: "10" },
        ],
        value: className,
        onChange: (val: string) => setClassName(val),
      },
      {
        name: "studentId",
        label: "Student",
        type: "select",
        options: students,
        placeholder: loading
          ? "Loading students..."
          : session && className
          ? "Select student"
          : "Select session and class first",
        disabled: loading || students.length === 0,
        value: selectedStudentId,
        onChange: (val: string) => setSelectedStudentId(val),
        key: students.length,
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
        name: "subjects",
        label: "Subjects",
        type: "subject-list",
        subjectFields: [
          { name: "subject", label: "Subject", type: "text" },
          { name: "marks", label: "Marks", type: "text" },
          { name: "comments", label: "Comments", type: "textarea" },
        ],
        defaultValue: (item: IResult) => item.subjects || [],
      },
    ],
    [className, loading, selectedStudentId, session, students]
  );

  return formFields;
}

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
  const formFields = useResultFormFields();

  const transformResultData = (
    resultData: Partial<IResult>
  ): Partial<IResult> => ({
    ...resultData,
    gpa: resultData.gpa ? Number(resultData.gpa) : undefined,
    year: resultData.year ? Number(resultData.year) : undefined,
    subjects: resultData.subjects?.map((sub) => ({
      ...sub,
      marks: Number(sub.marks),
      point: sub.point ? Number(sub.point) : undefined,
    })),
  });

  return (
    <CrudDataTable
      data={data}
      columns={columns}
      onAdd={async (result) =>
        onAdd(
          transformResultData(result) as Omit<
            IResult,
            "_id" | "createdAt" | "updatedAt"
          >
        )
      }
      onEdit={async (id, result) => onEdit(id, transformResultData(result))}
      onDelete={onDelete}
      title="Results"
      createFormFields={formFields}
      editFormFields={formFields}
    />
  );
}
