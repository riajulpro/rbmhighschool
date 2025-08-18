"use client";

import { DataTable } from "@/components/shared/data-table";

interface ExamResult {
  year: string;
  exam: string;
  totalExaminee: number;
  totalPassed: number;
  totalFailed: number;
  totalPassPercentage: number;
  totalFailPercentage: number;
  totalPassMale: number;
  totalPassFemale: number;
  totalAPlus: number;
  totalAGrade: number;
  totalAMinus: number;
  totalB: number;
  totalC: number;
  totalD: number;
}

const ResultStatisticContainer = ({
  statistics,
}: {
  statistics: ExamResult[];
}) => {
  const columns = [
    {
      key: "year" as keyof ExamResult,
      header: "Year",
      render: (value: string, row: ExamResult) => (
        <span>
          {row.exam} {value}
        </span>
      ),
      sortable: true,
    },
    {
      key: "totalExaminee" as keyof ExamResult,
      header: "Total Examinee",
      sortable: false,
    },
    {
      key: "totalPassed" as keyof ExamResult,
      header: "Total Passed",
      sortable: false,
    },
    {
      key: "totalFailed" as keyof ExamResult,
      header: "Total Failed",
      sortable: false,
    },
    {
      key: "totalPassPercentage" as keyof ExamResult,
      header: "Pass %",
      render: (value: number) => `${value}%`,
      sortable: false,
    },
    {
      key: "totalFailPercentage" as keyof ExamResult,
      header: "Fail %",
      render: (value: number) => `${value}%`,
      sortable: false,
    },
    {
      key: "totalPassMale" as keyof ExamResult,
      header: "Passed Male",
      sortable: false,
    },
    {
      key: "totalPassFemale" as keyof ExamResult,
      header: "Passed Female",
      sortable: false,
    },
    {
      key: "totalAPlus" as keyof ExamResult,
      header: "A+",
      sortable: false,
    },
    {
      key: "totalAGrade" as keyof ExamResult,
      header: "A",
      sortable: false,
    },
    {
      key: "totalAMinus" as keyof ExamResult,
      header: "A-",
      sortable: false,
    },
    {
      key: "totalB" as keyof ExamResult,
      header: "B",
      sortable: false,
    },
    {
      key: "totalC" as keyof ExamResult,
      header: "C",
      sortable: false,
    },
    {
      key: "totalD" as keyof ExamResult,
      header: "D",
      sortable: false,
    },
  ];

  return (
    <div>
      <DataTable searchable={false} data={statistics} columns={columns} />
    </div>
  );
};

export default ResultStatisticContainer;
