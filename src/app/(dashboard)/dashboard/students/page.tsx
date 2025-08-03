import { getData } from "@/lib/getData";
import StudentsPage from "./_components/students-container";

const page = async () => {
  const { students } = await getData("/api/students");

  return (
    <div>
      <StudentsPage studentsData={students} />
    </div>
  );
};

export default page;
