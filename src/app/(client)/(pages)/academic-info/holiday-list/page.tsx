import { DataTable } from "@/components/shared/data-table";
import Spinner from "@/components/shared/spinner";
import Title from "@/components/shared/title";
import { getData } from "@/lib/getData";
import { Suspense } from "react";

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
      <Suspense fallback={<Spinner />}>
        <DataTable data={data} columns={columns} searchable={false} />
      </Suspense>
    </div>
  );
};

export default page;
