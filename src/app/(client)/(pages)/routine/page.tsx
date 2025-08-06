import Title from "@/components/shared/title";
import { IClassRoutine } from "@/types/class-routine";
import RoutineDataTable from "./_components/routine-data-table";
import { getData } from "@/lib/getData";
import NoDataAvailable from "@/components/shared/no-data-available";
import { Suspense } from "react";
import Spinner from "@/components/shared/spinner";

const page = async () => {
  const { routines }: { routines: IClassRoutine[] } = await getData(
    "/api/routine"
  );

  return (
    <div>
      <Title text="রুটিন" />
      <Suspense fallback={<Spinner />}>
        {routines.length > 0 ? (
          <RoutineDataTable routineData={routines} />
        ) : (
          <NoDataAvailable field="routines!" />
        )}
      </Suspense>
    </div>
  );
};

export default page;
