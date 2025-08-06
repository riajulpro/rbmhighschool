import HeadTeacherCard from "./_components/head-teacher-card";

export default function HomePage() {
  const headTeacherData = {
    name: "Faruqul Islam Patwary",
    designation: "প্রধান শিক্ষক",
    institution: "Rampur Bazar Majidia High School",
    contactNumber: "+8801820159878",
    contactEmail: "hm311261@gmail.com",
    profilePicture: "/images/head_teacher.png",
    quote: "শিক্ষাই জাতির মেরুদণ্ড",
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 py-12 dark:bg-gray-900">
      <HeadTeacherCard {...headTeacherData} />
    </div>
  );
}
