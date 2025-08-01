import Image from "next/image";
import headTeacherImg from "../../../../../../public/images/head_teacher.png";
import { Mail, MapPin, Phone } from "lucide-react";

const page = async () => {
  const headTeacher = {
    name: "Faruqul Islam Patwary",
    designation: "Head Teacher",
    institution: "Rampur Bazar Majidia High Schools",
    contactNumber: "01800-000000",
    contactEmail: "head@rbmhighschool.edu.bd",
    profilePicture: "/images/head_teacher.png",
    quote: "",
  };

  return (
    <div className="rounded-sm shadow-sm overflow-hidden max-w-sm mx-auto">
      <h2 className="text-xl font-semibold bg-[#006A4E] text-center text-white py-1">
        প্রধান শিক্ষক
      </h2>
      <div className="flex flex-col items-center gap-1 md:gap-5 p-3">
        <div className="rounded-xl h-96 w-full bg-gray-50 overflow-hidden">
          <Image src={headTeacherImg} alt="Faruqul Islam Patwary" />
        </div>
        <div className="text-slate-800 w-full">
          <h3 className="font-bold text-xl">{headTeacher.name}</h3>
          <p>{headTeacher.designation}</p>
          <h4 className="mt-4 font-medium">Contact Information:</h4>
          <div className="">
            <p className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-slate-500" />
              {headTeacher.institution}
            </p>
            <p className="flex items-center gap-2">
              <Phone className="h-4 w-4 text-slate-500" />
              {headTeacher.contactNumber}
            </p>
            <p className="flex items-center gap-2">
              <Mail className="h-4 w-4 text-slate-500" />
              {headTeacher.contactEmail}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
