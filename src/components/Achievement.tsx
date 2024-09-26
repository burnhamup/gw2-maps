import { GW2AccountAchievement, GW2Achievement, GW2AchievementCategory } from "../types/api";

interface AchievementProps {
  id: number;
  name: string;
  description: string;
  isUnlocked: boolean;
  icon: string;
}
export function Achievement({ id, name, description, icon, isUnlocked }: AchievementProps) {
  return (
    <div className={`achievement ${!isUnlocked && 'locked'}`}>
      <AchievmentHover id={id} name={name} description={description} />
      <img src={icon} alt={name} />
    </div>
  );
}
interface AchievementHoverProps {
  id: number;
  name: string;
  description: string;
}
function AchievmentHover({ id, name, description }: AchievementHoverProps) {
  return (
    <div className="achievement-hover">
      <h2>{name}</h2>
      <h3>{description}</h3>
    </div>
  );
}export const createAchievementElements = (category: GW2AchievementCategory, achievements: GW2Achievement[], user_achievement: GW2AccountAchievement[]) => {
  return achievements.map((acheivment_json: GW2Achievement) => {
    const userData = user_achievement.find((data: GW2AccountAchievement) => {
      return data.id == acheivment_json.id;
    });

    return (
      <Achievement
        id={acheivment_json.id}
        key={acheivment_json.id}
        name={acheivment_json.name}
        description={acheivment_json.description}
        icon={category.icon}
        isUnlocked={userData?.done || false} />
    );

  });

};

export type AchievementData = {
  [categoryId: number]: number[];
};


export type MapData = {
  name: string;
  achievements: AchievementData
};
