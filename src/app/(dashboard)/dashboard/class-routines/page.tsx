import { getData } from "@/lib/getData";
import ClassRoutinesPage from "./_components/calss-routine-container";

const page = async () => {
  const { routines } = await getData("/api/routine");

  return (
    <div>
      <ClassRoutinesPage routineData={routines} />
    </div>
  );
};

export default page;
