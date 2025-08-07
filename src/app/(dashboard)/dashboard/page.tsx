// import Link from "next/link";
// import { Button } from "@/components/ui/button";
// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";
// import {
//   Users,
//   FileText,
//   GraduationCap,
//   Shield,
//   Building,
//   GalleryThumbnailsIcon as Gallery,
//   Award,
//   School,
//   Newspaper,
//   ClipboardList,
//   CalendarDays,
//   Briefcase,
//   UserIcon as UserGraduate,
//   UserCog,
// } from "lucide-react";
// import { getServerSession } from "next-auth";
// import { authOptions } from "@/lib/auth";

import Spinner from "@/components/shared/spinner";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { Suspense } from "react";
import { DashboardStats } from "../../../components/dashboard-stats";

// export default async function HomePage() {
//   const session = await getServerSession(authOptions);
//   const role = session?.user?.role;

//   return (
//     <div className="container mx-auto py-10">
//       <div className="mb-8 text-center">
//         <h1 className="text-4xl font-bold mb-4">School Management System</h1>
//         <p className="text-xl text-muted-foreground">
//           Manage your school data with reusable CRUD tables
//         </p>
//       </div>

//       {role === "admin" ||
//         (role === "principal" && (
//           <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
//             <Card>
//               <CardHeader>
//                 <CardTitle className="flex items-center gap-2">
//                   <FileText className="h-5 w-5" />
//                   Notices Management
//                 </CardTitle>
//                 <CardDescription>
//                   Create, edit, and manage school notices and announcements
//                 </CardDescription>
//               </CardHeader>
//               <CardContent>
//                 <Link href="/dashboard/notices">
//                   <Button className="w-full">Manage Notices</Button>
//                 </Link>
//               </CardContent>
//             </Card>

//             <Card>
//               <CardHeader>
//                 <CardTitle className="flex items-center gap-2">
//                   <Users className="h-5 w-5" />
//                   Students Management
//                 </CardTitle>
//                 <CardDescription>
//                   Add, update, and manage student records and information
//                 </CardDescription>
//               </CardHeader>
//               <CardContent>
//                 <Link href="/dashboard/students">
//                   <Button className="w-full">Manage Students</Button>
//                 </Link>
//               </CardContent>
//             </Card>

//             <Card>
//               <CardHeader>
//                 <CardTitle className="flex items-center gap-2">
//                   <GraduationCap className="h-5 w-5" />
//                   Admissions Management
//                 </CardTitle>
//                 <CardDescription>
//                   Handle student admission applications and records
//                 </CardDescription>
//               </CardHeader>
//               <CardContent>
//                 <Link href="/dashboard/admissions">
//                   <Button className="w-full">Manage Admissions</Button>
//                 </Link>
//               </CardContent>
//             </Card>

//             <Card>
//               <CardHeader>
//                 <CardTitle className="flex items-center gap-2">
//                   <Shield className="h-5 w-5" />
//                   Authorities Management
//                 </CardTitle>
//                 <CardDescription>
//                   Manage school administration and authority members
//                 </CardDescription>
//               </CardHeader>
//               <CardContent>
//                 <Link href="/dashboard/authorities">
//                   <Button className="w-full">Manage Authorities</Button>
//                 </Link>
//               </CardContent>
//             </Card>

//             <Card>
//               <CardHeader>
//                 <CardTitle className="flex items-center gap-2">
//                   <Building className="h-5 w-5" />
//                   Facilities Management
//                 </CardTitle>
//                 <CardDescription>
//                   Track and manage school facilities and equipment
//                 </CardDescription>
//               </CardHeader>
//               <CardContent>
//                 <Link href="/dashboard/facilities">
//                   <Button className="w-full">Manage Facilities</Button>
//                 </Link>
//               </CardContent>
//             </Card>

//             <Card>
//               <CardHeader>
//                 <CardTitle className="flex items-center gap-2">
//                   <Gallery className="h-5 w-5" />
//                   School Gallery
//                 </CardTitle>
//                 <CardDescription>
//                   Showcase photos and videos of school events
//                 </CardDescription>
//               </CardHeader>
//               <CardContent>
//                 <Link href="/dashboard/gallery">
//                   <Button className="w-full">Manage Gallery</Button>
//                 </Link>
//               </CardContent>
//             </Card>

//             <Card>
//               <CardHeader>
//                 <CardTitle className="flex items-center gap-2">
//                   <Award className="h-5 w-5" />
//                   Honored Students
//                 </CardTitle>
//                 <CardDescription>
//                   Recognize and manage students honored for their achievements
//                 </CardDescription>
//               </CardHeader>
//               <CardContent>
//                 <Link href="/dashboard/honored-students">
//                   <Button className="w-full">Manage Honored Students</Button>
//                 </Link>
//               </CardContent>
//             </Card>

//             <Card>
//               <CardHeader>
//                 <CardTitle className="flex items-center gap-2">
//                   <School className="h-5 w-5" />
//                   Institution Info
//                 </CardTitle>
//                 <CardDescription>
//                   View and update core institution details
//                 </CardDescription>
//               </CardHeader>
//               <CardContent>
//                 <Link href="/dashboard/institution-info">
//                   <Button className="w-full">Manage Info</Button>
//                 </Link>
//               </CardContent>
//             </Card>

//             <Card>
//               <CardHeader>
//                 <CardTitle className="flex items-center gap-2">
//                   <Newspaper className="h-5 w-5" />
//                   Blog Posts
//                 </CardTitle>
//                 <CardDescription>
//                   Manage articles, news, and announcements
//                 </CardDescription>
//               </CardHeader>
//               <CardContent>
//                 <Link href="/dashboard/posts">
//                   <Button className="w-full">Manage Posts</Button>
//                 </Link>
//               </CardContent>
//             </Card>

//             <Card>
//               <CardHeader>
//                 <CardTitle className="flex items-center gap-2">
//                   <ClipboardList className="h-5 w-5" />
//                   Student Results
//                 </CardTitle>
//                 <CardDescription>
//                   Manage academic results and grades
//                 </CardDescription>
//               </CardHeader>
//               <CardContent>
//                 <Link href="/dashboard/results">
//                   <Button className="w-full">Manage Results</Button>
//                 </Link>
//               </CardContent>
//             </Card>

//             <Card>
//               <CardHeader>
//                 <CardTitle className="flex items-center gap-2">
//                   <CalendarDays className="h-5 w-5" />
//                   Class Routines
//                 </CardTitle>
//                 <CardDescription>Manage daily class schedules</CardDescription>
//               </CardHeader>
//               <CardContent>
//                 <Link href="/dashboard/class-routines">
//                   <Button className="w-full">Manage Routines</Button>
//                 </Link>
//               </CardContent>
//             </Card>

//             <Card>
//               <CardHeader>
//                 <CardTitle className="flex items-center gap-2">
//                   <Briefcase className="h-5 w-5" />
//                   Staff Management
//                 </CardTitle>
//                 <CardDescription>
//                   Manage non-teaching and support staff
//                 </CardDescription>
//               </CardHeader>
//               <CardContent>
//                 <Link href="/dashboard/staff">
//                   <Button className="w-full">Manage Staff</Button>
//                 </Link>
//               </CardContent>
//             </Card>

//             <Card>
//               <CardHeader>
//                 <CardTitle className="flex items-center gap-2">
//                   <UserGraduate className="h-5 w-5" />
//                   Teachers Management
//                 </CardTitle>
//                 <CardDescription>
//                   Manage profiles and details of teaching staff
//                 </CardDescription>
//               </CardHeader>
//               <CardContent>
//                 <Link href="/dashboard/teachers">
//                   <Button className="w-full">Manage Teachers</Button>
//                 </Link>
//               </CardContent>
//             </Card>

//             <Card>
//               <CardHeader>
//                 <CardTitle className="flex items-center gap-2">
//                   <UserCog className="h-5 w-5" />
//                   User Management
//                 </CardTitle>
//                 <CardDescription>
//                   Manage user accounts and roles within the system
//                 </CardDescription>
//               </CardHeader>
//               <CardContent>
//                 <Link href="/dashboard/users">
//                   <Button className="w-full">Manage Users</Button>
//                 </Link>
//               </CardContent>
//             </Card>
//           </div>
//         ))}
//     </div>
//   );
// }

const Dashboard = async () => {
  const url = `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/statistics`;
  const res = await fetch(url, { next: { revalidate: 60 } });
  const { data } = await res.json();

  const session = await getServerSession(authOptions);
  const role = session?.user?.role;

  const isAdmin =
    role === "admin" || role === "principal" || role === "teacher";

  return (
    <div>
      {isAdmin ? (
        <Suspense fallback={<Spinner />}>
          <DashboardStats data={data} />
        </Suspense>
      ) : (
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold mb-4">School Management System</h1>
          <p className="text-xl text-muted-foreground">
            Manage your school data with reusable CRUD tables
          </p>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
