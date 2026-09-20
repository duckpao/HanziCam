import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { colors, radius } from '../theme/colors';

interface FlashcardProps {
  content: string;
}

export const Flashcard: React.FC<FlashcardProps> = ({ content }) => {
  return (
    <View style={styles.card}>
      <View style={styles.accentBar} />
      <Text style={styles.text}>{content}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    backgroundColor: colors.card,
    borderRadius: radius.md,
    marginVertical: 8,
    marginHorizontal: 15,
    overflow: 'hidden',
    shadowColor: colors.primaryDark,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.12,
    shadowRadius: 4,
    elevation: 3,
  },
  accentBar: {
    width: 6,
    backgroundColor: colors.primary,
  },
  text: {
    flex: 1,
    padding: 20,
    fontSize: 16,
    color: colors.text,
    lineHeight: 24,
  },
});
