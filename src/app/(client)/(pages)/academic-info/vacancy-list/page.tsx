import { DataTable } from "@/components/shared/data-table";
import Title from "@/components/shared/title";
import { getData } from "@/lib/getData";

type Vacancy = {
  serial: number;
  name: string;
  quantity: string;
};

const page = async () => {
  const data: Vacancy[] = await getData("/api/vacancies");

  const columns = [
    {
      key: "serial" as keyof Vacancy,
      header: "ক্রমিক নং",
      sortable: false,
    },
    {
      key: "name" as keyof Vacancy,
      header: "পদের নাম",
      sortable: false,
    },
    {
      key: "quantity" as keyof Vacancy,
      header: "শুন্য পদের সংখ্যা",
      sortable: false,
    },
  ];

  return (
    <div>
      <Title text="শূণ্যপদের তালিকা" />

      <DataTable data={data} columns={columns} searchable={false} />
    </div>
  );
};

export default page;
