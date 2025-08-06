import { getData } from "@/lib/getData";
import HonoredStudentsPage from "./_components/honored-students-container";
import { Suspense } from "react";
import Spinner from "@/components/shared/spinner";

const page = async () => {
  const { honoredStudents } = await getData("/api/honored-students");

  return (
    <Suspense fallback={<Spinner />}>
      <HonoredStudentsPage honoredData={honoredStudents} />
    </Suspense>
  );
};

export default page;
