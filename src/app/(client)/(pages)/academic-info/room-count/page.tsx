import { DataTable } from "@/components/shared/data-table";
import Title from "@/components/shared/title";

export const rooms = [
  { serial: 1, name: "প্রধান শিক্ষকের কক্ষ", quantity: "১টি" },
  { serial: 2, name: "শিক্ষক মিলনায়তন কক্ষ", quantity: "" },
  { serial: 3, name: "অফিস রুম", quantity: "" },
  { serial: 4, name: "ছাত্রী কমন রুম", quantity: "" },
  { serial: 5, name: "বিজ্ঞানাগার কক্ষ", quantity: "" },
  { serial: 6, name: "গ্রন্থাগার লাইব্রেরী", quantity: "" },
  { serial: 7, name: "শেখ রাসেল ডিজিটাল ল্যাব কক্ষ", quantity: "" },
  { serial: 8, name: "শ্রেনী কক্ষ (সাধারন)", quantity: "" },
  { serial: 9, name: "ঐচ্ছিক(বিজ্ঞান)শ্রেনি কক্ষ", quantity: "" },
  { serial: 10, name: "ঐচ্ছিক(বাণিজ্য)শ্রেনি কক্ষ", quantity: "" },
  { serial: 11, name: "ঐচ্ছিক(ধর্ম)শ্রেনি কক্ষ", quantity: "" },
  { serial: 12, name: "সততা স্টোর", quantity: "" },
  { serial: 13, name: "নামাজের কক্ষ", quantity: "" },
  { serial: 14, name: "বঙ্গবন্ধু কর্ণার", quantity: "" },
  { serial: 15, name: "অডিটোরিয়াম", quantity: "" },
  { serial: 16, name: "স্টোর রুম", quantity: "" },
];

export type Room = {
  serial: number;
  name: string;
  quantity: string;
};

const page = () => {
  const columns = [
    {
      key: "serial" as keyof Room,
      header: "ক্রমিক নং",
      sortable: false,
    },
    {
      key: "name" as keyof Room,
      header: "কক্ষের নাম",
      sortable: false,
    },
    {
      key: "quantity" as keyof Room,
      header: "পরিমাণ",
      sortable: false,
    },
  ];

  return (
    <div>
      <Title text="কক্ষ সংখ্যা" />

      <DataTable data={rooms} columns={columns} searchable={false} />
    </div>
  );
};

export default page;
