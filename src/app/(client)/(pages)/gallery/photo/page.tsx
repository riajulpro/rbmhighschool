import GalleryGrid from "@/components/shared/gallery/gallery-grid";
import NoDataAvailable from "@/components/shared/no-data-available";
import Spinner from "@/components/shared/spinner";
import Title from "@/components/shared/title";
import { getData } from "@/lib/getData";
import { TGallery } from "@/types/gallery";
import { Suspense } from "react";

const page = async () => {
  const { gallery }: { gallery: TGallery } = await getData(
    "/api/gallery?type=photo"
  );

  return (
    <div>
      <Title text="ছবি গ্যালারী" />
      <Suspense fallback={<Spinner />}>
        {gallery.length > 0 ? (
          <GalleryGrid data={gallery} />
        ) : (
          <NoDataAvailable field="Gallery photos!" />
        )}
      </Suspense>
    </div>
  );
};

export default page;
