import { getData } from "@/lib/getData";
import AuthoritiesPage from "./_components/authority-components";
import Spinner from "@/components/shared/spinner";
import { Suspense } from "react";

const page = async () => {
  const data = await getData("/api/authorities");

  return (
    <Suspense fallback={<Spinner />}>
      <AuthoritiesPage authoritiesData={data} />
    </Suspense>
  );
};

export default page;
