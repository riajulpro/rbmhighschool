export interface SubjectResult {
  subject: string;
  marks: number;
  grade?: string;
  point?: number;
  comments?: string;
}

export interface StudentInfo {
  _id: string;
  name: string;
  class: string;
  session: string;
  rollNumber: string;
}

export interface ResultData {
  _id: string;
  student: StudentInfo;
  semester: "FirstSemester" | "MidTerm" | "Annual";
  year: number;
  subjects: SubjectResult[];
  gpa: number;
  overallGrade: string;
  createdAt: string;
  updatedAt: string;
}
