import type { Metadata } from "next";

import "./globals.css";
import AuthSessionProvider from "@/components/shared/session-provider";
import { getServerSession } from "next-auth";
import { Toaster } from "sonner";
import { authOptions } from "@/lib/auth";

import { Roboto } from "next/font/google";
import { Hind_Siliguri } from "next/font/google";

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-roboto",
});

const hindSiliguri = Hind_Siliguri({
  subsets: ["bengali"],
  weight: ["400", "700"],
  variable: "--font-hind-siliguri",
});

export const metadata: Metadata = {
  title: "রামপুর বাজার মজিদিয়া উচ্চ বিদ্যালয়",
  description:
    "Rampur Bazar Majidia High School, Faridgonj, Chandpur, Bangladesh",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerSession(authOptions);

  return (
    <html lang="en">
      <body
        className={`${roboto.variable} ${hindSiliguri.variable} antialiased`}
      >
        <AuthSessionProvider session={session}>{children}</AuthSessionProvider>
        <Toaster position="top-right" />
      </body>
    </html>
  );
}
