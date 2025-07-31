import React from "react";
import { SessionData } from "@/types/studentCounts";

type Props = {
  session: string;
  data: SessionData;
};

const StudentCountTable: React.FC<Props> = ({ session, data }) => {
  const classNames = Object.keys(data);

  const total = classNames.reduce(
    (acc, cls) => {
      acc.male += data[cls].male;
      acc.female += data[cls].female;
      acc.total += data[cls].total;
      return acc;
    },
    { male: 0, female: 0, total: 0 }
  );

  return (
    <div className="p-4 rounded-xl shadow-md bg-white">
      <h2 className="text-xl font-bold mb-4">
        Student Count - Session {session}
      </h2>
      <table className="w-full table-auto border border-gray-300 text-left">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-2 border">Class</th>
            <th className="p-2 border">Male</th>
            <th className="p-2 border">Female</th>
            <th className="p-2 border">Total</th>
          </tr>
        </thead>
        <tbody>
          {classNames.map((className) => (
            <tr key={className}>
              <td className="p-2 border">Class {className}</td>
              <td className="p-2 border">{data[className].male}</td>
              <td className="p-2 border">{data[className].female}</td>
              <td className="p-2 border">{data[className].total}</td>
            </tr>
          ))}
          <tr className="font-bold bg-gray-50">
            <td className="p-2 border">Total</td>
            <td className="p-2 border">{total.male}</td>
            <td className="p-2 border">{total.female}</td>
            <td className="p-2 border">{total.total}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default StudentCountTable;
