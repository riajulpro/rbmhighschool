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

export type ResultType = {
  _id: string;
  student: {
    _id: string;
    studentName: string;
    fatherName: string;
    motherName: string;
    class: string;
    section: string;
    session: string;
    rollNumber: string;
    gender: "male" | "female" | "other";
    dob: string; // ISO date string
    guardianName: string;
    guardianPhone: string;
    address: string;
    createdAt: string;
    updatedAt: string;
    __v: number;
  };
  semester: "FirstSemester" | "MidTerm" | "Annual" | string;
  year: number;
  subjects: {
    subject: string;
    marks: number;
    grade: string;
    point: number;
    _id: string;
  }[];
  gpa: number;
  overallGrade: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
};

const allSubjectsList = [
  // Common Core Subjects
  { label: "Bangla (First Paper)", value: "Bangla First Paper" },
  { label: "Bangla (Second Paper)", value: "Bangla Second Paper" },
  { label: "English (First Paper)", value: "English First Paper" },
  { label: "English (Second Paper)", value: "English Second Paper" },
  { label: "Mathematics", value: "Mathematics" },
  {
    label: "Social Science",
    value: "Social Science",
  },
  {
    label: "Bangladesh and Global Studies",
    value: "Bangladesh and Global Studies",
  },
  { label: "General Science (SSC)", value: "General Science SSC" },
  {
    label: "Islamic Studies",
    value: "Islamic Studies",
  },
  {
    label: "Religious Education",
    value: "Religious Education",
  },
  {
    label: "Physical Education and Health",
    value: "Physical Education and Health",
  },
  {
    label: "Information and Communication Technology (ICT)",
    value: "Information and Communication Technology",
  },

  // Science Stream (HSC)
  { label: "Physics", value: "Physics" },
  { label: "Chemistry", value: "Chemistry" },
  { label: "Biology", value: "Biology" },
  { label: "Higher Mathematics", value: "Higher Mathematics" },

  // Humanities/Arts Stream
  { label: "Economics", value: "Economics" },
  { label: "Civics", value: "Civics" },
  { label: "History", value: "History" },
  { label: "Geography", value: "Geography" },
  { label: "Sociology", value: "Sociology" },
  { label: "Fine Arts", value: "Fine Arts" },
  { label: "Music", value: "Music" },

  // Business Studies Stream
  { label: "Accounting", value: "Accounting" },
  { label: "Finance", value: "Finance" },
  { label: "Marketing", value: "Marketing" },
  { label: "Business Organization", value: "Business Organization" },

  // Optional Subject
  { label: "Optional Subject", value: "Optional Subject" },
];

const columns: ColumnDef<ResultType>[] = [
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
      return (
        <div className="font-medium">{row.original.student.studentName}</div>
      );
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
          <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>
                Result Details for {result.student.studentName}
              </DialogTitle>
              <DialogDescription>
                {result.semester.replace(/([A-Z])/g, " $1").trim()} -{" "}
                {result.year}
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-2">
              <h3 className="text-lg font-semibold">Student Information</h3>
              <ul className="grid grid-cols-2 gap-4 text-sm">
                <li>
                  <strong>Student Name:</strong> {result.student.studentName}
                </li>
                <li>
                  <strong>{`Father's Name:`}</strong>{" "}
                  {result.student.fatherName}
                </li>
                <li>
                  <strong>{`Mother's Name:`}</strong>{" "}
                  {result.student.motherName}
                </li>
                <li>
                  <strong>Class:</strong> {result.student.class}
                </li>
                <li>
                  <strong>Section:</strong> {result.student.section}
                </li>
                <li>
                  <strong>Session:</strong> {result.student.session}
                </li>
                <li>
                  <strong>Roll No:</strong> {result.student.rollNumber}
                </li>
                <li>
                  <strong>Gender:</strong> {result.student.gender}
                </li>
                <li>
                  <strong>Date of Birth:</strong>{" "}
                  {new Date(result.student.dob).toLocaleDateString()}
                </li>
                <li>
                  <strong>Guardian:</strong> {result.student.guardianName}
                </li>
                <li>
                  <strong>Guardian Phone:</strong>{" "}
                  {result.student.guardianPhone}
                </li>
                <li>
                  <strong>Address:</strong> {result.student.address}
                </li>
              </ul>

              <h3 className="text-lg font-semibold pt-4">Subject Results</h3>
              <table className="w-full text-sm border">
                <thead>
                  <tr className="bg-gray-100 text-left">
                    <th className="border px-2 py-1">Subject</th>
                    <th className="border px-2 py-1">Marks</th>
                    <th className="border px-2 py-1">Grade</th>
                    <th className="border px-2 py-1">Point</th>
                  </tr>
                </thead>
                <tbody>
                  {result.subjects.map((subject: any) => (
                    <tr key={subject._id}>
                      <td className="border px-2 py-1">{subject.subject}</td>
                      <td className="border px-2 py-1">{subject.marks}</td>
                      <td className="border px-2 py-1">{subject.grade}</td>
                      <td className="border px-2 py-1">{subject.point}</td>
                    </tr>
                  ))}
                </tbody>
              </table>

              <div className="pt-4 text-sm">
                <p>
                  <strong>GPA:</strong> {result.gpa}
                </p>
                <p>
                  <strong>Overall Grade:</strong> {result.overallGrade}
                </p>
              </div>
            </div>
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
            `/api/students/select?session=${session}&class=${className}`
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
          {
            name: "subject",
            label: "Subject",
            type: "select",
            options: allSubjectsList,
          },
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
