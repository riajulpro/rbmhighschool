import { getData } from "@/lib/getData";
import { TNotices } from "@/types/notices";
import Link from "next/link";

const Notices = async () => {
  const { notices }: { notices: TNotices } = await getData(
    "/api/notices?limit=5"
  );

  return (
    <div className="rounded-sm shadow-sm hover:shadow-md transition-shadow duration-200 overflow-hidden mb-5">
      <h2 className="text-xl font-semibold bg-[#006A4E] text-center text-white py-1">
        নোটিশ
      </h2>
      <div className="flex items-center gap-2 p-2">
        <ul className="space-y-1 w-full">
          {notices.length > 0 ? (
            notices.map((notice, index) => (
              <li
                key={index}
                className="flex items-center gap-1 text-[#006A4E] hover:text-[#F42A41] border-b border-gray-50 py-2"
              >
                <span>‣</span>
                <Link href={`/notice/${notice._id}`}>{notice.title}</Link>
              </li>
            ))
          ) : (
            <li className="text-center">No data found!</li>
          )}
          <li className="w-full text-center font-semibold text-[#006A4E] hover:text-[#F42A41]">
            <Link href="/notice">সকল নোটিশ</Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Notices;
