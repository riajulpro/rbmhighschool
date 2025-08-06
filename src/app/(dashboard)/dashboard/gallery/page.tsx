import { getData } from "@/lib/getData";
import GalleryPage from "./_components/gallery-container";
import Spinner from "@/components/shared/spinner";
import { Suspense } from "react";

const page = async () => {
  const { gallery } = await getData("/api/gallery");

  return (
    <Suspense fallback={<Spinner />}>
      <GalleryPage galleryData={gallery} />
    </Suspense>
  );
};

export default page;
