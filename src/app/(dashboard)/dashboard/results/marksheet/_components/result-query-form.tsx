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
    name: string;
    rollNumber: string;
    class: string;
  };
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

  const handlePrint = () => {
    window.print();
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
              </tr>
            </thead>
            <tbody>
              {results.map((r, index) => (
                <tr key={r._id} className="text-center print:text-black">
                  <td className="border px-4 py-2">{index + 1}</td>
                  <td className="border px-4 py-2">{r.student.name}</td>
                  <td className="border px-4 py-2">{r.student.rollNumber}</td>
                  <td className="border px-4 py-2">{r.student.class}</td>
                  <td className="border px-4 py-2">{r.gpa.toFixed(2)}</td>
                  <td className="border px-4 py-2">{r.overallGrade}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
