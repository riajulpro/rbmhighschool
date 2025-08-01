import GalleryGrid from "@/components/shared/gallery/gallery-grid";
import NoDataAvailable from "@/components/shared/no-data-available";
import Title from "@/components/shared/title";
import { getData } from "@/lib/getData";
import { TGallery } from "@/types/gallery";

const galleryItems: TGallery = [
  {
    _id: "1",
    title: "Beautiful Sunset Landscape",
    type: "photo" as const,
    url: "/placeholder.svg?height=400&width=600",
    description:
      "A stunning sunset over the mountains captured during our hiking trip last weekend.",
    createdAt: "2024-01-15T10:30:00Z",
    updatedAt: "2024-01-15T10:30:00Z",
  },
  {
    _id: "2",
    title: "How to Build a React App",
    type: "video" as const,
    url: "https://www.youtube.com/watch?v=dGcsHMXbSOA",
    description:
      "A comprehensive tutorial on building modern React applications with TypeScript and Next.js.",
    createdAt: "2024-01-14T15:45:00Z",
    updatedAt: "2024-01-14T15:45:00Z",
  },
  {
    _id: "3",
    title: "City Architecture",
    type: "photo" as const,
    url: "/placeholder.svg?height=400&width=600",
    description:
      "Modern architectural designs in downtown area showcasing contemporary urban planning.",
    createdAt: "2024-01-13T09:20:00Z",
    updatedAt: "2024-01-13T09:20:00Z",
  },
  {
    _id: "4",
    title: "JavaScript Tips and Tricks",
    type: "video" as const,
    url: "https://www.youtube.com/watch?v=Mus_vwhTCq0",
    description:
      "Learn advanced JavaScript techniques that will make you a better developer.",
    createdAt: "2024-01-12T14:15:00Z",
    updatedAt: "2024-01-12T14:15:00Z",
  },
  {
    _id: "5",
    title: "Ocean Waves",
    type: "photo" as const,
    url: "/placeholder.svg?height=400&width=600",
    createdAt: "2024-01-11T08:00:00Z",
    updatedAt: "2024-01-11T08:00:00Z",
  },
  {
    _id: "6",
    title: "Web Development Fundamentals",
    type: "video" as const,
    url: "https://www.youtube.com/watch?v=erEgovG9WBs",
    description:
      "Master the basics of web development with HTML, CSS, and JavaScript.",
    createdAt: "2024-01-10T16:30:00Z",
    updatedAt: "2024-01-10T16:30:00Z",
  },
];

const page = async () => {
  const { gallery } = await getData("/api/gallery?type=video");

  return (
    <div>
      <Title text="ভিডিও গ্যালারি" />
      {gallery.length > 0 ? (
        <GalleryGrid data={galleryItems} />
      ) : (
        <NoDataAvailable field="Gallery videos!" />
      )}
    </div>
  );
};

export default page;
