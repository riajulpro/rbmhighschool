import { getData } from "@/lib/getData";
import TeachersPage from "./_components/teachers-container";

const page = async () => {
  const { teachers } = await getData("/api/teachers");

  return (
    <div>
      <TeachersPage teacherData={teachers} />
    </div>
  );
};

export default page;
