import { AchievementData, MapData } from './Achievement';

import { GW2Achievement } from '../types/api';
import { GW2AchievementCategory } from '../types/api';

import { useState, useEffect } from 'react';
import { useApi } from '../context/apiContext';
import { createAchievementElements } from './Achievement';

interface MapProps {
    mapData: MapData;
}

export function Map({mapData} : MapProps) {
  const map_name = mapData.name;
  const [achievements, setAchievements] = useState<{ category: GW2AchievementCategory; achievements: GW2Achievement[]; }[] | null>([]);
  const {accountAchievementData} = useApi();

  useEffect(() => {
    async function fetchData() {
      const fetchedNodes = await fetchAchievementData(mapData.achievements);
      setAchievements(fetchedNodes);
    }
    fetchData();
  }, [mapData]);
  let children: any[] = [];
  if (achievements && achievements.length && accountAchievementData.length) {
    children = achievements.map((achievement) => createAchievementElements(achievement.category, achievement.achievements, accountAchievementData));
  }
  return (
    <>
      <h1>{map_name}</h1>
      {children.length > 0 ? children : <p>Loading...</p>}
    </>

  );
}

export const fetchAchievementData = async (achievementData: AchievementData) => {
  const categories_list = Object.keys(achievementData);
  if (!categories_list.length) { 
    return null;
  }
  const categories_request = await fetch(`https://api.guildwars2.com/v2/achievements/categories?ids=${categories_list.join(',')}`);
  const categories_data = await categories_request.json();

  const data = categories_data.map(async (category: GW2AchievementCategory) => {
    const achievement_ids = achievementData[category.id].length ? achievementData[category.id] : category.achievements;
    const achievement_request = await fetch(`https://api.guildwars2.com/v2/achievements?ids=${achievement_ids.join(',')}`);
    const achievement_data = await achievement_request.json();
    return {
      category: category,
      achievements: achievement_data,
    };
  });
  return await Promise.all(data);
};

