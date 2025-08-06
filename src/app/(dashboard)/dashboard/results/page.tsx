import { getData } from "@/lib/getData";
import ResultsPage from "./_components/results-container";

const page = async () => {
  const data = await getData("/api/results");

  return (
    <div>
      <ResultsPage resultData={data} />
    </div>
  );
};

export default page;
