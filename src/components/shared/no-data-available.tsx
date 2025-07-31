import { ShieldAlert } from "lucide-react";

const NoDataAvailable = ({ field }: { field?: string }) => {
  return (
    <div className="flex justify-center items-center flex-col min-h-screen gap-3">
      <ShieldAlert className="text-slate-600 h-16 w-16" />
      <h2 className="text-lg font-medium text-slate-800">
        No data available for {field}
      </h2>
    </div>
  );
};

export default NoDataAvailable;
