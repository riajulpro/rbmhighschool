import Image from "next/image";
import headTeacherImg from "../../../../public/images/head_teacher.png";

const PrincipalDetails = () => {
  return (
    <div className="rounded-sm shadow-sm overflow-hidden">
      <h2 className="text-xl font-semibold bg-[#006A4E] text-center text-white py-1">
        প্রধান শিক্ষক
      </h2>
      <div className="flex flex-col items-center gap-1 p-2">
        <div className="rounded-xl h-96 w-full bg-gray-50 overflow-hidden">
          <Image src={headTeacherImg} alt="Faruqul Islam Patwary" />
        </div>
        <div className="text-center">
          <h3 className="text-lg font-medium">Faruqul Islam Patwary</h3>
          <p className="text-center text-sm text-slate-800">
            Rampur Bazar Majidia High Schools
          </p>
        </div>
      </div>
    </div>
  );
};

export default PrincipalDetails;
