import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { IInstitutionInfo } from "@/types/index";
import { Mail, Phone, MapPin } from "lucide-react";

interface InstitutionInfoCardProps {
  institution: IInstitutionInfo;
}

export default function InstitutionInfoCard({
  institution,
}: InstitutionInfoCardProps) {
  return (
    <div className="w-full max-w-4xl mx-auto bg-white shadow-md p-6 space-y-6 rounded-md">
      {/* Header */}
      <div className="flex flex-col items-center text-center space-y-3">
        <Avatar className="h-24 w-24 rounded-none">
          <AvatarImage
            src={institution.logo || "/placeholder.svg"}
            alt={institution.name}
          />
          <AvatarFallback className="text-2xl font-bold">
            {institution.name
              ?.split(" ")
              .map((n) => n[0])
              .join("")
              .toUpperCase() || "I"}
          </AvatarFallback>
        </Avatar>
        <h2 className="text-2xl font-semibold">{institution.name}</h2>
        {institution.establishedDate && (
          <Badge variant="default">
            স্থাপিত: {institution.establishedDate}
          </Badge>
        )}
        {institution.shortInfo && (
          <p className="text-muted-foreground">{institution.shortInfo}</p>
        )}
      </div>

      {/* Contact Info */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <h3 className="font-semibold text-lg border-b pb-1">যোগাযোগ</h3>
          <p className="flex items-center gap-2 text-sm">
            <Mail className="h-4 w-4 text-muted-foreground" />
            {institution.contactEmail}
          </p>
          <p className="flex items-center gap-2 text-sm">
            <Phone className="h-4 w-4 text-muted-foreground" />
            {institution.phone}
          </p>
          <p className="flex items-center gap-2 text-sm">
            <MapPin className="h-4 w-4 text-muted-foreground" />
            {institution.location}
          </p>
          <p className="text-sm">{institution.fullAddress}</p>
        </div>

        <div className="space-y-2">
          <h3 className="font-semibold text-lg border-b pb-1">
            প্রাতিষ্ঠানিক কোড সমূহ
          </h3>
          {institution.eiinNumber && (
            <p>
              <strong>ইন নম্বর:</strong> {institution.eiinNumber}
            </p>
          )}
          {institution.schoolCode && (
            <p>
              <strong>প্রতিষ্ঠান কোড:</strong> {institution.schoolCode}
            </p>
          )}
          {institution.mpoCode && (
            <p>
              <strong>এমপিও কোড:</strong> {institution.mpoCode}
            </p>
          )}
          {institution.boardCode && (
            <p>
              <strong>বোর্ড কোড:</strong> {institution.boardCode}
            </p>
          )}
          {institution.centreCode && (
            <p>
              <strong>কেন্দ্র কোড:</strong> {institution.centreCode}
            </p>
          )}
          {institution.stipendCode && (
            <p>
              <strong>উপবৃত্তি কোড:</strong> {institution.stipendCode}
            </p>
          )}
        </div>
      </div>

      {/* Acknowledgements */}
      <div className="space-y-2">
        <h3 className="font-semibold text-lg border-b pb-1">
          একাডেমিক স্বীকৃতি
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
          {institution.firstAcknowledgementDate && (
            <p>
              <strong>প্রথম:</strong> {institution.firstAcknowledgementDate}
            </p>
          )}
          {institution.recentAcknowledgementDate && (
            <p>
              <strong>সর্বশেষ:</strong> {institution.recentAcknowledgementDate}
            </p>
          )}
          {institution.mpoAssignmentDate && (
            <p>
              <strong>এমপিওভুক্তির তারিখ:</strong>{" "}
              {institution.mpoAssignmentDate}
            </p>
          )}
        </div>
      </div>

      {/* About */}
      {institution.about ? (
        <div>
          <h3 className="font-semibold text-lg border-b pb-1">
            আমাদের সম্পর্কে
          </h3>
          <p className="text-sm text-muted-foreground leading-relaxed">
            {institution.about}
          </p>
        </div>
      ) : (
        <p className="text-sm text-muted-foreground leading-relaxed text-justify">
          আমরা এখানে আপনাকে একটি আদর্শ শিক্ষামূলক পরিবেশে স্বাগত জানাচ্ছি।
          আমাদের লক্ষ্য হল ছাত্র-ছাত্রীদের উন্নত শিক্ষা এবং সম্পূর্ণ ব্যক্তিত্ব
          উন্নত করা। আমরা নৈতিকতা, দায়িত্ব, এবং কর্মঠতার মাধ্যমে একটি সমৃদ্ধ
          শিক্ষামূলক পরিবেশ সৃষ্টি করতে প্রতিশ্রুত। আমাদের উদ্দেশ্য হল
          ছাত্র-ছাত্রীদের উন্নত জ্ঞান এবং প্রতিভা অর্জন করার মাধ্যমে তাদের
          শিক্ষামূলক এবং সামাজিক উন্নতি সহায়ক হতে। আমরা শিক্ষার্থীদের
          আত্মবিশ্বাস উন্নত করার জন্য বিভিন্ন শিক্ষামূলক কর্মশীলতা এবং শৃঙ্গার
          সুবিধা প্রদান করি। আমরা গর্বিত হই যে, আমাদের উচ্চতর শিক্ষক দল এবং
          সাহায্যক কর্মীরা নিয়মিতভাবে ছাত্র-ছাত্রীদের নিরাপত্তা, যত্ন এবং উন্নত
          শিক্ষামূলক পরিবেশ নিশ্চিত করতে কাজ করে। আমাদের ওপর নির্ভরযোগ্য শিক্ষক
          দল, সার্থক শিক্ষামূলক কার্যক্রম, আধুনিক শিক্ষানীতি, এবং শিক্ষার্থীদের
          উন্নত উদ্যমের মাধ্যমে আমরা শিক্ষার স্বর্গসদমে এগিয়ে যাচ্ছি। আপনার
          উদ্যম, আগ্রহ এবং সহযোগিতার মাধ্যমে আমরা একসাথে উন্নত শিক্ষামূলক পরিবেশ
          সৃষ্টি করতে যাচ্ছি।
        </p>
      )}
    </div>
  );
}
