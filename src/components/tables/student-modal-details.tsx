"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  User,
  Phone,
  MapPin,
  Calendar,
  GraduationCap,
  Users,
} from "lucide-react";
import type { IStudent } from "@/types/index";

interface StudentDetailsModalProps {
  student: IStudent | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function StudentDetailsModal({
  student,
  open,
  onOpenChange,
}: StudentDetailsModalProps) {
  if (!student) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-xl">
            <User className="h-5 w-5" />
            Student Details
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Basic Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <GraduationCap className="h-4 w-4" />
                Basic Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-muted-foreground">
                    Student Name
                  </label>
                  <p className="text-base font-semibold">
                    {student.studentName}
                  </p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">
                    Roll Number
                  </label>
                  <p className="text-base">{student.rollNumber}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">
                    Class
                  </label>
                  <Badge variant="secondary" className="text-sm">
                    Class {student.class}
                  </Badge>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">
                    Section
                  </label>
                  <Badge variant="outline" className="text-sm">
                    Section {student.section}
                  </Badge>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">
                    Session
                  </label>
                  <p className="text-base">{student.session}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">
                    Gender
                  </label>
                  <p className="text-base capitalize">{student.gender}</p>
                </div>
              </div>

              <Separator />

              <div>
                <label className="text-sm font-medium text-muted-foreground flex items-center gap-1">
                  <Calendar className="h-3 w-3" />
                  Date of Birth
                </label>
                <p className="text-base">
                  {new Date(student.dob).toLocaleDateString()}
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Family Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <Users className="h-4 w-4" />
                Family Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-muted-foreground">
                    {`Father's Name`}
                  </label>
                  <p className="text-base">{student.fatherName}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">
                    {`Mother's Name`}
                  </label>
                  <p className="text-base">{student.motherName}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">
                    Guardian Name
                  </label>
                  <p className="text-base">{student.guardianName}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground flex items-center gap-1">
                    <Phone className="h-3 w-3" />
                    Guardian Phone
                  </label>
                  <p className="text-base font-mono">{student.guardianPhone}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Address Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <MapPin className="h-4 w-4" />
                Address Information
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div>
                <label className="text-sm font-medium text-muted-foreground">
                  Address
                </label>
                <p className="text-base leading-relaxed">{student.address}</p>
              </div>
            </CardContent>
          </Card>

          {/* Timestamps */}
          {(student.createdAt || student.updatedAt) && (
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Record Information</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-muted-foreground">
                  {student.createdAt && (
                    <div>
                      <label className="font-medium">Created At</label>
                      <p>{new Date(student.createdAt).toLocaleString()}</p>
                    </div>
                  )}
                  {student.updatedAt && (
                    <div>
                      <label className="font-medium">Last Updated</label>
                      <p>{new Date(student.updatedAt).toLocaleString()}</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
