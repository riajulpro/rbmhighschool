import { authOptions } from "@/lib/auth";
import { getData } from "@/lib/getData";
import { getServerSession } from "next-auth";
import TeacherProfileSettingsComp from "./_components/container";

const TeacherProfileSettings = async () => {
  const session = await getServerSession(authOptions);
  const email = session?.user?.email;
  const role = session?.user?.role;
  const data = await getData(`/api/teachers/my-profile/${email}`);

  console.log(data);

  if (role !== "teacher") {
    return <div>Access Denied</div>;
  }

  if (data.length === 0) {
    return <div>No profile data found. Contact with your Admin.</div>;
  }

  return <TeacherProfileSettingsComp teacherData={data[0]} />;
};

export default TeacherProfileSettings;
