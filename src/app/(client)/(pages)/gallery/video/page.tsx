import GalleryGrid from "@/components/shared/gallery/gallery-grid";
import NoDataAvailable from "@/components/shared/no-data-available";
import Title from "@/components/shared/title";
import { getData } from "@/lib/getData";
import { TGallery } from "@/types/gallery";

const page = async () => {
  const { gallery }: { gallery: TGallery } = await getData(
    "/api/gallery?type=video"
  );

  return (
    <div>
      <Title text="ভিডিও গ্যালারি" />
      {gallery.length > 0 ? (
        <GalleryGrid data={gallery} />
      ) : (
        <NoDataAvailable field="Gallery videos!" />
      )}
    </div>
  );
};

export default page;
