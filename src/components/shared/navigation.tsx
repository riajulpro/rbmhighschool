"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

const navLinks = [
  {
    title: "প্রচ্ছদ",
    path: "/",
  },
  {
    title: "আমাদের সম্পর্কে",
    path: "/about-us",
    children: [
      { title: "প্রধান শিক্ষক এর তথ্য", path: "/about-us/head-teacher-info" },
      { title: "প্রতিষ্ঠানের ইতিহাস", path: "/about-us/institute-history" },
      { title: "পরিচালনা পর্ষদ", path: "/about-us/management-committee" },
      { title: "শিক্ষকদের তথ্য", path: "/about-us/teacher-info" },
      { title: "কর্মচারীবৃন্দ", path: "/about-us/staff-members" },
      { title: "কৃতি শিক্ষার্থী", path: "/about-us/honor-students" },
    ],
  },
  {
    title: "শিক্ষার্থীর তথ্য",
    path: "/student-info",
  },
  {
    title: "একাডেমিক তথ্য",
    path: "/academic-info",
    children: [
      { title: "কক্ষ সংখ্যা", path: "/academic-info/room-count" },
      { title: "কম্পিউটার-ব্যবহার", path: "/academic-info/computer-usage" },
      { title: "শূণ্যপদের তালিকা", path: "/academic-info/vacancy-list" },
      { title: "ছুটির তালিকা", path: "/academic-info/holiday-list" },
      { title: "সহপাঠ", path: "/academic-info/co-curricular" },
    ],
  },
  {
    title: "ভর্তি কার্যক্রম",
    path: "/admission",
  },
  {
    title: "রুটিন",
    path: "/routine",
  },
  {
    title: "নোটিশ",
    path: "/notice",
  },
  {
    title: "গ্যালারী",
    path: "/gallery",
    children: [
      { title: "ছবি গ্যালারী", path: "/gallery/photo" },
      { title: "ভিডিও গ্যালারি", path: "/gallery/video" },
    ],
  },
  {
    title: "সাম্প্রতিক খবর",
    path: "/recent-news",
  },
  {
    title: "যোগাযোগ",
    path: "/contact",
  },
  {
    title: "প্রবেশ",
    path: "/sign-in",
  },
];

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-[#006A4E] shadow-lg">
      <div className="flex justify-between items-center h-auto sticky top-0 z-50">
        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center justify-between w-full space-x-1">
          {navLinks.map((link, index) => (
            <div key={index} className="relative group text-sm text-nowrap">
              {link.children ? (
                <div className="relative">
                  <button className="flex items-center px-3 py-3 text-white hover:bg-[#F42A41] hover:text-white transition-colors duration-200 font-medium">
                    {link.title}
                    <ChevronDown className="ml-1 h-4 w-4" />
                  </button>

                  {/* Dropdown Menu */}
                  <div className="absolute left-0 mt-1 w-64 bg-white rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                    <div className="py-2">
                      {link.children.map((child, childIndex) => (
                        <Link
                          key={childIndex}
                          href={child.path}
                          className="block px-4 py-2 text-gray-800 hover:bg-[#F42A41] hover:text-white transition-colors duration-200"
                        >
                          {child.title}
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                <Link
                  href={link.path}
                  className="px-3 py-3 text-white hover:bg-[#F42A41] hover:text-white transition-colors duration-200 font-medium block"
                >
                  {link.title}
                </Link>
              )}
            </div>
          ))}
        </div>

        {/* Mobile Menu Button */}
        <div className="lg:hidden">
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="text-white hover:bg-[#F42A41]"
              >
                <Menu className="h-8 w-8" />
                <span className="sr-only">Open menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-80 bg-white p-0">
              <div className="bg-[#006A4E] p-4">
                <h2 className="text-white text-lg font-semibold">মেনু</h2>
              </div>

              {/* Mobile Navigation */}
              <div className="py-4">
                {navLinks.map((link, index) => (
                  <div key={index}>
                    {link.children ? (
                      <Collapsible>
                        <CollapsibleTrigger className="flex items-center justify-between w-full px-4 py-3 text-left text-gray-800 hover:bg-[#F42A41] hover:text-white transition-colors duration-200">
                          {link.title}
                          <ChevronDown className="h-4 w-4" />
                        </CollapsibleTrigger>
                        <CollapsibleContent>
                          <div className="bg-gray-50">
                            {link.children.map((child, childIndex) => (
                              <Link
                                key={childIndex}
                                href={child.path}
                                className="block px-8 py-2 text-gray-700 hover:bg-[#006A4E] hover:text-white transition-colors duration-200"
                                onClick={() => setIsOpen(false)}
                              >
                                {child.title}
                              </Link>
                            ))}
                          </div>
                        </CollapsibleContent>
                      </Collapsible>
                    ) : (
                      <Link
                        href={link.path}
                        className="block px-4 py-3 text-gray-800 hover:bg-[#F42A41] hover:text-white transition-colors duration-200"
                        onClick={() => setIsOpen(false)}
                      >
                        {link.title}
                      </Link>
                    )}
                  </div>
                ))}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
}
