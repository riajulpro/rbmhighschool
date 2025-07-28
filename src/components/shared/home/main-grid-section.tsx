import {
  InstitutionInfo,
  PostAndGallery,
  StudentsInfo,
  TeacherInfo,
} from "@/icons/grid-icons";
import Link from "next/link";
import React, { JSX } from "react";

const MainGridSection = () => {
  const instituteInfoStructure = [
    {
      title: "শিক্ষার্থীর তথ্য",
      slug: "student-information",
      icon: "student",
      path: "/student-info", // from navLinks
      sections: [
        {
          title: "শিক্ষার্থীর তালিকা",
          slug: "student-list",
          path: "/student-info",
        },
        {
          title: "ভর্তি প্রক্রিয়া",
          slug: "admission-process",
          path: "/admission",
        },
        { title: "ক্লাস রুটিন", slug: "class-routine", path: "/routine" },
        {
          title: "কৃত শিক্ষার্থী",
          slug: "graduated-students",
          path: "/about-us/honor-students",
        },
      ],
    },
    {
      title: "শিক্ষক ও কর্মচারী",
      slug: "teachers-and-staff",
      icon: "teacher",
      path: "/about-us/teacher-info", // represents main teacher info section
      sections: [
        {
          title: "শিক্ষকদের তালিকা",
          slug: "teacher-list",
          path: "/about-us/teacher-info",
        },
        {
          title: "প্রধান শিক্ষক এর তথ্য",
          slug: "head-teacher-info",
          path: "/about-us/head-teacher-info",
        },
        { title: "নোটিশ বোর্ড", slug: "notice-board", path: "/notice" },
        {
          title: "কর্মচারীবৃন্দ",
          slug: "staff-members",
          path: "/about-us/staff-members",
        },
      ],
    },
    {
      title: "পোস্ট ও গ্যালারী",
      slug: "post-and-gallery",
      icon: "gallery",
      path: "/gallery",
      sections: [
        {
          title: "ছবি গ্যালারী",
          slug: "photo-gallery",
          path: "/gallery/photo",
        },
        {
          title: "ভিডিও গ্যালারী",
          slug: "video-gallery",
          path: "/gallery/video",
        },
        { title: "সর্বশেষ সংবাদ", slug: "latest-news", path: "/recent-news" },
        { title: "সংবাদ ও মিডিয়া সেন্টার", slug: "news-and-media-center" },
      ],
    },
    {
      title: "প্রতিষ্ঠানের তথ্য",
      slug: "institute-information",
      icon: "institute",
      path: "/about-us", // represents the parent section
      sections: [
        {
          title: "প্রতিষ্ঠানের ইতিহাস",
          slug: "institute-history",
          path: "/about-us/institute-history",
        },
        {
          title: "পরিচালনা পরিষদ",
          slug: "management-committee",
          path: "/about-us/management-committee",
        },
        {
          title: "শূন্য পদের তালিকা",
          slug: "vacancy-list",
          path: "/academic-info/vacancy-list",
        },
        {
          title: "কক্ষ সংখ্যা",
          slug: "room-count",
          path: "/academic-info/room-count",
        },
      ],
    },
  ];

  const iconMap: Record<string, JSX.Element> = {
    student: <StudentsInfo />,
    teacher: <TeacherInfo />,
    gallery: <PostAndGallery />,
    institute: <InstitutionInfo />,
  };

  return (
    <div className="grid gap-5 grid-cols-1 md:grid-cols-2">
      {instituteInfoStructure.map((section) => (
        <div
          key={section.slug}
          className="rounded-sm shadow-sm hover:shadow-md transition-shadow duration-200 overflow-hidden"
        >
          <h2 className="text-xl font-semibold bg-[#006A4E] text-center text-white py-1">
            {section.title}
          </h2>
          <div className="flex items-center gap-2 p-2">
            <div className="h-12 w-12 text-[#006A4E]">
              {iconMap[section.icon]}
            </div>
            <ul className="space-y-1 p-2">
              {section.sections.map((subSection) => (
                <li
                  key={subSection.slug}
                  className="flex items-center gap-1 text-[#006A4E] hover:text-[#F42A41]"
                >
                  <span>‣</span>
                  <Link href={subSection.path || "#"}>{subSection.title}</Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MainGridSection;
