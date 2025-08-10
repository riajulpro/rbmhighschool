import Image from "next/image";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { CalendarDays, User } from "lucide-react";
import { IPostWithAuthor } from "@/types/posts";

interface PostGridProps {
  posts: IPostWithAuthor[];
}

export default function PostGrid({ posts }: PostGridProps) {
  const truncateContent = (content: string, maxLength = 150) => {
    if (content.length <= maxLength) return content;
    return content.substring(0, maxLength).trim() + "...";
  };

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    }).format(new Date(date));
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
      {posts.map((post) => (
        <Card
          key={post._id}
          className="overflow-hidden hover:shadow-lg transition-shadow duration-300"
        >
          <CardHeader className="p-0">
            <div className="relative aspect-video overflow-hidden">
              <Image
                src={
                  post.coverImage ||
                  `/placeholder.svg?height=200&width=400&text=${encodeURIComponent(
                    post.title
                  )}`
                }
                alt={post.title}
                fill
                className="object-cover transition-transform duration-300 hover:scale-105"
              />
            </div>
          </CardHeader>

          <CardContent className="p-4">
            <div className="space-y-3">
              <Link
                href={`/recent-news/${post._id}`}
                className="block hover:text-primary transition-colors"
              >
                <h3 className="text-xl font-semibold line-clamp-2 leading-tight">
                  {post.title}
                </h3>
              </Link>

              <p className="text-muted-foreground text-sm leading-relaxed">
                {truncateContent(post.content)}
              </p>

              {post.tags && post.tags.length > 0 && (
                <div className="flex flex-wrap gap-1">
                  {post.tags.slice(0, 3).map((tag, index) => (
                    <Badge key={index} variant="secondary" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                  {post.tags.length > 3 && (
                    <Badge variant="outline" className="text-xs">
                      +{post.tags.length - 3}
                    </Badge>
                  )}
                </div>
              )}
            </div>
          </CardContent>

          <CardFooter className="p-4 pt-0 flex items-center justify-between text-sm text-muted-foreground">
            <div className="flex items-center space-x-2">
              {post.author ? (
                <>
                  <Avatar className="h-6 w-6">
                    <AvatarImage
                      src={post.author.avatar || "/placeholder.svg"}
                      alt={post.author.name}
                    />
                    <AvatarFallback className="text-xs">
                      {post.author.name.charAt(0).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <span className="text-xs">{post.author.name}</span>
                </>
              ) : (
                <>
                  <User className="h-4 w-4" />
                  <span className="text-xs">Anonymous</span>
                </>
              )}
            </div>

            <div className="flex items-center space-x-1">
              <CalendarDays className="h-4 w-4" />
              <span className="text-xs">{formatDate(post.createdAt)}</span>
            </div>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}
