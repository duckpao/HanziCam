import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { FlipFlashcard } from '../../components/FlipFlashcard';
import { useVocabulary } from '../../context/VocabularyContext';
import { colors } from '../../theme/colors';

export default function FlashcardScreen() {
  const { history } = useVocabulary();

  if (history.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyIcon}>🗂️</Text>
        <Text style={styles.emptyTitle}>Chưa có từ vựng nào</Text>
        <Text style={styles.emptySubtitle}>
          Chụp ảnh một vật thể ở tab Camera để bắt đầu học từ mới.
        </Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.title}>Lịch sử học tập</Text>
      {history.map((item) => (
        <FlipFlashcard key={item.id} item={item} />
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  content: { padding: 20, paddingBottom: 40 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20, color: colors.primaryDark },
  emptyContainer: {
    flex: 1,
    backgroundColor: colors.background,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 32,
  },
  emptyIcon: { fontSize: 48, marginBottom: 12 },
  emptyTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 6,
  },
  emptySubtitle: {
    fontSize: 14,
    color: colors.textMuted,
    textAlign: 'center',
    lineHeight: 20,
  },
});
