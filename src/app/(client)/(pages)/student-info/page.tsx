import Title from "@/components/shared/title";
import { getData } from "@/lib/getData";
import { ClassGenderStats } from "@/types/studentCounts";
import StudentsInfoContainer from "./_components/students-info-container";
import NoDataAvailable from "@/components/shared/no-data-available";

const StudentInfoPage = async () => {
  const { stats }: { stats: ClassGenderStats[] } = await getData(
    "/api/students/stats"
  );

  return (
    <div>
      <Title text="শিক্ষার্থীর তথ্য" />

      {stats.length > 0 ? (
        <StudentsInfoContainer stats={stats} />
      ) : (
        <NoDataAvailable field="students stats!" />
      )}
    </div>
  );
};

export default StudentInfoPage;
