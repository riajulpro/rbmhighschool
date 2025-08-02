import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { HonoredStudentCardProps } from "@/types/honored-student";
import { Calendar, Award } from "lucide-react";

export default function HonoredStudentCard({
  student,
}: HonoredStudentCardProps) {
  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((word) => word.charAt(0))
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  const formatDate = (date?: Date) => {
    if (!date) return "";
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    }).format(new Date(date));
  };

  return (
    <Card className="w-full max-w-md hover:shadow-lg transition-shadow duration-200">
      <CardHeader className="pb-4">
        <div className="flex items-start gap-4">
          <Avatar className="h-16 w-16">
            <AvatarImage
              src={
                student.photo ||
                `/placeholder.svg?height=64&width=64&text=${getInitials(
                  student.name
                )}`
              }
              alt={student.name}
            />
            <AvatarFallback className="text-lg font-semibold">
              {getInitials(student.name)}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1 space-y-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-xl font-bold">
                {student.name}
              </CardTitle>
              <Badge variant="secondary" className="flex items-center gap-1">
                <Calendar className="h-3 w-3" />
                {student.year}
              </Badge>
            </div>
            {student.createdAt && (
              <p className="text-sm text-muted-foreground">
                Honored on {formatDate(student.createdAt)}
              </p>
            )}
          </div>
        </div>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="space-y-3">
          <div className="flex items-start gap-2">
            <Award className="h-4 w-4 text-amber-500 mt-0.5 flex-shrink-0" />
            <div>
              <CardDescription className="font-medium text-foreground mb-1">
                Recognition
              </CardDescription>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {student.reason}
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
