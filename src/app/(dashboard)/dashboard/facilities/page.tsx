import { getData } from "@/lib/getData";
import FacilitiesPage from "./_components/facilities-container";

const page = async () => {
  const data = await getData("/api/facilities");

  return (
    <div>
      <FacilitiesPage facilityData={data} />
    </div>
  );
};

export default page;
