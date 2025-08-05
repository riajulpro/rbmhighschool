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
import axios from "axios";

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

function useResultFormFields(setFormData: (data: Record<string, any>) => void) {
  const [session, setSession] = useState("2025");
  const [className, setClassName] = useState("10");
  const [students, setStudents] = useState<{ label: string; value: string }[]>(
    []
  );
  const [loading, setLoading] = useState(false);
  const [selectedStudentId, setSelectedStudentId] = useState("");
  const [studentNameMap, setStudentNameMap] = useState<Record<string, string>>(
    {}
  );

  useEffect(() => {
    const fetchStudents = async () => {
      if (!session || !className) {
        console.log("Resetting students: session or className empty", {
          session,
          className,
        });
        setStudents([]);
        setStudentNameMap({});
        setSelectedStudentId("");
        setFormData((prev: any) => ({
          ...prev,
          session: "",
          class: "",
          studentId: "",
          studentName: "",
        }));
        return;
      }

      try {
        setLoading(true);
        console.log("Fetching students for:", { session, className });
        const res = await axios.get(
          `https://rbmhighschool-server.onrender.com/api/students/select?session=${session}&class=${className}`
        );
        console.log("API response:", res.data);

        const options = res.data.students.map(
          (s: { _id: string; studentName: string }) => ({
            label: s.studentName,
            value: s._id,
          })
        );

        const nameMap: Record<string, string> = {};
        res.data.students.forEach((s: { _id: string; studentName: string }) => {
          nameMap[s._id] = s.studentName;
        });

        console.log("Setting students and nameMap:", { options, nameMap });
        setStudentNameMap(nameMap);
        setStudents(options);
        setSelectedStudentId("");
        setFormData((prev: any) => ({
          ...prev,
          studentId: "",
          studentName: "",
        }));
      } catch (error) {
        console.error("Failed to fetch students:", error);
        setStudents([]);
        setStudentNameMap({});
        setSelectedStudentId("");
        setFormData((prev: any) => ({
          ...prev,
          studentId: "",
          studentName: "",
        }));
      } finally {
        setLoading(false);
        console.log("Fetch complete, loading:", false);
      }
    };

    fetchStudents();
  }, [session, className, setFormData]);

  useEffect(() => {
    console.log("Selected student changed:", {
      selectedStudentId,
      studentName: studentNameMap[selectedStudentId],
    });
    if (selectedStudentId && studentNameMap[selectedStudentId]) {
      setFormData((prev: any) => ({
        ...prev,
        studentId: selectedStudentId,
        studentName: studentNameMap[selectedStudentId],
      }));
    } else {
      setFormData((prev: any) => ({
        ...prev,
        studentId: "",
        studentName: "",
      }));
    }
  }, [selectedStudentId, studentNameMap, setFormData]);

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
        onChange: (val: string) => {
          console.log("Session changed:", val);
          setSession(val);
          setFormData((prev: any) => ({ ...prev, session: val, year: val }));
        },
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
        onChange: (val: string) => {
          console.log("Class changed:", val);
          setClassName(val);
          setFormData((prev: any) => ({ ...prev, class: val }));
        },
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
        onChange: (val: string) => {
          console.log("Student selected:", val);
          setSelectedStudentId(val);
        },
        key: `student-select-${students.length}-${session}-${className}`,
      },
      {
        name: "studentName",
        label: "Student Name",
        type: "text",
        required: true,
        placeholder: "Auto-filled after selecting student",
        value: selectedStudentId ? studentNameMap[selectedStudentId] || "" : "",
        disabled: true,
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
        value: session,
        placeholder: "e.g., 2024",
        disabled: true,
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
        type: "subject-list",
        subjectFields: [
          { name: "subject", label: "Subject", type: "text" },
          { name: "marks", label: "Marks", type: "text" },
          { name: "grade", label: "Grade", type: "text" },
          { name: "point", label: "Point", type: "text" },
          { name: "comments", label: "Comments", type: "textarea" },
        ],
        defaultValue: (item: IResult) => item.subjects || [],
      },
    ],
    [
      session,
      className,
      students,
      loading,
      selectedStudentId,
      studentNameMap,
      setFormData,
    ]
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
  const [formData, setFormData] = useState<Record<string, any>>({});
  const formFields = useResultFormFields(setFormData);

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

  console.log("Current formData:", formData);

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
