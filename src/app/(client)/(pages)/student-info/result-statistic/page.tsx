import { getData } from "@/lib/getData";
import ResultStatisticContainer from "./_components/result-statistic-container";

const StudentResultStatistic = async () => {
  const data = await getData("/api/exam-results");

  const dummyData = [
    {
      year: "2025",
      exam: "SSC",
      totalExaminee: 80,
      totalPassed: 70,
      totalFailed: 10,
      totalPassPercentage: 87.5,
      totalFailPercentage: 12.5,
      totalPassMale: 35,
      totalPassFemale: 35,
      totalAPlus: 10,
      totalAGrade: 20,
      totalAMinus: 5,
      totalB: 20,
      totalC: 10,
      totalD: 5,
    },
  ];

  return <ResultStatisticContainer statistics={data || dummyData} />;
};

export default StudentResultStatistic;
