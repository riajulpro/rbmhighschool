import Navigation from "./navigation";

const Header = async () => {
  const info = {
    logo: "./images/logo.png",
    name: "রামপুর বাজার মজিদিয়া উচ্চ বিদ্যালয়",
    location: "ফরিদগঞ্জ, চাঁদপুর",
    schoolCode: "7592",
    eiinNumber: "103590",
  };

  const topHeaderSection = (
    <div className="md:px-20 bg-gray-50 bg-[url('/images/header-bg.jpg')] bg-cover bg-center min-h-40 flex items-center justify-center w-full">
      <div className="flex items-center md:justify-between flex-col md:flex-row md:space-x-9 w-full">
        <div className=""></div>
        <div className="flex flex-col items-center gap-0.5">
          <h3 className="text-lg md:text-2xl font-bold text-[#006A4E]">
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
    <header className="relative">
      {topHeaderSection}
      <Navigation />
    </header>
  );
};

export default Header;
