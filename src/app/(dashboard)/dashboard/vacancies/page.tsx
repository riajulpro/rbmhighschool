import { getData } from "@/lib/getData";
import VacancyContainer from "./_components/vacancy-components";

const page = async () => {
  const data = await getData("/api/vacancies");

  return (
    <div>
      <VacancyContainer vacancyData={data} />
    </div>
  );
};

export default page;
