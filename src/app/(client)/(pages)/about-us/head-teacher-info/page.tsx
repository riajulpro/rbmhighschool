import { headTeacherData } from "src/data/head-teacher-data";
import HeadTeacherCard from "./_components/head-teacher-card";

export default function HomePage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 py-12 dark:bg-gray-900">
      <HeadTeacherCard {...headTeacherData} />
    </div>
  );
}
