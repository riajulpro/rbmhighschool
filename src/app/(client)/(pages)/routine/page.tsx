import Title from "@/components/shared/title";
import { IClassRoutine } from "@/types/class-routine";
import RoutineDataTable from "./_components/routine-data-table";
import { getData } from "@/lib/getData";
import NoDataAvailable from "@/components/shared/no-data-available";

const page = async () => {
  const { routines }: { routines: IClassRoutine[] } = await getData(
    "/api/routine"
  );

  return (
    <div>
      <Title text="রুটিন" />

      {routines.length > 0 ? (
        <RoutineDataTable routineData={routines} />
      ) : (
        <NoDataAvailable field="routines!" />
      )}
    </div>
  );
};

export default page;
