export interface IClassRoutine {
  _id: string;
  class: string;
  section: string;
  day: string;
  subject: string;
  teacher: string;
  startTime: string;
  endTime: string;
  room?: string;
  createdAt: string;
  updatedAt: string;
}
