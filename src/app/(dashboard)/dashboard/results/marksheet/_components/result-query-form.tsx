/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Atom } from "lucide-react";
import { cn } from "@/lib/utils";
import axiosInstance from "@/lib/axios";

type Result = {
  _id: string;
  student: {
    studentName: string;
    rollNumber: string;
    class: string;
  };
  subjects: Array<{
    subject: string;
    marks: {
      written: {
        score: number;
        outOf: number;
      };
      mcq?: {
        score: number;
        outOf: number;
      };
      total?: number;
    };
    grade?: string;
    point?: number;
    comments?: string;
  }>;
  gpa: number;
  overallGrade: string;
};

export default function ResultQueryForm() {
  const [studentClass, setStudentClass] = useState("");
  const [session, setSession] = useState("");
  const [semester, setSemester] = useState("");
  const [results, setResults] = useState<Result[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const classes: { label: string; value: string }[] = [
    { label: "Six", value: "6" },
    { label: "Seven", value: "7" },
    { label: "Eight", value: "8" },
    { label: "Nine", value: "9" },
    { label: "Ten", value: "10" },
  ];

  const sessions: { label: string; value: string }[] = [
    { label: "2025", value: "2025" },
    { label: "2024", value: "2024" },
    { label: "2023", value: "2023" },
    { label: "2022", value: "2022" },
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await axiosInstance.post("/api/results/marksheet", {
        class: studentClass,
        session,
        semester,
      });

      setResults(res.data.results);
    } catch (err: any) {
      console.error(err);
      setError(err.response?.data?.message || "Failed to fetch results");
    } finally {
      setLoading(false);
    }
  };

  const getFailedSubjectCount = (result: Result): number => {
    return result.subjects.filter((subject) => {
      const totalMarks =
        subject.marks.total ||
        subject.marks.written.score + (subject.marks.mcq?.score || 0);
      return totalMarks < 33; // Assuming 33% is pass mark
    }).length;
  };

  const examSemesters: { [key: string]: string } = {
    FirstSemester: "প্রথম সাময়িক",
    MidTerm: "অর্ধবার্ষিক",
    Annual: "বার্ষিক",
  };

  const banglaOrdinals: { [key: string]: string } = {
    6: "ষষ্ঠ",
    7: "সপ্তম",
    8: "অষ্টম",
    9: "নবম",
    10: "দশম",
  };

  const handlePrint = () => {
    const printWindow = window.open("", "_blank");
    if (!printWindow) return;

    const currentDate = new Date().toLocaleDateString();

    const htmlContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <title>শ্রেণী ${studentClass} ${
      examSemesters[semester]
    } পরিক্ষার ফলাফল - ${session}</title>
        <style>
          body {
            font-family: Arial, sans-serif;
            margin: 20px;
            font-size: 12px;
            line-height: 1.4;
          }
          .header {
            text-align: center;
            margin-bottom: 30px;
            border-bottom: 2px solid #333;
            padding-bottom: 20px;
          }
          .header h1 {
            margin: 0;
            font-size: 24px;
            color: #333;
          }
          .header h2 {
            margin: 5px 0;
            font-size: 18px;
            color: #666;
          }
          .info {
            margin-bottom: 20px;
            display: flex;
            justify-content: space-between;
            align-items: center;
          }
          .info-left {
            font-weight: bold;
          }
          .info-right {
            text-align: right;
            color: #666;
          }
          table {
            width: 100%;
            border-collapse: collapse;
            margin-bottom: 30px;
          }
          th, td {
            border: 1px solid #333;
            padding: 8px;
            text-align: center;
          }
          th {
            background-color: #f0f0f0;
            font-weight: bold;
          }
          .rank-col { width: 8%; }
          .roll-col { width: 12%; }
          .name-col { width: 25%; }
          .class-col { width: 10%; }
          .gpa-col { width: 12%; }
          .grade-col { width: 15%; }
          .failed-col { width: 18%; }
          .failed-subjects {
            color: #d32f2f;
            font-weight: bold;
          }
          .no-failed {
            color: #388e3c;
            font-weight: bold;
          }
          .footer {
            margin-top: 30px;
            text-align: center;
            font-size: 10px;
            color: #666;
            border-top: 1px solid #ccc;
            padding-top: 15px;
          }
          .grade-a { background-color: #e8f5e8; }
          .grade-b { background-color: #fff3e0; }
          .grade-c { background-color: #fff8e1; }
          .grade-d { background-color: #ffebee; }
          .grade-f { background-color: #ffebee; color: #d32f2f; }
          @media print {
            body { margin: 0; }
            .header { page-break-after: avoid; }
          }
        </style>
      </head>
      <body>
        <div class="header">
          <h1>রামপুর বাজার মজিদিয়া উচ্চ বিদ্যালয়</h1>
          <h2>শ্রেণী ${banglaOrdinals[studentClass]} | ${
      examSemesters[semester]
    } পরিক্ষার ফলাফল - ${session}</h2>
        </div>
        
        <div class="info">
          <div class="info-left">
            Total Students: ${results.length}
          </div>
          <div class="info-right">
            Generated on: ${currentDate}
          </div>
        </div>
        
        <table>
          <thead>
            <tr>
              <th class="rank-col">Rank</th>
              <th class="roll-col">Roll Number</th>
              <th class="name-col">Student Name</th>
              <th class="class-col">Class</th>
              <th class="gpa-col">GPA</th>
              <th class="grade-col">Overall Grade</th>
              <th class="failed-col">Failed Subjects</th>
            </tr>
          </thead>
          <tbody>
            ${results
              .map((result, index) => {
                const failedCount = getFailedSubjectCount(result);
                const gradeClass = `grade-${result.overallGrade.toLowerCase()}`;

                return `
                <tr class="${gradeClass}">
                  <td class="rank-col">${index + 1}</td>
                  <td class="roll-col">${result.student.rollNumber}</td>
                  <td class="name-col">${result.student.studentName}</td>
                  <td class="class-col">${result.student.class}</td>
                  <td class="gpa-col">${result.gpa.toFixed(2)}</td>
                  <td class="grade-col">${result.overallGrade}</td>
                  <td class="failed-col">
                    ${
                      failedCount > 0
                        ? `<span class="failed-subjects">${failedCount} Subject${
                            failedCount > 1 ? "s" : ""
                          }</span>`
                        : `<span class="no-failed">No Failures</span>`
                    }
                  </td>
                </tr>
              `;
              })
              .join("")}
          </tbody>
        </table>
        
        <div class="footer">
          <p><strong>Note:</strong> Failed subjects are determined based on marks below 33%. This report was generated automatically.</p>
          <p>© Academic Management System - ${new Date().getFullYear()}</p>
        </div>
      </body>
      </html>
    `;

    printWindow.document.write(htmlContent);
    printWindow.document.close();

    // Wait for content to load then print
    setTimeout(() => {
      printWindow.print();
      printWindow.close();
    }, 500);
  };

  return (
    <div className="mt-5 max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">
        Get Marksheet of Specific Class
      </h2>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col md:flex-row gap-4 items-center"
      >
        <Select onValueChange={setStudentClass} required>
          <SelectTrigger>
            <SelectValue placeholder="Class" />
          </SelectTrigger>
          <SelectContent>
            {classes.map((cls) => (
              <SelectItem key={cls.value} value={cls.value}>
                {cls.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select onValueChange={setSession} required>
          <SelectTrigger>
            <SelectValue placeholder="Session" />
          </SelectTrigger>
          <SelectContent>
            {sessions.map((sess) => (
              <SelectItem key={sess.value} value={sess.value}>
                {sess.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select onValueChange={setSemester} required>
          <SelectTrigger>
            <SelectValue placeholder="Semester" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="FirstSemester">First Semester</SelectItem>
            <SelectItem value="MidTerm">Mid Term</SelectItem>
            <SelectItem value="Annual">Annual</SelectItem>
          </SelectContent>
        </Select>

        <Button type="submit" className="cursor-pointer" disabled={loading}>
          <Atom className={cn(loading && "animate-spin")} />{" "}
          {loading ? "Generating..." : "Generate Results"}
        </Button>
      </form>

      {error && <p className="text-red-500 mt-4">{error}</p>}

      {results.length > 0 && (
        <div className="mt-6 overflow-x-auto">
          <Button onClick={handlePrint} className="mb-4">
            Print Results
          </Button>
          <table className="table-auto w-full border-collapse border border-gray-300 print:border-none print:w-full print:text-sm">
            <thead className="print:bg-white">
              <tr className="bg-gray-100 print:bg-white">
                <th className="border px-4 py-2">Rank</th>
                <th className="border px-4 py-2">Name</th>
                <th className="border px-4 py-2">Roll</th>
                <th className="border px-4 py-2">Class</th>
                <th className="border px-4 py-2">GPA</th>
                <th className="border px-4 py-2">Overall Grade</th>
                <th className="border px-4 py-2">Failed Subjects</th>
              </tr>
            </thead>
            <tbody>
              {results.map((result, index) => {
                const failedCount = getFailedSubjectCount(result);
                return (
                  <tr key={result._id} className="text-center print:text-black">
                    <td className="border px-4 py-2">{index + 1}</td>
                    <td className="border px-4 py-2">
                      {result.student.studentName}
                    </td>
                    <td className="border px-4 py-2">
                      {result.student.rollNumber}
                    </td>
                    <td className="border px-4 py-2">{result.student.class}</td>
                    <td className="border px-4 py-2">
                      {result.gpa.toFixed(2)}
                    </td>
                    <td className="border px-4 py-2">{result.overallGrade}</td>
                    <td className="border px-4 py-2">
                      {failedCount > 0 ? (
                        <span className="text-red-600 font-semibold">
                          {failedCount} Subject{failedCount > 1 ? "s" : ""}
                        </span>
                      ) : (
                        <span className="text-green-600 font-semibold">
                          No Failures
                        </span>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
