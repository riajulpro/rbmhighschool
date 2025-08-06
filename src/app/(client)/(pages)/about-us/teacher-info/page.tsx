import NoDataAvailable from "@/components/shared/no-data-available";
import ProfileCard from "@/components/shared/profile-card";
import Spinner from "@/components/shared/spinner";
import Title from "@/components/shared/title";
import { getData } from "@/lib/getData";
import { ITeacher } from "@/types/teacher";
import { Suspense } from "react";

const page = async () => {
  const { teachers }: { teachers: ITeacher[] } = await getData("/api/teachers");

  return teachers.length > 0 ? (
    <div>
      <Title text="শিক্ষকদের তথ্য" />
      <Suspense fallback={<Spinner />}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 p-3">
          {teachers?.map((teacher, index) => (
            <ProfileCard data={teacher} key={index} />
          ))}
        </div>
      </Suspense>
    </div>
  ) : (
    <NoDataAvailable field="teachers" />
  );
};

export default page;
