"use client";

import { DataTable } from "@/components/shared/data-table";
import { ClassGenderStats } from "@/types/studentCounts";

const StudentsInfoContainer = ({ stats }: { stats: ClassGenderStats[] }) => {
  const columns = [
    {
      key: "class" as keyof ClassGenderStats,
      header: "শ্রেণী",
      render: (value: string) => <span>Class {value}</span>,
      sortable: true,
    },
    {
      key: "male" as keyof ClassGenderStats,
      header: "ছাত্র",
      sortable: false,
    },
    {
      key: "female" as keyof ClassGenderStats,
      header: "ছাত্রী",
      sortable: false,
    },
    {
      key: "total" as keyof ClassGenderStats,
      header: "মোট",
      sortable: false,
    },
  ];

  return (
    <div>
      <DataTable searchable={false} data={stats} columns={columns} />
    </div>
  );
};

export default StudentsInfoContainer;
