import { getData } from "@/lib/getData";
import HonoredStudentsPage from "./_components/honored-students-container";

const page = async () => {
  const { honoredStudents } = await getData("/api/honored-students");

  return (
    <div>
      <HonoredStudentsPage honoredData={honoredStudents} />
    </div>
  );
};

export default page;
