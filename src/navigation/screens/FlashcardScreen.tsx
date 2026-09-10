import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { FlipFlashcard } from '../../components/FlipFlashcard';
import { useVocabulary } from '../../context/VocabularyContext';

export default function FlashcardScreen() {
  const { history } = useVocabulary();

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Lịch sử học tập</Text>
      {history.map((item, index) => (
        <FlipFlashcard key={index} content={item} />
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f5f5', padding: 20 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
});
