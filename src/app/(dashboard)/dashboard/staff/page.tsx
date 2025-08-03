import { getData } from "@/lib/getData";
import StaffPage from "./_components/staff-container";

const page = async () => {
  const data = await getData("/api/staffs");

  return (
    <div>
      <StaffPage staffData={data} />
    </div>
  );
};

export default page;
