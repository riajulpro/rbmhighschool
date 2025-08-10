import Spinner from "@/components/shared/spinner";
import { Badge } from "@/components/ui/badge";
import { getData } from "@/lib/getData";
import Image from "next/image";
import { Suspense } from "react";

interface Post {
  _id: string;
  title: string;
  content: string;
  coverImage?: string; // Optional, as it might not always be present
  tags: string[];
  createdAt: string; // ISO 8601 date string
  updatedAt: string; // ISO 8601 date string
  __v: number;
}

const PostDetails = async ({ params }: { params: { id: string } }) => {
  const { post }: { post: Post } = await getData(`/api/posts/${params.id}`);

  return (
    <Suspense fallback={<Spinner />}>
      <div className="container mx-auto px-4 py-8 md:px-6 lg:px-8">
        <article className="max-w-3xl mx-auto space-y-8">
          <header className="space-y-4 text-center">
            <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl leading-tight">
              {post.title}
            </h1>
            <div className="flex flex-wrap justify-center gap-2">
              {post.tags.map((tag, index) => (
                <Badge key={index} variant="secondary">
                  {tag}
                </Badge>
              ))}
            </div>
            <p className="text-muted-foreground text-sm">
              Published on{" "}
              {new Date(post.createdAt).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </p>
          </header>

          {post.coverImage && (
            <div className="relative w-full aspect-video rounded-lg overflow-hidden">
              <Image
                src={post.coverImage || "/placeholder.svg"}
                alt={`Cover image for ${post.title}`}
                fill
                style={{ objectFit: "cover" }}
                className="transition-transform duration-300 hover:scale-105"
                priority
              />
            </div>
          )}

          <section className="prose prose-lg dark:prose-invert mx-auto">
            <p>{post.content}</p>
            {/* Add more content rendering here if 'content' was richer (e.g., Markdown) */}
          </section>
        </article>
      </div>
    </Suspense>
  );
};

export default PostDetails;
