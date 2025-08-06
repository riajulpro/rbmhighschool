"use client";

import { DataTable } from "@/components/shared/data-table";
import Image from "next/image";

type TManagement = {
  profilePic: string;
  name: string;
  responsibility: string;
};

const Management = ({ managements }: { managements: TManagement[] }) => {
  const columns = [
    {
      key: "profilePic" as keyof TManagement,
      header: "Avatar",
      sortable: false,
      render: (value: string, row: TManagement) => (
        <Image src={value} alt={row.name} width={100} height={160} />
      ),
    },
    {
      key: "name" as keyof TManagement,
      header: "Name",
      sortable: false,
    },
    {
      key: "responsibility" as keyof TManagement,
      header: "Responsibility",
      sortable: false,
    },
  ];

  return <DataTable columns={columns} data={managements} searchable={false} />;
};

export default Management;
