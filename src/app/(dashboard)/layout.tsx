"use client";

import { AppSidebar } from "@/components/app-sidebar";
import { DashboardHeader } from "@/components/dashboard-header";

import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

interface Props {
  children: React.ReactNode;
}

export default function DashboardLayout({ children }: Props) {
  const { data: session } = useSession();
  const router = useRouter();

  if (!session) {
    return router.push("/sign-in");
  }

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <DashboardHeader />
        <div>{children}</div>
      </SidebarInset>
    </SidebarProvider>
  );
}
