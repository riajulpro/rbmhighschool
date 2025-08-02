import { DataTable } from "@/components/shared/data-table";
import NoDataAvailable from "@/components/shared/no-data-available";
import Title from "@/components/shared/title";
import { getData } from "@/lib/getData";
import { IStaff } from "@/types/staff";

const page = async () => {
  const data: IStaff[] = await getData("/api/staffs");
  await getData("/api/staffs");

  const columns = [
    {
      key: "name" as keyof IStaff,
      header: "Name",
      sortable: true,
    },
    {
      key: "responsibility" as keyof IStaff,
      header: "Position",
      sortable: true,
    },
  ];

  return (
    <div>
      <Title text="কর্মচারীবৃন্দ" />
      {data.length > 0 ? (
        <DataTable data={data} searchable={false} columns={columns} />
      ) : (
        <NoDataAvailable field="staffs!" />
      )}
    </div>
  );
};

export default page;
