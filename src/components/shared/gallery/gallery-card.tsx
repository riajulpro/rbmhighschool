"use client";

import { useState } from "react";
import Image from "next/image";
import { Play, Calendar, Eye } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import {
  getVideoThumbnail,
  getYouTubeEmbedUrl,
} from "@/lib/getYoutubeEmbededUrl";
import { detectImageSourceType } from "@/lib/detect-img-url";

interface IGallery {
  _id: string;
  title: string;
  type: "photo" | "video";
  url: string;
  description?: string;
  createdAt: string;
  updatedAt: string;
}

interface GalleryCardProps {
  item: IGallery;
}

export function GalleryCard({ item }: GalleryCardProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleCardClick = () => {
    setIsModalOpen(true);
  };

  return (
    <>
      <Card
        className="group cursor-pointer overflow-hidden transition-all duration-300 hover:shadow-lg hover:scale-[1.02] py-0"
        onClick={handleCardClick}
      >
        <CardContent className="p-0">
          <div className="relative aspect-video overflow-hidden">
            {item.type === "photo" ? (
              <Image
                src={detectImageSourceType(item.url) || "/placeholder.svg"}
                alt={item.title}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-110"
              />
            ) : (
              <>
                <Image
                  src={getVideoThumbnail(item.url) || "/placeholder.svg"}
                  alt={item.title}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                  <div className="bg-white/90 rounded-full p-3 transition-transform duration-300 group-hover:scale-110">
                    <Play
                      className="h-6 w-6 text-gray-800 ml-1"
                      fill="currentColor"
                    />
                  </div>
                </div>
              </>
            )}

            <div className="absolute top-2 left-2">
              <Badge variant={item.type === "photo" ? "default" : "secondary"}>
                {item.type === "photo" ? "Photo" : "Video"}
              </Badge>
            </div>

            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

            <div className="absolute bottom-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <div className="bg-white/90 rounded-full p-2">
                <Eye className="h-4 w-4 text-gray-800" />
              </div>
            </div>
          </div>

          <div className="p-4">
            <h3 className="font-semibold text-lg mb-2 line-clamp-2 group-hover:text-primary transition-colors">
              {item.title}
            </h3>

            {item.description && (
              <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                {item.description}
              </p>
            )}

            <div className="flex items-center text-xs text-muted-foreground">
              <Calendar className="h-3 w-3 mr-1" />
              {new Date(item.createdAt).toLocaleDateString()}
            </div>
          </div>
        </CardContent>
      </Card>

      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] p-0">
          <DialogHeader className="p-6 pb-0">
            <DialogTitle className="text-xl font-semibold">
              {item.title}
            </DialogTitle>
          </DialogHeader>

          <div className="px-6 pb-6">
            <div className="relative mb-4">
              {item.type === "photo" ? (
                <div className="relative aspect-video max-h-[60vh] overflow-hidden rounded-lg">
                  <Image
                    src={detectImageSourceType(item.url) || "/placeholder.svg"}
                    alt={item.title}
                    fill
                    className="object-contain"
                  />
                </div>
              ) : (
                <div className="aspect-video max-h-[60vh] rounded-lg overflow-hidden">
                  <iframe
                    src={getYouTubeEmbedUrl(item.url)}
                    title={item.title}
                    className="w-full h-full"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
              )}
            </div>

            {item.description && (
              <div className="mb-4">
                <h4 className="font-medium mb-2">Description</h4>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {item.description}
                </p>
              </div>
            )}

            <div className="flex items-center justify-between text-sm text-muted-foreground">
              <div className="flex items-center gap-4">
                <Badge
                  variant={item.type === "photo" ? "default" : "secondary"}
                >
                  {item.type === "photo" ? "Photo" : "Video"}
                </Badge>
                <div className="flex items-center">
                  <Calendar className="h-3 w-3 mr-1" />
                  Created: {new Date(item.createdAt).toLocaleDateString()}
                </div>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
