import Title from "@/components/shared/title";
import { getData } from "@/lib/getData";
import HonoredStudentCard from "./_components/honored-student-card";
import NoDataAvailable from "@/components/shared/no-data-available";
import { IHonoredStudent } from "@/types/honored-student";

const page = async () => {
  const { honoredStudents }: { honoredStudents: IHonoredStudent[] } =
    await getData("/api/honored-students");

  return (
    <div>
      <Title text="কৃতি শিক্ষার্থী" />
      {honoredStudents.length > 0 ? (
        honoredStudents.map((student, index) => (
          <HonoredStudentCard key={index} student={student} />
        ))
      ) : (
        <NoDataAvailable field="honored students!" />
      )}
    </div>
  );
};

export default page;
