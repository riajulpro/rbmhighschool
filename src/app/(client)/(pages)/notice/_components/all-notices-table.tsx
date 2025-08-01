"use client";

import { DataTable } from "@/components/shared/data-table";
import { INotice, TNotices } from "@/types/notices";
import Link from "next/link";

interface Props {
  notices: TNotices;
}

const AllNoticesTable = ({ notices }: Props) => {
  const columns = [
    {
      key: "title" as keyof INotice,
      header: "সকল নোটিশ সমূহ",
      sortable: false,
      render: (value: string, row: INotice) => (
        <Link href={`/notice/${row._id}`} className="cursor-pointer">
          {value}
        </Link>
      ),
    },
  ];
  return (
    <div>
      <DataTable searchable={false} data={notices} columns={columns} />
    </div>
  );
};

export default AllNoticesTable;
