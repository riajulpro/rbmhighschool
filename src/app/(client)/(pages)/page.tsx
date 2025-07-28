import Banner from "@/components/shared/home/banner";
import MainGridSection from "@/components/shared/home/main-grid-section";
// import NoticeBoard from "@/components/shared/home/notice-board";
import Notices from "@/components/shared/home/notices";
import PrincipalDetails from "@/components/shared/home/principal-details";
import ShortDetails from "@/components/shared/home/short-details";

export default function Home() {
  return (
    <article>
      <Banner />
      {/* <NoticeBoard /> */}
      <section className="w-full flex flex-col md:flex-row md:space-x-3">
        <div className="w-full flex flex-col">
          <ShortDetails />
          <MainGridSection />
        </div>
        <div className="md:w-2/4">
          <Notices />
          <PrincipalDetails />
        </div>
      </section>
    </article>
  );
}
