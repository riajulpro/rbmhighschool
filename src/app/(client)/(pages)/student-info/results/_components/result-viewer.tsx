"use client";

import type React from "react";
import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ResultData } from "@/lib/result-action";
import { toast } from "sonner";

export function ResultViewer() {
  const [studentClass, setStudentClass] = useState("");
  const [session, setSession] = useState("");
  const [rollNumber, setRollNumber] = useState("");
  const [semester, setSemester] = useState("");

  const [isPending, setIsPending] = useState(false);

  const [result, setResult] = useState<ResultData | null>(null);
  const printRef = useRef<HTMLDivElement>(null);

  const handlePrint = () => {
    if (printRef.current) {
      const printWindow = window.open("", "_blank");

      if (printWindow) {
        printWindow.document.write(`
          <html>
            <head>
              <title>Student Result</title>
              <style>
                body { font-family: sans-serif; margin: 20px; color: #333; }
                .print-container { width: 100%; max-width: 800px; margin: 0 auto; padding: 20px; border: 1px solid #eee; box-shadow: 0 0 10px rgba(0,0,0,0.1); }
                h1, h2, h3 { text-align: center; margin-bottom: 20px; color: #000; }
                .student-info p { margin: 5px 0; line-height: 1.5; }
                .student-info strong { color: #555; }
                .result-table { width: 100%; border-collapse: collapse; margin-top: 20px; }
                .result-table th, .result-table td { border: 1px solid #ddd; padding: 10px; text-align: left; }
                .result-table th { background-color: #f2f2f2; font-weight: bold; color: #333; }
                .result-table tr:nth-child(even) { background-color: #f9f9f9; }
                .text-green-600 { color: #22c55e; }
                .text-blue-600 { color: #3b82f6; }
                @media print {
                  body { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
                  .no-print { display: none; }
                }
              </style>
            </head>
            <body>
              <div class="print-container">
                ${printRef.current.innerHTML}
              </div>
            </body>
          </html>
        `);
        printWindow.document.close();
        printWindow.focus();
        printWindow.print();
        printWindow.close();
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setResult(null);
    setIsPending(true);

    const payload = {
      class: studentClass,
      session,
      rollNumber,
      semester,
    };

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/results/by-info`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        }
      );
      const data = await response.json();

      if (data.results) {
        setIsPending(false);
        setResult(data.results[0]);
        toast.success("Resutl succesfully retrieved!");
      } else {
        toast.error(data.message || "Result not found");
      }

      // setResult(response.data);
    } catch (error) {
      console.log(error);
      setIsPending(false);
    } finally {
      setIsPending(false);
    }
  };

  const sessions = ["2025", "2024", "2023", "2022", "2021"];
  const classes = ["6", "7", "8", "9", "10"];
  const semesters = ["FirstSemester", "MidTerm", "Annual"];

  return (
    <Card className="w-full max-w-3xl mx-auto shadow-lg">
      <CardHeader>
        <CardTitle className="text-3xl font-bold text-center">
          Student Result Viewer
        </CardTitle>
        <CardDescription className="text-center">
          Enter student details to view and print their academic results.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6"
        >
          <div className="grid gap-2">
            <Label htmlFor="session">Session</Label>
            <Select value={session} onValueChange={setSession} required>
              <SelectTrigger id="session">
                <SelectValue placeholder="Select Session" />
              </SelectTrigger>
              <SelectContent>
                {sessions.map((sess) => (
                  <SelectItem key={sess} value={sess}>
                    {sess}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="session">Semester</Label>
            <Select value={semester} onValueChange={setSemester} required>
              <SelectTrigger id="session">
                <SelectValue placeholder="Select Semester" />
              </SelectTrigger>
              <SelectContent>
                {semesters.map((sess) => (
                  <SelectItem key={sess} value={sess}>
                    {sess}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="class">Class</Label>
            <Select
              value={studentClass}
              onValueChange={setStudentClass}
              required
            >
              <SelectTrigger id="class">
                <SelectValue placeholder="Select Class" />
              </SelectTrigger>
              <SelectContent>
                {classes.map((cls) => (
                  <SelectItem key={cls} value={cls}>
                    {`Class ${cls}`}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="rollNumber">Roll Number</Label>
            <Input
              id="rollNumber"
              type="text"
              placeholder="e.g., 12345"
              value={rollNumber}
              onChange={(e) => setRollNumber(e.target.value)}
              required
            />
          </div>
          <div className="md:col-span-3 flex justify-center mt-4">
            <Button
              type="submit"
              className="w-full md:w-auto px-8 py-2"
              disabled={isPending}
            >
              {isPending ? "Fetching..." : "View Result"}
            </Button>
          </div>
        </form>
        {result && (
          <div
            ref={printRef}
            className="mt-8 p-6 border rounded-lg bg-white dark:bg-gray-800 shadow-sm"
          >
            <h2 className="text-2xl font-bold text-center mb-6 text-gray-900 dark:text-gray-50">
              Student Academic Result
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-gray-700 dark:text-gray-300 student-info">
              <p>
                <strong>Student Name:</strong>{" "}
                {result.student.studentName || "N/A"}
              </p>
              <div className="flex items-center gap-2">
                <p>
                  <strong>Father Name:</strong>{" "}
                  {result.student.fatherName || "N/A"}
                </p>
                <p>
                  <strong>Mother Name:</strong>{" "}
                  {result.student.motherName || "N/A"}
                </p>
              </div>
              <p>
                <strong>Class:</strong> {result.student.class || "N/A"}
              </p>
              <p>
                <strong>Session:</strong> {result.student.session || "N/A"}
              </p>
              <p>
                <strong>Roll Number:</strong>{" "}
                {result.student.rollNumber || "N/A"}
              </p>
              <p>
                <strong>Semester:</strong> {result.semester}
              </p>
              <p>
                <strong>Year:</strong> {result.year}
              </p>
              <p className="md:col-span-2 text-lg font-semibold">
                <strong>Overall GPA:</strong>{" "}
                <span className="text-green-600 dark:text-green-400">
                  {result.gpa.toFixed(2)}
                </span>
              </p>
              <p className="md Rosuvastatinmd:col-span-2 text-lg font-semibold">
                <strong>Overall Grade:</strong>{" "}
                <span className="text-blue-600 dark:text-blue-400">
                  {result.overallGrade}
                </span>
              </p>
            </div>
            <h3 className="text-xl font-bold mt-8 mb-4 text-gray-900 dark:text-gray-50">
              Subject-wise Results
            </h3>
            <div className="overflow-x-auto">
              <Table className="result-table">
                <TableHeader>
                  <TableRow>
                    <TableHead>Subject</TableHead>
                    <TableHead>Marks</TableHead>
                    <TableHead>Grade</TableHead>
                    <TableHead>Point</TableHead>
                    <TableHead>Comments</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {result.subjects.map((subject, index) => (
                    <TableRow key={index}>
                      <TableCell className="font-medium">
                        {subject.subject}
                      </TableCell>
                      <TableCell>{subject.marks}</TableCell>
                      <TableCell>{subject.grade || "N/A"}</TableCell>
                      <TableCell>{subject.point || "N/A"}</TableCell>
                      <TableCell>{subject.comments || "N/A"}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>
        )}
      </CardContent>
      {result && (
        <CardFooter className="flex justify-end no-print">
          <Button onClick={handlePrint} className="px-6 py-2">
            Print Result
          </Button>
        </CardFooter>
      )}
    </Card>
  );
}
