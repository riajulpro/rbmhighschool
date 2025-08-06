import { headTeacherData } from "src/data/head-teacher-data";
import HeadTeacherCardShort from "./head-teacher-card-short";

const PrincipalDetails = () => {
  return (
    <HeadTeacherCardShort
      {...headTeacherData}
      href="/about-us/head-teacher-info"
    />
  );
};

export default PrincipalDetails;
