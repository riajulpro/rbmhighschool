export interface IHonoredStudent {
  _id?: string;
  name: string;
  year: string;
  reason: string;
  photo?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface HonoredStudentCardProps {
  student: IHonoredStudent;
}
