import { getData } from "@/lib/getData";
import AdmissionsPage from "./_components/admission-container";
import { Suspense } from "react";
import Spinner from "@/components/shared/spinner";

const page = async () => {
  const data = await getData("/api/admissions");

  return (
    <Suspense fallback={<Spinner />}>
      <AdmissionsPage admissionData={data} />
    </Suspense>
  );
};

export default page;
