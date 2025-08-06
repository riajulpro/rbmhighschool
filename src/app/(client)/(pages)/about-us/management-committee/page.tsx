import { Suspense } from "react";
import { getData } from "@/lib/getData";

import Title from "@/components/shared/title";
import Spinner from "@/components/shared/spinner";

import Management from "./_components/management";

const ManagementPage = async () => {
  const data = await getData("/api/authorities");

  return (
    <div>
      <Title text="পরিচালনা পর্ষদ" />
      <Suspense fallback={<Spinner />}>
        <Management managements={data} />
      </Suspense>
    </div>
  );
};

export default ManagementPage;
