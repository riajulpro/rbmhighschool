import BannerContainer from "@/components/shared/home/banner-container";
import LocationMap from "@/components/shared/home/location-map";
import MainGridSection from "@/components/shared/home/main-grid-section";
// import NoticeBoard from "@/components/shared/home/notice-board";
import Notices from "@/components/shared/home/notices";
import PrincipalDetails from "@/components/shared/home/principal-details";
import ShortDetails from "@/components/shared/home/short-details";
import { Button } from "@/components/ui/button";
import { ClipboardList, GraduationCap, School, User } from "lucide-react";
import Link from "next/link";

export default function Home() {
  const specialLinks = [
    {
      name: "শিক্ষার্থীর রেজাল্ট",
      path: "/student-info/results",
      icon: User,
      isBlank: false,
    },
    {
      name: "মাধ্যমিক ও উচ্চমাধ্যমিক শিক্ষা বোর্ড, কুমিল্লা",
      path: "https://comillaboard.portal.gov.bd",
      icon: User,
      isBlank: true,
    },
    {
      name: "Education Board Result",
      path: "http://www.educationboardresults.gov.bd",
      icon: ClipboardList,
      isBlank: true,
    },
    {
      name: "EMIS",
      path: "https://www.emis.gov.bd/EMIS",
      icon: GraduationCap,
      isBlank: true,
    },
    {
      name: "ব্যানবেইস",
      path: "https://banbeis.gov.bd",
      icon: School,
      isBlank: true,
    },
  ];

  return (
    <article>
      <BannerContainer />
      <section className="w-full flex flex-col md:flex-row md:space-x-3">
        <div className="flex flex-col w-full">
          <ShortDetails />
          <MainGridSection />
        </div>
        <div className="md:w-2/4">
          <div className="my-4 md:mt-0 flex flex-col gap-2">
            {specialLinks.map(({ name, path, icon: Icon, isBlank }) => (
              <Link
                key={name}
                href={path}
                target={isBlank ? "_blank" : "_self"}
              >
                <Button className="bg-[var(--primary-color)] hover:bg-[#F42A41] text-white w-full cursor-pointer py-6 flex justify-baseline">
                  <Icon /> {name}
                </Button>
              </Link>
            ))}
          </div>
          <Notices />
          <PrincipalDetails />
          <LocationMap />
        </div>
      </section>
    </article>
  );
}
