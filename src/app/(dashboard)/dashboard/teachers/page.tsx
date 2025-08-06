import { getData } from "@/lib/getData";
import TeachersPage from "./_components/teachers-container";
import { Suspense } from "react";
import Spinner from "@/components/shared/spinner";

const page = async () => {
  const { teachers } = await getData("/api/teachers");

  return (
    <Suspense fallback={<Spinner />}>
      <TeachersPage teacherData={teachers} />
    </Suspense>
  );
};

export default page;
