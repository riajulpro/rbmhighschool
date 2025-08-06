import { getData } from "@/lib/getData";
import VacationPage from "./_components/vacation-components";
import { Suspense } from "react";
import Spinner from "@/components/shared/spinner";

const page = async () => {
  const data = await getData("/api/vacations");

  return (
    <Suspense fallback={<Spinner />}>
      <VacationPage vacationsData={data} />
    </Suspense>
  );
};

export default page;
