import Link from "next/link";

const Footer = () => {
  return (
    <footer className="p-5 md:min-h-40 bg-slate-950 text-white relative border-t-8 border-[#006A4E] mt-5">
      <div className="absolute inset-0 bg-[url('/images/footer-bg.png')] bg-bottom bg-no-repeat z-0 opacity-25"></div>

      <div className="relative w-full z-10 md:h-40 flex items-center justify-center">
        <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-3 p-2">
          <div className="flex flex-col justify-center items-center">
            <h4 className="font-medium text-lg md:text-xl">
              রামপুর বাজার মজিদিয়া উচ্চ বিদ্যালয়
            </h4>
            <p className="text-base font-bold">প্রধান শিক্ষকঃ ফারুকুল ইসলাম</p>
            <div></div>
          </div>
          <div className="flex items-center md:justify-center flex-col border-y md:border-y-0 md:border-x border-gray-600 py-2 md:py-0 md:px-2">
            <h4 className="font-medium text-xl md:text-2xl">যোগাযোগ</h4>
            <p className="text-sm">রামপুর বাজার, ফরিদগঞ্জ, চাঁদপুর, বাংলাদেশ</p>
            <p className="text-sm">
              <span className="font-medium">মোবাইল:</span> +8801820159878
            </p>
            <p className="text-sm">
              <span className="font-medium">ইমেইল:</span> hm311261@gmail.com
            </p>
          </div>
          <div className="flex items-center justify-center flex-col">
            <h4 className="font-medium text-lg md:text-xl">
              পরিকল্পনা ও বাস্তবায়নে
            </h4>
            <p className="text-base font-bold">
              মাধ্যমিক ও উচ্চশিক্ষা অধিদপ্তর
            </p>
            <p className="text-sm">
              প্রযুক্তি সহযোগিতায়{" "}
              <Link
                target="_blank"
                href="https://riajulpro-pf.vercel.app"
                className="text-lime-400 hover:text-lime-600"
              >
                RiaJul Pro
              </Link>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
