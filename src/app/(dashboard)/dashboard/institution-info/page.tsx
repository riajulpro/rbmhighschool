import { getData } from "@/lib/getData";
import InstitutionInfoPage from "./_components/institution-info-container";
import { Suspense } from "react";
import Spinner from "@/components/shared/spinner";

const page = async () => {
  const { info } = await getData("/api/institution");

  return (
    <Suspense fallback={<Spinner />}>
      <InstitutionInfoPage institutionData={info ? [info] : []} />
    </Suspense>
  );
};

export default page;
