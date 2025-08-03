import { getData } from "@/lib/getData";
import AdmissionsPage from "./_components/admission-container";

const page = async () => {
  const data = await getData("/api/admissions");

  return (
    <div>
      <AdmissionsPage admissionData={data} />
    </div>
  );
};

export default page;
