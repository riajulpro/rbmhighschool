import { getData } from "@/lib/getData";
import StaffPage from "./_components/staff-container";
import { Suspense } from "react";
import Spinner from "@/components/shared/spinner";

const page = async () => {
  const data = await getData("/api/staffs");

  return (
    <Suspense fallback={<Spinner />}>
      <StaffPage staffData={data} />
    </Suspense>
  );
};

export default page;
