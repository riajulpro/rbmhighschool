const PrincipalDetails = () => {
  return (
    <div className="rounded-sm shadow-sm overflow-hidden">
      <h2 className="text-xl font-semibold bg-[#006A4E] text-center text-white py-1">
        প্রধান শিক্ষক
      </h2>
      <div className="flex flex-col items-center gap-1 p-2">
        <div className="rounded-xl h-[320px] w-full bg-gray-50 overflow-hidden"></div>
        <div className="text-center">
          <h3 className="text-lg font-medium">Faruqul Islam</h3>
          <p className="text-sm text-slate-700">designation & qualification</p>
        </div>
      </div>
    </div>
  );
};

export default PrincipalDetails;
