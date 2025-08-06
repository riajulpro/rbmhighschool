import { getData } from "@/lib/getData";
import ResultsPage from "./_components/results-container";
import { Suspense } from "react";
import Spinner from "@/components/shared/spinner";

const page = async () => {
  const data = await getData("/api/results");

  return (
    <Suspense fallback={<Spinner />}>
      <ResultsPage resultData={data} />
    </Suspense>
  );
};

export default page;
