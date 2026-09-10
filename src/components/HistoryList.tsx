import React from 'react';
import { StyleSheet, ScrollView, View, Text } from 'react-native';
import { Flashcard } from './Flashcard';

interface HistoryListProps {
  history: string[];
}

export const HistoryList: React.FC<HistoryListProps> = ({ history }) => {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Lịch sử học tập</Text>
      {history.map((item, index) => (
        <Flashcard key={index} content={item} />
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    paddingTop: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 20,
    marginBottom: 10,
    color: '#333',
  },
});
