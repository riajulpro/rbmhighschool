"use client";

import type * as React from "react";
import {
  Home,
  Settings,
  Users,
  FileText,
  GraduationCap,
  Shield,
  Building,
  GalleryThumbnailsIcon as Gallery,
  Award,
  School,
  Newspaper,
  ClipboardList,
  CalendarDays,
  Briefcase,
  UserIcon as UserGraduate,
  UserCog,
  Building2,
  User2,
  ChevronUp,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import { signOut, useSession } from "next-auth/react";
import { usePathname } from "next/navigation";

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { data: session } = useSession();
  const path = usePathname();

  const isCurrentPath = (url: string) => {
    if (url === path) {
      return true;
    }

    return false;
  };

  const data = {
    user: {
      name: session?.user?.name,
      email: session?.user?.email,
      avatar: "/placeholder.svg?height=32&width=32",
    },
    navMain: [
      {
        title: "Dashboard",
        url: "/dashboard",
        icon: Home,
      },
      {
        title: "Notices",
        url: "/dashboard/notices",
        icon: FileText,
      },
      {
        title: "Students",
        url: "/dashboard/students",
        icon: Users,
      },
      {
        title: "Admissions",
        url: "/dashboard/admissions",
        icon: GraduationCap,
      },
      {
        title: "Authorities",
        url: "/dashboard/authorities",
        icon: Shield,
      },
      {
        title: "Facilities",
        url: "/dashboard/facilities",
        icon: Building,
      },
      {
        title: "Gallery",
        url: "/dashboard/gallery",
        icon: Gallery,
      },
      {
        title: "Honored Students",
        url: "/dashboard/honored-students",
        icon: Award,
      },
      {
        title: "Institution Info",
        url: "/dashboard/institution",
        icon: School,
      },
      {
        title: "Blog Posts",
        url: "/dashboard/posts",
        icon: Newspaper,
      },
      {
        title: "Results",
        url: "/dashboard/results",
        icon: ClipboardList,
      },
      {
        title: "Class Routines",
        url: "/dashboard/class-routines",
        icon: CalendarDays,
      },
      {
        title: "Staff",
        url: "/dashboard/staff",
        icon: Briefcase,
      },
      {
        title: "Teachers",
        url: "/dashboard/teachers",
        icon: UserGraduate,
      },
      {
        title: "Users",
        url: "/dashboard/users",
        icon: UserCog,
      },
    ],
    navSecondary: [
      {
        title: "Settings",
        url: "#",
        icon: Settings,
      },
    ],
  };

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <Link href="/">
                <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                  <Building2 className="size-4" />
                </div>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold">
                    RBM High School
                  </span>
                  <span className="truncate text-xs">Control Panel</span>
                </div>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Platform</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {data.navMain.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild isActive={isCurrentPath(item.url)}>
                    <Link href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarGroup>
          <SidebarGroupLabel>Tools</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {data.navSecondary.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton
                  size="lg"
                  className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
                >
                  <User2 className="size-4" />
                  <div className="grid flex-1 text-left text-sm leading-tight">
                    <span className="truncate font-semibold">
                      {data.user.name}
                    </span>
                    <span className="truncate text-xs">{data.user.email}</span>
                  </div>
                  <ChevronUp className="ml-auto size-4" />
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
                side="bottom"
                align="end"
                sideOffset={4}
              >
                <DropdownMenuItem>
                  <Settings />
                  Settings
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <button onClick={() => signOut()}>Sign Out</button>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
