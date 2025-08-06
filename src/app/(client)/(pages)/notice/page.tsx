import NoDataAvailable from "@/components/shared/no-data-available";
import Title from "@/components/shared/title";
import { getData } from "@/lib/getData";
import { TNotices } from "@/types/notices";
import AllNoticesTable from "./_components/all-notices-table";
import { Suspense } from "react";
import Spinner from "@/components/shared/spinner";

const NoticesPage = async () => {
  const { notices }: { notices: TNotices } = await getData("/api/notices");

  return (
    <div>
      <Title text="নোটিশ" />
      <Suspense fallback={<Spinner />}>
        {notices.length > 0 ? (
          <div>
            <AllNoticesTable notices={notices} />
          </div>
        ) : (
          <NoDataAvailable field="notices!" />
        )}
      </Suspense>
    </div>
  );
};

export default NoticesPage;
