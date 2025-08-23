import Spinner from "@/components/shared/spinner";
import Title from "@/components/shared/title";
import { getData } from "@/lib/getData";
import { IInstitutionInfo } from "@/types/index";
import { Suspense } from "react";
import InstitutionInfoCard from "./_components/institution-info-card";

const page = async () => {
  const { info }: { info: IInstitutionInfo } = await getData(
    "/api/institution"
  );

  return (
    <div>
      <Title text="প্রতিষ্ঠানের ইতিহাস" />
      <Suspense fallback={<Spinner />}>
        <InstitutionInfoCard institution={info} />
      </Suspense>
    </div>
  );
};

export default page;
