import PreviewPDF from "@/components/shared/pdf/preview";
import Title from "@/components/shared/title";
import { getData } from "@/lib/getData";
import { INotice } from "@/types/notices";

interface Props {
  params: {
    id?: string;
  };
}

const NoticeIDwithDetails = async ({ params }: Props) => {
  const id = params.id;

  if (!id) {
    return (
      <div>
        <Title text="নোটিশ এর বিবরণ" />
        <div className="text-center text-red-500 mt-4">
          নোটিশ আইডি পাওয়া যায়নি।
        </div>
      </div>
    );
  }

  const { notice }: { notice: INotice } = await getData(`/api/notices/${id}`);

  return (
    <div>
      <Title text="নোটিশ এর বিবরণ" />

      <div>
        <h3 className="text-lg font-medium md:text-2xl border-b border-gray-300 mb-3 pb-3 text-center">
          {notice.title}
        </h3>
        <PreviewPDF path={notice.docPath} />
      </div>
    </div>
  );
};

export default NoticeIDwithDetails;
