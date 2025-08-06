import Image from "next/image";
import Link from "next/link";
import { Mail, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

interface HeadTeacherShortProps {
  name: string;
  designation: string;
  profilePicture: string;
  contactNumber: string;
  contactEmail: string;
  href: string; // Link for the entire card
}

export default function HeadTeacherCardShort({
  name,
  designation,
  profilePicture,
  contactNumber,
  contactEmail,
  href,
}: HeadTeacherShortProps) {
  return (
    <Card className="w-full mx-auto rounded-lg shadow-md overflow-hidden group hover:shadow-lg transition-shadow duration-200">
      <Link href={href} className="block">
        <CardContent className="flex flex-col items-center p-4 pb-2">
          <div className="relative h-32 w-32 rounded-full overflow-hidden bg-gray-100 dark:bg-gray-800 mb-3">
            <Image
              src={profilePicture || "/placeholder.svg"}
              alt={name}
              fill
              style={{ objectFit: "cover", objectPosition: "center top" }}
              className="transition-transform duration-300 group-hover:scale-105"
            />
          </div>
          <div className="text-center">
            <h3 className="font-bold text-lg text-slate-800 dark:text-slate-200">
              {name}
            </h3>
            <p className="text-sm text-muted-foreground">{designation}</p>
          </div>
        </CardContent>
      </Link>
      <div className="flex justify-center gap-2 p-4 pt-0">
        <Button
          asChild
          size="sm"
          className="flex-1 bg-green-600 hover:bg-green-700 text-white"
        >
          <a href={`tel:${contactNumber}`}>
            <Phone className="h-4 w-4" />
            <span className="sr-only">Call {name}</span>
          </a>
        </Button>
        <Button
          asChild
          size="sm"
          className="flex-1 bg-blue-600 hover:bg-blue-700 text-white"
        >
          <a href={`mailto:${contactEmail}`}>
            <Mail className="h-4 w-4" />
            <span className="sr-only">Email {name}</span>
          </a>
        </Button>
      </div>
    </Card>
  );
}
