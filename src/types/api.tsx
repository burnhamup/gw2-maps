export type GW2AchievementCategory = {
  id: number;
  description: string;
  order: number;
  name: string;
  icon: string;
  achievements: number[];
};

export type GW2Achievement = {
  id: number;
  name: string;
  description: string;
  requirement: string;
  flags: string[];
};

export type GW2AccountAchievement = {
  id: number;
  current?: number;
  max?: number;
  done: boolean;
};

