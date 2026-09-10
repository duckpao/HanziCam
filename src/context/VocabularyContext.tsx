import React, { createContext, useState, useContext, ReactNode } from 'react';

interface VocabularyContextType {
  history: string[];
  addWord: (word: string) => void;
}

const VocabularyContext = createContext<VocabularyContextType | undefined>(undefined);

export const VocabularyProvider = ({ children }: { children: ReactNode }) => {
  const [history, setHistory] = useState<string[]>([]);
  const addWord = (word: string) => setHistory((prev) => [word, ...prev]);

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
