import Image from "next/image";
import { Mail, MapPin, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface HeadTeacherProps {
  name: string;
  designation: string;
  institution: string;
  contactNumber: string;
  contactEmail: string;
  profilePicture: string;
  quote?: string;
}

export default function HeadTeacherCard({
  name,
  designation,
  institution,
  contactNumber,
  contactEmail,
  profilePicture,
  quote,
}: HeadTeacherProps) {
  return (
    <Card className="w-full max-w-sm mx-auto rounded-lg shadow-lg overflow-hidden">
      <CardHeader className="bg-[#006A4E] py-3 text-center">
        <CardTitle className="text-xl font-semibold text-white">
          প্রধান শিক্ষক
        </CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col items-center gap-4 p-6">
        <div className="relative h-80 w-full rounded-lg overflow-hidden bg-gray-100 dark:bg-gray-800">
          <Image
            src={profilePicture || "/placeholder.svg"}
            alt={name}
            fill
            style={{ objectFit: "cover", objectPosition: "center top" }}
            className="transition-transform duration-300 hover:scale-105"
          />
        </div>
        <div className="text-slate-800 dark:text-slate-200 w-full text-center">
          <h3 className="font-bold text-2xl mb-1">{name}</h3>
          <p className="text-lg text-muted-foreground">{designation}</p>
          {quote && (
            <p className="mt-3 italic text-sm text-gray-600 dark:text-gray-400">
              <q>{quote}</q>
            </p>
          )}
        </div>
        <div className="w-full space-y-2 text-sm text-gray-700 dark:text-gray-300">
          <h4 className="font-semibold text-base mt-4">যোগাযোগের তথ্য:</h4>
          <p className="flex items-center gap-2">
            <MapPin className="h-4 w-4 text-slate-500 dark:text-slate-400" />
            {institution}
          </p>
          <p className="flex items-center gap-2">
            <Phone className="h-4 w-4 text-slate-500 dark:text-slate-400" />
            {contactNumber}
          </p>
          <p className="flex items-center gap-2">
            <Mail className="h-4 w-4 text-slate-500 dark:text-slate-400" />
            {contactEmail}
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-3 w-full mt-4">
          <Button
            asChild
            className="flex-1 bg-green-600 hover:bg-green-700 text-white"
          >
            <a href={`tel:${contactNumber}`}>
              <Phone className="h-4 w-4 mr-2" />
              কল করুন
            </a>
          </Button>
          <Button
            asChild
            className="flex-1 bg-blue-600 hover:bg-blue-700 text-white"
          >
            <a href={`mailto:${contactEmail}`}>
              <Mail className="h-4 w-4 mr-2" />
              ইমেইল করুন
            </a>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
