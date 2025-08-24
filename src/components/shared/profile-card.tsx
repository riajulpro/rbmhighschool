"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import type { ITeacher } from "@/types/teacher";
import { Mail, MapPin, Phone, Eye, Award, User, Building } from "lucide-react";

interface Props {
  data: ITeacher;
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
                "/placeholder.svg?height=80&width=80&text=Teacher" ||
                "/placeholder.svg"
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
            {data?.userId.name || "Sarah Johnson"}
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

        {/* Specializations */}
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
              <span>{data?.userId.email || "sarah.johnson@school.edu"}</span>
            </div>
            <div className="flex items-center gap-3 text-sm text-gray-600">
              <Phone className="w-4 h-4 text-gray-400" />
              <span>{data?.phone || "(555) 123-4567"}</span>
            </div>
          </div>
        </div>

        <Separator />

        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline" className="w-full bg-transparent">
              <Eye className="w-4 h-4 mr-2" />
              View Full Details
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-3">
                <Avatar className="w-12 h-12">
                  <AvatarImage
                    src={
                      data?.profileImg ||
                      "/placeholder.svg?height=48&width=48&text=Teacher"
                    }
                    alt={data?.userId.name || "Teacher"}
                  />
                  <AvatarFallback className="bg-blue-100 text-blue-700">
                    {(data?.userId.name || "T").charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h2 className="text-xl font-bold">
                    {data?.userId.name || "Sarah Johnson"}
                  </h2>
                  <p className="text-blue-600 font-medium">
                    {data?.designation || "Mathematics Teacher"}
                  </p>
                </div>
              </DialogTitle>
            </DialogHeader>

            <div className="space-y-6 mt-4">
              {/* Basic Information */}
              <div className="space-y-3">
                <h3 className="font-semibold text-gray-900 flex items-center gap-2">
                  <User className="w-4 h-4" />
                  Basic Information
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="font-medium text-gray-700">
                      Institution:
                    </span>
                    <p className="text-gray-600">
                      {data?.institution || "Rampur Bazar Majidia High School"}
                    </p>
                  </div>
                  <div>
                    <span className="font-medium text-gray-700">
                      Department:
                    </span>
                    <p className="text-gray-600">
                      {data?.department || "Mathematics"}
                    </p>
                  </div>
                  <div>
                    <span className="font-medium text-gray-700">
                      Employee ID:
                    </span>
                    <p className="text-gray-600">
                      {data?.employeeId || "EMP001"}
                    </p>
                  </div>
                  <div>
                    <span className="font-medium text-gray-700">
                      Experience:
                    </span>
                    <p className="text-gray-600">
                      {data?.experience || "5+ years"}
                    </p>
                  </div>
                  <div>
                    <span className="font-medium text-gray-700">
                      Joining Date:
                    </span>
                    <p className="text-gray-600">
                      {data?.joiningDate
                        ? new Date(data.joiningDate).toLocaleDateString()
                        : "January 2020"}
                    </p>
                  </div>
                </div>
              </div>

              <Separator />

              {/* Contact Information */}
              <div className="space-y-3">
                <h3 className="font-semibold text-gray-900 flex items-center gap-2">
                  <Mail className="w-4 h-4" />
                  Contact Information
                </h3>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-3">
                    <Mail className="w-4 h-4 text-gray-400" />
                    <span>
                      {data?.userId.email || "sarah.johnson@school.edu"}
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Phone className="w-4 h-4 text-gray-400" />
                    <span>{data?.phone || "(555) 123-4567"}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <MapPin className="w-4 h-4 text-gray-400" />
                    <span>
                      {data?.institution || "Rampur Bazar Majidia High School"}
                    </span>
                  </div>
                </div>
              </div>

              <Separator />

              {/* Specializations */}
              <div className="space-y-3">
                <h3 className="font-semibold text-gray-900 flex items-center gap-2">
                  <Building className="w-4 h-4" />
                  Specializations
                </h3>
                <div className="flex flex-wrap gap-2">
                  {data?.specialization?.map((spec, index) => (
                    <Badge
                      key={index}
                      variant="secondary"
                      className="bg-blue-100 text-blue-700"
                    >
                      {spec}
                    </Badge>
                  )) || (
                    <Badge
                      variant="secondary"
                      className="bg-blue-100 text-blue-700"
                    >
                      Algebra
                    </Badge>
                  )}
                </div>
              </div>

              {/* Skills & Certifications */}
              {data?.skills && data.skills.length > 0 && (
                <>
                  <Separator />
                  <div className="space-y-3">
                    <h3 className="font-semibold text-gray-900 flex items-center gap-2">
                      <Award className="w-4 h-4" />
                      Skills & Certifications
                    </h3>
                    <div className="grid gap-4">
                      {data.skills.map((skill, index) => (
                        <div
                          key={index}
                          className="bg-gray-50 p-4 rounded-lg border"
                        >
                          <div className="flex items-center gap-2 mb-2">
                            <Award className="w-4 h-4 text-blue-600" />
                            <h4 className="font-medium text-gray-900">
                              {skill.title}
                            </h4>
                          </div>
                          {skill.description && (
                            <p className="text-sm text-gray-600 mb-2">
                              {skill.description}
                            </p>
                          )}
                          <div className="flex items-center justify-between text-xs text-gray-500">
                            {skill.completionDate && (
                              <span>
                                Completed:{" "}
                                {new Date(
                                  skill.completionDate
                                ).toLocaleDateString()}
                              </span>
                            )}
                            {skill.certificateUrl && (
                              <a
                                href={skill.certificateUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-600 hover:underline"
                              >
                                View Certificate
                              </a>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </>
              )}
            </div>
          </DialogContent>
        </Dialog>
      </CardContent>
    </Card>
  );
}
