'use client'

import { ReactNode, createContext, useContext, useEffect, useState } from 'react';
import { GW2AccountAchievement } from '../types/api';

type GW2ApiContext = {
  apiKey: string;
  accountAchievementData: GW2AccountAchievement[];
  setApiKey: (apiKey:string) => void;
}

const GW2ApiAccountContext = createContext<GW2ApiContext>({apiKey: '', accountAchievementData: [], setApiKey: () => {}});

export const GW2ApiAccountProvider = ({ children }: {children: ReactNode}) => {
  const [apiKey, setApiKey] = useState<string>('');
  const [accountAchievementData, setAccountAchievementData] = useState<GW2AccountAchievement[]>([]);
  
  const fetchAccountAchievementData = async (apiKey: string) => {
    if (apiKey) {
      // TODO error handling for invalid api key
      const user_achievement_request = await fetch(`https://api.guildwars2.com/v2/account/achievements?access_token=${apiKey}`);
      setAccountAchievementData(await user_achievement_request.json());
    }

  };

  useEffect(() => {
    setApiKey(localStorage.getItem('gw2_api_key') || '');
  }, []);

  useEffect(() =>{
    if (apiKey) {
      // TODO this interplay makes it hard to clear an api key
      // Since it starts off blank and I don't want to set the blank api key in storage
      localStorage.setItem('gw2_api_key', apiKey);
      fetchAccountAchievementData(apiKey);
    }
  }, [apiKey])

  return (
    <GW2ApiAccountContext.Provider value={{ apiKey, setApiKey, accountAchievementData }}>
      {children}
    </GW2ApiAccountContext.Provider>
  );
};

export const useApi = () => useContext(GW2ApiAccountContext);
