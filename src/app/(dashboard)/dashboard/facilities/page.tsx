import { getData } from "@/lib/getData";
import FacilitiesPage from "./_components/facilities-container";
import { Suspense } from "react";
import Spinner from "@/components/shared/spinner";

const page = async () => {
  const data = await getData("/api/facilities");

  return (
    <Suspense fallback={<Spinner />}>
      <FacilitiesPage facilityData={data} />
    </Suspense>
  );
};

export default page;
