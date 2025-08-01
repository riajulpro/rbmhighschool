import Title from "@/components/shared/title";
import PostGrid from "./_components/post-grid";
import { IPostWithAuthor } from "@/types/posts";
import { getData } from "@/lib/getData";
import NoDataAvailable from "@/components/shared/no-data-available";

const page = async () => {
  const { posts }: { posts: IPostWithAuthor[] } = await getData("/api/posts");
  return (
    <div>
      <Title text="সাম্প্রতিক খবর" />

      {posts.length > 0 ? (
        <PostGrid posts={posts} />
      ) : (
        <NoDataAvailable field="recent posts!" />
      )}
    </div>
  );
};

export default page;
