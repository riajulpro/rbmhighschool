import { getData } from "@/lib/getData";
import PostsPage from "./_components/posts-container";
import { Suspense } from "react";
import Spinner from "@/components/shared/spinner";

const page = async () => {
  const { posts } = await getData("/api/posts");

  return (
    <Suspense fallback={<Spinner />}>
      <PostsPage postsData={posts} />
    </Suspense>
  );
};

export default page;
