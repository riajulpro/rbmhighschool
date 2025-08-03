import { getData } from "@/lib/getData";
import AuthoritiesPage from "./_components/authority-components";

const page = async () => {
  const data = await getData("/api/authorities");

  return (
    <div>
      <AuthoritiesPage authoritiesData={data} />
    </div>
  );
};

export default page;
