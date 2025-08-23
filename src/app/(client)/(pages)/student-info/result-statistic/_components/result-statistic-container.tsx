"use client";

import { DataTable } from "@/components/shared/data-table";
import { IExamResult } from "@/types/exam-results";

const ResultStatisticContainer = ({
  statistics,
}: {
  statistics: IExamResult[];
}) => {
  const columns = [
    {
      key: "year" as keyof IExamResult,
      header: "Year",
      render: (value: string, row: IExamResult) => (
        <span>
          {row.exam} {value}
        </span>
      ),
      sortable: true,
    },
    {
      key: "totalExaminee" as keyof IExamResult,
      header: "Total Examinee",
      sortable: false,
    },
    {
      key: "totalPassed" as keyof IExamResult,
      header: "Total Passed",
      sortable: false,
    },
    {
      key: "totalFailed" as keyof IExamResult,
      header: "Total Failed",
      sortable: false,
    },
    {
      key: "totalPassPercentage" as keyof IExamResult,
      header: "Pass %",
      render: (value: number) => `${value}%`,
      sortable: false,
    },
    {
      key: "totalFailPercentage" as keyof IExamResult,
      header: "Fail %",
      render: (value: number) => `${value}%`,
      sortable: false,
    },
    {
      key: "totalPassMale" as keyof IExamResult,
      header: "Passed Male",
      sortable: false,
    },
    {
      key: "totalPassFemale" as keyof IExamResult,
      header: "Passed Female",
      sortable: false,
    },
    {
      key: "totalAPlus" as keyof IExamResult,
      header: "A+",
      sortable: false,
    },
    {
      key: "totalAGrade" as keyof IExamResult,
      header: "A",
      sortable: false,
    },
    {
      key: "totalAMinus" as keyof IExamResult,
      header: "A-",
      sortable: false,
    },
    {
      key: "totalB" as keyof IExamResult,
      header: "B",
      sortable: false,
    },
    {
      key: "totalC" as keyof IExamResult,
      header: "C",
      sortable: false,
    },
    {
      key: "totalD" as keyof IExamResult,
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
