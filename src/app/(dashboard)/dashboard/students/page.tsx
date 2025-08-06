import { getData } from "@/lib/getData";
import StudentsPage from "./_components/students-container";
import { Suspense } from "react";
import Spinner from "@/components/shared/spinner";

const page = async () => {
  const { students } = await getData("/api/students");

  return (
    <Suspense fallback={<Spinner />}>
      <StudentsPage studentsData={students} />
    </Suspense>
  );
};

export default page;
