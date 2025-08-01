"use client";

import { DataTable } from "@/components/shared/data-table";
import Title from "@/components/shared/title";
import Image from "next/image";

type TManagement = {
  profilePic: string;
  name: string;
  responsibility: string;
};

const page = () => {
  const management = [
    {
      profilePic: "/images/head_teacher.png",
      name: "Faruqul Islam Patwary",
      responsibility: "Head Teacher",
    },
    {
      profilePic: "",
      name: "Mohammad Mohsin",
      responsibility: "Office Assistant",
    },
  ];

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

  return (
    <div>
      <Title text="পরিচালনা পর্ষদ" />
      <DataTable columns={columns} data={management} searchable={false} />
    </div>
  );
};

export default page;
