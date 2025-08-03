import { getData } from "@/lib/getData";
import Banner from "./banner";

const BannerContainer = async () => {
  const { photoUrls } = await getData("/api/gallery/slide-photos");

  console.log(photoUrls);

  const slideElements = photoUrls || [
    "/images/slide/slide_1.jpg",
    "/images/slide/slide_2.jpg",
    "/images/slide/slide_3.jpg",
  ];

  return (
    <div>
      <Banner images={slideElements} />
    </div>
  );
};

export default BannerContainer;
