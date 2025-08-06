import BannerContainer from "@/components/shared/home/banner-container";
import MainGridSection from "@/components/shared/home/main-grid-section";
// import NoticeBoard from "@/components/shared/home/notice-board";
import Notices from "@/components/shared/home/notices";
import PrincipalDetails from "@/components/shared/home/principal-details";
import ShortDetails from "@/components/shared/home/short-details";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <article>
      <BannerContainer />
      <section className="w-full flex flex-col md:flex-row md:space-x-3">
        <div className="w-full flex flex-col">
          <ShortDetails />
          <MainGridSection />
        </div>
        <div className="md:w-2/4">
          <div className="mb-4">
            <Link href="/student-info/results">
              <Button className="bg-[var(--primary-color)] text-white w-full cursor-pointer">
                শিক্ষার্থীর রেজাল্ট
              </Button>
            </Link>
          </div>
          <Notices />
          <PrincipalDetails />
        </div>
      </section>
    </article>
  );
}
