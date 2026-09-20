import React from 'react';
import { Text } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { VocabularyProvider } from '../context/VocabularyContext';
import App from '../../App';
import FlashcardScreen from './screens/FlashcardScreen';
import QuizScreen from './screens/QuizScreen';
import { colors, radius } from '../theme/colors';

const Tab = createBottomTabNavigator();

const tabIcons: Record<string, string> = {
  Camera: '📷',
  Flashcards: '🗂️',
  Quiz: '📝',
};

export const AppNavigator = () => {
  return (
    <VocabularyProvider>
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={({ route }) => ({
            headerStyle: { backgroundColor: colors.primary },
            headerTintColor: colors.white,
            headerTitleStyle: { fontWeight: '700' },
            tabBarActiveTintColor: colors.primary,
            tabBarInactiveTintColor: colors.textMuted,
            tabBarStyle: {
              backgroundColor: colors.white,
              borderTopColor: colors.border,
              borderTopLeftRadius: radius.lg,
              borderTopRightRadius: radius.lg,
              height: 64,
              paddingTop: 6,
            },
            tabBarLabelStyle: { fontWeight: '600' },
            tabBarIcon: ({ color, size }) => (
              <Text style={{ color, fontSize: size }}>{tabIcons[route.name]}</Text>
            ),
          })}
        >
          <Tab.Screen name="Camera" component={App} />
          <Tab.Screen name="Flashcards" component={FlashcardScreen} />
          <Tab.Screen name="Quiz" component={QuizScreen} />
        </Tab.Navigator>
      </NavigationContainer>
    </VocabularyProvider>
  );
};
