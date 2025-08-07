import Image from "next/image";
import Navigation from "./navigation";

const Header = async () => {
  const info = {
    logo: "/images/logo.png",
    name: "রামপুর বাজার মজিদিয়া উচ্চ বিদ্যালয়",
    location: "ফরিদগঞ্জ, চাঁদপুর",
    schoolCode: "7592",
    eiinNumber: "103590",
  };

  const topHeaderSection = (
    <div className="py-3 md:py-0 md:px-20 bg-gray-50 bg-[url('/images/header-bg.jpg')] bg-cover bg-center md:min-h-40 flex items-center justify-center w-full">
      <div className="grid grid-cols-1 md:grid-cols-4 items-center justify-center w-full">
        <div className="flex items-center justify-center">
          <div className="w-12 h-12 md:h-32 md:w-32">
            <Image
              src={info.logo}
              alt="logo"
              width={100}
              height={100}
              className="inset-0 w-full h-full object-cover"
            />
          </div>
        </div>
        <div className="flex flex-col items-center gap-0.5 md:col-span-2">
          <h3 className="text-lg md:text-2xl font-bold text-[#006A4E] font-hindSiliguri">
            {info.name}
          </h3>
          <p className="text-sm text-slate-700">{info.location}</p>
          <p className="bg-[#006A4E] text-white text-sm md:text-base px-3 py-1 rounded-full inline-block font-medium">
            School Code: {info.schoolCode} | EIIN: {info.eiinNumber}
          </p>
        </div>
        <div></div>
      </div>
    </div>
  );

  return (
    <header>
      {topHeaderSection}

      <Navigation />
    </header>
  );
};

export default Header;
