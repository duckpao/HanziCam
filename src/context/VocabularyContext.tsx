import React, { createContext, useState, useContext, ReactNode } from 'react';

export interface VocabularyItem {
  id: string;
  english: string;
  hanzi: string;
  pinyin: string;
  hanViet: string;
  vietnamese: string;
}

interface VocabularyContextType {
  history: VocabularyItem[];
  addWord: (item: Omit<VocabularyItem, 'id'>) => void;
}

const VocabularyContext = createContext<VocabularyContextType | undefined>(undefined);

export const VocabularyProvider = ({ children }: { children: ReactNode }) => {
  const [history, setHistory] = useState<VocabularyItem[]>([]);
  const addWord = (item: Omit<VocabularyItem, 'id'>) => {
    const newItem: VocabularyItem = { ...item, id: `${Date.now()}-${Math.random()}` };
    setHistory((prev) => [newItem, ...prev]);
  };

  return (
    <VocabularyContext.Provider value={{ history, addWord }}>
      {children}
    </VocabularyContext.Provider>
  );
};

export const useVocabulary = () => {
  const context = useContext(VocabularyContext);
  if (!context) throw new Error('useVocabulary must be used within a VocabularyProvider');
  return context;
};
