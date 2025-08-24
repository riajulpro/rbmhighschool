export interface ISkill {
  title: string;
  completionDate?: Date;
  description?: string;
  certificateUrl?: string;
}

export interface IUser {
  name: string;
  email: string;
}

export interface ITeacher {
  userId: IUser;
  designation?: string;
  phone?: string;
  institution?: string;
  specialization?: string[];
  profileImg?: string;
  experience?: string;
  skills?: ISkill[];
  department?: string;
  employeeId?: string;
  joiningDate?: Date;
}
