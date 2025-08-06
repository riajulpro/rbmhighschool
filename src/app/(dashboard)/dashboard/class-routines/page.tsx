import { getData } from "@/lib/getData";
import ClassRoutinesPage from "./_components/calss-routine-container";
import Spinner from "@/components/shared/spinner";
import { Suspense } from "react";

const page = async () => {
  const { routines } = await getData("/api/routine");

  return (
    <Suspense fallback={<Spinner />}>
      <ClassRoutinesPage routineData={routines} />
    </Suspense>
  );
};

export default page;
