import Link from "next/link";

const Notices = () => {
  return (
    <div className="rounded-sm shadow-sm hover:shadow-md transition-shadow duration-200 overflow-hidden mb-5">
      <h2 className="text-xl font-semibold bg-[#006A4E] text-center text-white py-1">
        নোটিশ
      </h2>
      <div className="flex items-center gap-2 p-2">
        <ul className="space-y-1 w-full">
          <li className="flex items-center gap-1 text-[#006A4E] hover:text-[#F42A41] border-b border-gray-50 py-2">
            <span>‣</span>
            <Link href="/">Link</Link>
          </li>
          <li className="flex items-center gap-1 text-[#006A4E] hover:text-[#F42A41] border-b border-gray-50 py-2">
            <span>‣</span>
            <Link href="/">Link</Link>
          </li>
          <li className="flex items-center gap-1 text-[#006A4E] hover:text-[#F42A41] border-b border-gray-50 py-2">
            <span>‣</span>
            <Link href="/">Link</Link>
          </li>
          <li className="flex items-center gap-1 text-[#006A4E] hover:text-[#F42A41] border-b border-gray-50 py-2">
            <span>‣</span>
            <Link href="/">Link</Link>
          </li>
          <li className="flex items-center gap-1 text-[#006A4E] hover:text-[#F42A41] border-b border-gray-50 py-2">
            <span>‣</span>
            <Link href="/">Link</Link>
          </li>
          <li className="w-full text-center font-semibold text-[#006A4E] hover:text-[#F42A41]">
            <Link href="/notices">সকল নোটিশ</Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Notices;
