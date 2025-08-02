export type ClassGenderStats = {
  class: string;
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
