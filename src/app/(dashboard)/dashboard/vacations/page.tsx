import { getData } from "@/lib/getData";
import VacationPage from "./_components/vacation-components";

const page = async () => {
  const data = await getData("/api/vacations");

  return (
    <div>
      <VacationPage vacationsData={data} />
    </div>
  );
};

export default page;
