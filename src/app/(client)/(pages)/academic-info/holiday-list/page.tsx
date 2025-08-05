import { DataTable } from "@/components/shared/data-table";
import Title from "@/components/shared/title";
import { getData } from "@/lib/getData";

type Vacation = {
  date: number;
  day: string;
  reason: string;
};

const page = async () => {
  const data = await getData("/api/vacations");

  const columns = [
    {
      key: "date" as keyof Vacation,
      header: "তারিখ",
      sortable: false,
    },
    {
      key: "day" as keyof Vacation,
      header: "বার",
      sortable: false,
    },
    {
      key: "reason" as keyof Vacation,
      header: "উপলক্ষ",
      sortable: false,
    },
  ];

  return (
    <div>
      <Title text="ছুটির তালিকা" />

      <DataTable data={data} columns={columns} searchable={false} />
    </div>
  );
};

export default page;
