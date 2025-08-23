import { getData } from "@/lib/getData";
import { Suspense } from "react";
import Spinner from "@/components/shared/spinner";
import ResultStatisticsPage from "./_components/results-statistics-container";

const page = async () => {
  const data = await getData("/api/exam-results");

  return (
    <Suspense fallback={<Spinner />}>
      <ResultStatisticsPage facilityData={data} />
    </Suspense>
  );
};

export default page;
