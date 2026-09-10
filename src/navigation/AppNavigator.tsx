import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { VocabularyProvider } from '../context/VocabularyContext';
import App from '../../App'; 
import FlashcardScreen from './screens/FlashcardScreen';
import QuizScreen from './screens/QuizScreen';

const Tab = createBottomTabNavigator();

export const AppNavigator = () => {
  return (
    <VocabularyProvider>
      <NavigationContainer>
        <Tab.Navigator>
          <Tab.Screen name="Camera" component={App} />
          <Tab.Screen name="Flashcards" component={FlashcardScreen} />
          <Tab.Screen name="Quiz" component={QuizScreen} />
        </Tab.Navigator>
      </NavigationContainer>
    </VocabularyProvider>
  );
};
