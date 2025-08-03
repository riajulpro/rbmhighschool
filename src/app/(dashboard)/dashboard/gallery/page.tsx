import { getData } from "@/lib/getData";
import GalleryPage from "./_components/gallery-container";

const page = async () => {
  const { gallery } = await getData("/api/gallery");

  return (
    <div>
      <GalleryPage galleryData={gallery} />
    </div>
  );
};

export default page;
