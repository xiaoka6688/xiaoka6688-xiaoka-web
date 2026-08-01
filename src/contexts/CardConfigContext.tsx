import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
import { defaultCardConfig, STORAGE_KEY, type CardConfig } from '../components/reactbits/Components/Lanyard/cardConfig';

interface CardConfigContextValue {
  cardConfig: CardConfig;
  setCardConfig: (config: CardConfig | ((prev: CardConfig) => CardConfig)) => void;
  resetCardConfig: () => void;
}

const CardConfigContext = createContext<CardConfigContextValue | null>(null);

export function CardConfigProvider({ children }: { children: ReactNode }) {
  const [cardConfig, setCardConfig] = useState<CardConfig>(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) return { ...defaultCardConfig, ...JSON.parse(raw) };
    } catch {
      /* 解析失败则使用默认配置 */
    }
    return defaultCardConfig;
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(cardConfig));
    } catch {
      /* 存储不可用时忽略 */
    }
  }, [cardConfig]);

  const resetCardConfig = () => setCardConfig(defaultCardConfig);

  return (
    <CardConfigContext.Provider value={{ cardConfig, setCardConfig, resetCardConfig }}>
      {children}
    </CardConfigContext.Provider>
  );
}

export function useCardConfig() {
  const context = useContext(CardConfigContext);
  if (!context) {
    throw new Error('useCardConfig must be used within CardConfigProvider');
  }
  return context;
}

export type { CardConfig };
