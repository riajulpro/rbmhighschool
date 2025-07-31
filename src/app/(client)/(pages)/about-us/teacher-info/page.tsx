import NoDataAvailable from "@/components/shared/no-data-available";
import { getData } from "@/lib/getData";

const page = async () => {
  const data = await getData("/api/teachers");

  if (data.length === 0) {
    return <NoDataAvailable field="teachers" />;
  }

  return <div>page</div>;
};

export default page;
