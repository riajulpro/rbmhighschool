import { getData } from "@/lib/getData";
import PostsPage from "./_components/posts-container";

const page = async () => {
  const { posts } = await getData("/api/posts");

  return (
    <div>
      <PostsPage postsData={posts} />
    </div>
  );
};

export default page;
