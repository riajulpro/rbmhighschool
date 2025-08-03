import { getData } from "@/lib/getData";
import NoticesPage from "./_components/notices-container";

const page = async () => {
  const { notices } = await getData("/api/notices");

  return (
    <div>
      <NoticesPage noticeData={notices} />
    </div>
  );
};

export default page;
