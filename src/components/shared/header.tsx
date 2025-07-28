import Navigation from "./navigation";

const Header = () => {
  const headerInfo = {
    logo: "./images/logo.png",
    details: {
      name: "রামপুর বাজার মজিদিয়া উচ্চ বিদ্যালয়",
      address: "ফরিদগঞ্জ, চাঁদপুর",
      contact: "123-456-7890",
      schoolCode: "7592",
      eiinNumber: "103590",
    },
    rightPanel: "Additional Info or Links",
  };

  const topHeaderSection = (
    <div className="md:px-20 bg-gray-50 bg-[url('/images/header-bg.jpg')] bg-cover bg-center min-h-40 flex items-center justify-center w-full">
      <div className="flex items-center md:justify-between flex-col md:flex-row md:space-x-9 w-full">
        <div className="">Logo</div>
        <div className="flex flex-col items-center gap-0.5">
          <h3 className="text-lg md:text-2xl font-bold text-[#006A4E]">
            {headerInfo.details.name}
          </h3>
          <p className="text-sm text-slate-700">{headerInfo.details.address}</p>
          <p className="bg-[#006A4E] text-white text-sm md:text-base px-3 py-1 rounded-full inline-block font-medium">
            School Code: {headerInfo.details.schoolCode} | EIIN:{" "}
            {headerInfo.details.eiinNumber}
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
