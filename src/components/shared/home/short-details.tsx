import Image from "next/image";
import brandImg from "../../../../public/images/brand_img.jpg";

const ShortDetails = () => {
  return (
    <div className="rounded-sm shadow-sm overflow-hidden my-3 md:mt-0 md:mb-5">
      <h2 className="text-xl font-semibold bg-[#006A4E] text-center text-white py-1">
        রামপুর বাজার মজিদিয়া উচ্চ বিদ্যালয়
      </h2>
      <div className="p-2 grid grid-cols-1 md:grid-cols-2 gap-3">
        <div className="h-[320px] rounded-lg bg-gray-100 overflow-hidden">
          <Image
            src={brandImg}
            alt="Brand Image"
            className="h-full w-full object-cover object-left"
          />
        </div>
        <div className="text-justify">
          আমরা এখানে আপনাকে একটি আদর্শ শিক্ষামূলক পরিবেশে স্বাগত জানাচ্ছি।
          আমাদের লক্ষ্য হল ছাত্র-ছাত্রীদের উন্নত শিক্ষা এবং সম্পূর্ণ ব্যক্তিত্ব
          উন্নত করা। আমরা নৈতিকতা, দায়িত্ব, এবং কর্মঠতার মাধ্যমে একটি সমৃদ্ধ
          শিক্ষামূলক পরিবেশ সৃষ্টি করতে প্রতিশ্রুত। আমাদের উদ্দেশ্য হল
          ছাত্র-ছাত্রীদের উন্নত জ্ঞান এবং প্রতিভা অর্জন করার মাধ্যমে তাদের
          শিক্ষামূলক এবং সামাজিক উন্নতি সহায়ক হতে। আমরা শিক্ষার্থীদের
          আত্মবিশ্বাস উন্নত করার জন্য বিভিন্ন শিক্ষামূলক কর্মশীলতা এবং শৃঙ্গার
          সুবিধা প্রদান করি। আমরা গর্বিত হই যে, আমাদের উচ্চতর শিক্ষক দল উন্নত
          শিক্ষামূলক পরিবেশ নিশ্চিত করতে কাজ করে।
        </div>
      </div>
    </div>
  );
};

export default ShortDetails;
