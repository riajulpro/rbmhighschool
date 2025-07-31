// types/studentCounts.ts
export type ClassGenderStats = {
  male: number;
  female: number;
  total: number;
};

export type SessionData = {
  [className: string]: ClassGenderStats;
};

export type StudentCountData = {
  [session: string]: SessionData;
};
