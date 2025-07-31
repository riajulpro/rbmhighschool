import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Mail, MapPin, Phone } from "lucide-react";

interface Props {
  data: {
    name?: string;
    profileImg?: string;
    email?: string;
    phone?: string;
    institution?: string;
    specialization?: string[];
    designation?: string;
  };
}

export default function ProfileCard({ data }: Props) {
  return (
    <Card className="w-full max-w-sm overflow-hidden pt-0">
      <div className="h-20 bg-gradient-to-r from-blue-500 to-purple-600"></div>

      <CardHeader className="relative">
        <div className="flex justify-center -mt-18 mb-4">
          <Avatar className="w-24 h-24 border-4 border-white shadow-lg">
            <AvatarImage
              src={
                data?.profileImg ||
                "/placeholder.svg?height=80&width=80&text=Teacher"
              }
              alt="Sarah Johnson"
            />
            <AvatarFallback className="text-lg font-semibold bg-blue-100 text-blue-700">
              P
            </AvatarFallback>
          </Avatar>
        </div>

        {/* Teacher Info */}
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900">
            {data?.name || "Sarah Johnson"}
          </h2>
          <p className="text-lg text-blue-600 font-medium">
            {data?.designation || "Mathematics Teacher"}
          </p>
          <div className="flex items-center justify-center gap-1 text-sm text-gray-600">
            <MapPin className="w-4 h-4" />
            <span>
              {data?.institution || "Rampur Bazar Majidia High School"}
            </span>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-3">
        <Separator />
        {/* Subjects */}
        <div className="space-y-3">
          <h3 className="font-semibold text-gray-900">Specializations</h3>
          <div className="flex flex-wrap gap-2">
            {data?.specialization?.map((spec, index) => (
              <Badge
                key={index}
                variant="secondary"
                className="bg-blue-100 text-blue-700 hover:bg-blue-200"
              >
                {spec}
              </Badge>
            )) || (
              <Badge
                variant="secondary"
                className="bg-blue-100 text-blue-700 hover:bg-blue-200"
              >
                Algebra
              </Badge>
            )}
          </div>
        </div>

        <Separator />

        {/* Contact Info */}
        <div className="space-y-3">
          <h3 className="font-semibold text-gray-900">Contact Information</h3>
          <div className="space-y-2">
            <div className="flex items-center gap-3 text-sm text-gray-600">
              <Mail className="w-4 h-4 text-gray-400" />
              <span>{data?.email || "sarah.johnson@school.edu"}</span>
            </div>
            <div className="flex items-center gap-3 text-sm text-gray-600">
              <Phone className="w-4 h-4 text-gray-400" />
              <span>{data?.phone || "(555) 123-4567"}</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
