import { getData } from "@/lib/getData";
import InstitutionInfoPage from "./_components/institution-info-container";

const page = async () => {
  const { info } = await getData("/api/institution");
  return (
    <div>
      <InstitutionInfoPage institutionData={[info]} />
    </div>
  );
};

export default page;
