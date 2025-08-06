import { getData } from "@/lib/getData";
import VacancyContainer from "./_components/vacancy-components";
import { Suspense } from "react";
import Spinner from "@/components/shared/spinner";

const page = async () => {
  const data = await getData("/api/vacancies");

  return (
    <Suspense fallback={<Spinner />}>
      <VacancyContainer vacancyData={data} />
    </Suspense>
  );
};

export default page;
