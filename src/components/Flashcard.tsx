import React from 'react';
import { StyleSheet, View, Text } from 'react-native';

interface FlashcardProps {
  content: string;
}

export const Flashcard: React.FC<FlashcardProps> = ({ content }) => {
  return (
    <View style={styles.card}>
      <Text style={styles.text}>{content}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 15,
    marginVertical: 10,
    marginHorizontal: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  text: {
    fontSize: 16,
    color: '#333',
    lineHeight: 24,
  },
});
