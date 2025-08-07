/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Users,
  UserCog,
  BookOpen,
  GraduationCap,
  Video,
  Award,
  Percent,
  Newspaper,
  Images,
} from "lucide-react";
import {
  PieChart,
  Pie,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Legend,
  ResponsiveContainer,
  Cell,
  CartesianGrid,
} from "recharts";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

interface DashboardDataType {
  totalStaff: number;
  totalAdmissions: number;
  totalStudents: number;
  studentGender: { male: number; female: number };
  totalTeachers: number;
  totalPosts: number;
  totalGalleryItems: { photos: number; videos: number };
  totalHonoredStudents: number;
  averageGPA: number;
  gradeDistribution: {
    APlus: number;
    A: number;
    AMinus: number;
    B: number;
    C: number;
    D: number;
    F: number;
  };
  userRoles: {
    admin: number;
    principal: number;
    teacher: number;
    student: number;
  };
}

interface DashboardStatsProps {
  data: DashboardDataType;
}

export function DashboardStats({ data }: DashboardStatsProps) {
  const totalStudentsInGender =
    data.studentGender.male + data.studentGender.female;
  const malePercentage =
    totalStudentsInGender > 0
      ? ((data.studentGender.male / totalStudentsInGender) * 100).toFixed(1)
      : "0";
  const femalePercentage =
    totalStudentsInGender > 0
      ? ((data.studentGender.female / totalStudentsInGender) * 100).toFixed(1)
      : "0";

  const totalGrades = Object.values(data.gradeDistribution).reduce(
    (sum, count) => sum + count,
    0
  );

  return (
    <div className="flex flex-col min-h-screen py-3">
      <h1 className="text-3xl font-bold mb-6">Dashboard Overview</h1>

      {/* Key Metrics Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mb-8">
        <Card className="">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">
              Total Students
            </CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{data.totalStudents}</div>
            <p className="text-xs text-muted-foreground">
              Overall student count
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Staff</CardTitle>
            <UserCog className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{data.totalStaff}</div>
            <p className="text-xs text-muted-foreground">
              Including teachers and admin
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">
              Total Teachers
            </CardTitle>
            <BookOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{data.totalTeachers}</div>
            <p className="text-xs text-muted-foreground">Dedicated educators</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">
              Total Admissions
            </CardTitle>
            <GraduationCap className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{data.totalAdmissions}</div>
            <p className="text-xs text-muted-foreground">
              New students admitted
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Posts</CardTitle>
            <Newspaper className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{data.totalPosts}</div>
            <p className="text-xs text-muted-foreground">
              News and announcements
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">
              Honored Students
            </CardTitle>
            <Award className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {data.totalHonoredStudents}
            </div>
            <p className="text-xs text-muted-foreground">
              Students with high achievements
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Average GPA</CardTitle>
            <Percent className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {data.averageGPA.toFixed(2)}
            </div>
            <p className="text-xs text-muted-foreground">Overall student GPA</p>
          </CardContent>
        </Card>
      </div>

      {/* Distribution and Other Data */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Student Gender Distribution</CardTitle>
            <CardDescription>Breakdown of students by gender.</CardDescription>
          </CardHeader>
          <CardContent className="h-[200px] flex items-center justify-center">
            <ChartContainer
              config={{
                male: {
                  label: "Male",
                  color: "hsl(210 40% 96.1%)", // A light blue/gray for male
                },
                female: {
                  label: "Female",
                  color: "hsl(330 80% 70%)", // A soft pink for female
                },
              }}
              className="w-full h-full"
            >
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <ChartTooltip
                    cursor={false}
                    content={<ChartTooltipContent nameKey="name" />}
                  />
                  <Pie
                    data={[
                      {
                        name: "Male",
                        value: data.studentGender.male,
                        fill: "var(--color-male)",
                      },
                      {
                        name: "Female",
                        value: data.studentGender.female,
                        fill: "var(--color-female)",
                      },
                    ]}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    labelLine={false}
                    label={({ name, percent }) =>
                      `${name} ${(percent * 100).toFixed(0)}%`
                    }
                  >
                    <Cell key={`cell-male`} fill="hsl(210 40% 96.1%)" />
                    <Cell key={`cell-female`} fill="hsl(330 80% 70%)" />
                  </Pie>
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Gallery Items</CardTitle>
            <CardDescription>
              Total photos and videos in the gallery.
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Images className="h-5 w-5 text-muted-foreground" />
                <span>Photos</span>
              </div>
              <div className="font-semibold">
                {data.totalGalleryItems.photos}
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Video className="h-5 w-5 text-muted-foreground" />
                <span>Videos</span>
              </div>
              <div className="font-semibold">
                {data.totalGalleryItems.videos}
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>User Roles</CardTitle>
            <CardDescription>Number of users per role.</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4">
            {Object.entries(data.userRoles).map(([role, count]) => (
              <div key={role} className="flex items-center justify-between">
                <span className="capitalize">{role}</span>
                <span className="font-semibold">{count}</span>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="lg:col-span-3">
          <CardHeader>
            <CardTitle>Grade Distribution</CardTitle>
            <CardDescription>Breakdown of student grades.</CardDescription>
          </CardHeader>
          <CardContent className="h-[250px]">
            <ChartContainer
              config={{
                APlus: { label: "A+", color: "hsl(142.1 76.2% 36.3%)" }, // Green
                A: { label: "A", color: "hsl(142.1 76.2% 46.3%)" },
                AMinus: { label: "A-", color: "hsl(142.1 76.2% 56.3%)" },
                B: { label: "B", color: "hsl(48 96% 50%)" }, // Yellow
                C: { label: "C", color: "hsl(24.6 95% 53.1%)" }, // Orange
                D: { label: "D", color: "hsl(0 84.2% 60.2%)" }, // Red
                F: { label: "F", color: "hsl(0 84.2% 70.2%)" },
              }}
              className="w-full h-full"
            >
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={Object.entries(data.gradeDistribution).map(
                    ([grade, count]) => ({
                      grade,
                      count,
                    })
                  )}
                  margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid vertical={false} strokeDasharray="3 3" />
                  <XAxis dataKey="grade" tickLine={false} axisLine={false} />
                  <YAxis />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Bar
                    dataKey="count"
                    fill="var(--color-APlus)"
                    radius={[4, 4, 0, 0]}
                  >
                    {Object.entries(data.gradeDistribution).map(
                      ([grade, count]) => (
                        <Cell
                          key={`cell-${grade}`}
                          fill={`var(--color-${grade})`}
                        />
                      )
                    )}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
