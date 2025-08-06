import Banner from "./banner";

const BannerContainer = async () => {
  const url = `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/gallery/slide-photos`;
  const res = await fetch(url, {
    next: {
      revalidate: 120,
    },
  });
  const { photoUrls } = await res.json();

  const slideElements =
    photoUrls.length > 0
      ? photoUrls
      : [
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
