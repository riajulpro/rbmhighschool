export interface ITeacher {
  profileImg?: string;
  phone?: string;
  institution?: string;
  specialization?: string[];
  designation?: string;
  userId: {
    name: string;
    email: string;
  };
}
