/* eslint-disable @typescript-eslint/no-explicit-any */
export interface BaseDocument {
  _id?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export enum UserRole {
  ADMIN = "admin",
  PRINCIPAL = "principal",
  TEACHER = "teacher",
  STUDENT = "student",
}

export enum PostType {
  NEWS = "news",
  EVENT = "event",
  BLOG = "blog",
  ANNOUNCEMENT = "announcement",
}

export interface INotice extends BaseDocument {
  title: string;
  docPath: string;
  audience?: "students" | "teachers" | "all";
}

export interface IStudent extends BaseDocument {
  studentName: string;
  fatherName: string;
  motherName: string;
  class: string;
  session: string;
  section: string;
  rollNumber: string;
  gender: string;
  dob: Date;
  guardianName: string;
  guardianPhone: string;
  address: string;
}

export interface IAdmission extends BaseDocument {
  class: string;
  studentName: string;
  studentNameEnglish: string;
  academicYear: string;
  dateOfBirth: Date;
  fatherName: string;
  motherName: string;
  fatherOccupation?: string;
  address: string;
  mobileNumber: string;
  email?: string;
  photo?: string;
  previousInstitution?: string;
  previousInstitutionAddress?: string;
}

export interface IAuthority extends BaseDocument {
  name: string;
  responsibility: string;
  profilePic: string;
}

export interface IFacility extends BaseDocument {
  serial: string;
  name: string;
  quantity: string;
}

export interface IGallery extends BaseDocument {
  title: string;
  type: "photo" | "video";
  url: string;
  description?: string;
}

export interface IHonoredStudent extends BaseDocument {
  name: string;
  year: string;
  reason: string;
  photo?: string;
}

export interface IInstitutionInfo extends BaseDocument {
  name: string;
  logo?: string;
  establishedYear?: number;
  location: string;
  contactEmail: string;
  phone: string;
  about?: string;
  shortInfo?: string;
  eiinNumber?: string;
  schoolCode?: string;
  fullAddress: string;
}

export interface SubjectResult {
  subject: string;
  marks: number;
  grade?: string;
  point?: number;
  comments?: string;
}

export interface IResult extends BaseDocument {
  studentId: string; // Represents Types.ObjectId from Mongoose
  studentName: string; // For display purposes in the client-side mock
  semester: "FirstSemester" | "MidTerm" | "Annual";
  year: number;
  subjects: SubjectResult[];
  gpa: number;
  overallGrade: string;
  session?: string;
}

export interface IClassRoutine extends BaseDocument {
  class: string;
  section: string;
  day: string; // e.g., "Sunday", "Monday"
  subject: string;
  teacher: string;
  startTime: string; // "10:00 AM"
  endTime: string; // "11:00 AM"
  room?: string;
}

export interface IStaff extends BaseDocument {
  name: string;
  responsibility: string;
  profilePic?: string;
}

export interface ITeacher extends BaseDocument {
  userId: string; // Represents Types.ObjectId from Mongoose
  teacherName: string; // For display purposes in the client-side mock
  designation: string;
  phone: string;
  institution: string;
  profileImg?: string;
  specialization?: string[];
}

export interface IUser extends BaseDocument {
  name: string;
  email: string;
  password?: string; // Password should not be returned from API, only set on create/update
  role: UserRole;
}

export interface IPost extends BaseDocument {
  title: string;
  content: string;
  coverImage?: string;
  authorId?: string; // Represents Types.ObjectId from Mongoose
  tags?: string[];
  type: PostType; // New field for post type
}

export interface CrudTableProps<T extends BaseDocument> {
  data: T[];
  columns: any[];
  onAdd: (item: Omit<T, "_id" | "createdAt" | "updatedAt">) => Promise<void>;
  onEdit: (id: string, item: Partial<T>) => Promise<void>;
  onDelete: (id: string) => Promise<void>;
  title: string;
  createFormFields: FormField[];
  editFormFields: FormField[];
}

export interface FormField {
  name: string;
  label: string;
  type:
    | "text"
    | "email"
    | "date"
    | "select"
    | "textarea"
    | "password"
    | "subject-list";
  required?: boolean;
  options?: { value: string; label: string }[];
  placeholder?: string;
  defaultValue?: (item: any) => any;
  subjectFields?: Omit<FormField, "subjectFields">[]; // New property for subject-list type
  onChange?: (value: any) => void;
}
