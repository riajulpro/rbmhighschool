import { getData } from "@/lib/getData";
import NoticesPage from "./_components/notices-container";
import { Suspense } from "react";
import Spinner from "@/components/shared/spinner";

const page = async () => {
  const { notices } = await getData("/api/notices");

  return (
    <Suspense fallback={<Spinner />}>
      <NoticesPage noticeData={notices} />
    </Suspense>
  );
};

export default page;
