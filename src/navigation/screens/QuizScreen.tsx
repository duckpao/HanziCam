import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { useVocabulary, VocabularyItem } from '../../context/VocabularyContext';
import { colors, radius } from '../../theme/colors';

const QUESTION_COUNT = 4;
const OPTION_COUNT = 4;

interface QuizQuestion {
  item: VocabularyItem;
  options: string[];
  correctAnswer: string;
}

function shuffle<T>(arr: T[]): T[] {
  const copy = [...arr];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

function dedupeByEnglish(items: VocabularyItem[]): VocabularyItem[] {
  const seen = new Set<string>();
  const result: VocabularyItem[] = [];
  for (const item of items) {
    const key = item.english.trim().toLowerCase();
    if (!seen.has(key)) {
      seen.add(key);
      result.push(item);
    }
  }
  return result;
}

function buildQuiz(items: VocabularyItem[]): QuizQuestion[] {
  const pool = dedupeByEnglish(items);
  const subjects = shuffle(pool).slice(0, QUESTION_COUNT);

  return subjects.map((item) => {
    const distractors = shuffle(pool.filter((p) => p.id !== item.id))
      .slice(0, OPTION_COUNT - 1)
      .map((p) => p.english);
    const options = shuffle([item.english, ...distractors]);
    return { item, options, correctAnswer: item.english };
  });
}

export default function QuizScreen() {
  const { history } = useVocabulary();
  const uniqueCount = dedupeByEnglish(history).length;
  const [quiz, setQuiz] = useState<QuizQuestion[]>(() => buildQuiz(history));
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [score, setScore] = useState(0);

  const finished = currentIndex >= quiz.length && quiz.length > 0;

  const restart = () => {
    setQuiz(buildQuiz(history));
    setCurrentIndex(0);
    setSelectedAnswer(null);
    setScore(0);
  };

  if (uniqueCount < QUESTION_COUNT) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyIcon}>📝</Text>
        <Text style={styles.emptyTitle}>Chưa đủ từ vựng để làm Quiz</Text>
        <Text style={styles.emptySubtitle}>
          Cần ít nhất {QUESTION_COUNT} từ khác nhau. Hãy chụp thêm ảnh ở tab Camera!
        </Text>
      </View>
    );
  }

  if (finished) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyIcon}>🎉</Text>
        <Text style={styles.emptyTitle}>Hoàn thành!</Text>
        <Text style={styles.resultScore}>
          Bạn đúng {score}/{quiz.length} câu
        </Text>
        <TouchableOpacity style={styles.primaryButton} onPress={restart}>
          <Text style={styles.primaryButtonText}>Làm lại</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const question = quiz[currentIndex];

  const handleSelect = (option: string) => {
    if (selectedAnswer) return;
    setSelectedAnswer(option);
    if (option === question.correctAnswer) setScore((s) => s + 1);
  };

  const handleNext = () => {
    setSelectedAnswer(null);
    setCurrentIndex((i) => i + 1);
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.progress}>
        Câu {currentIndex + 1}/{quiz.length}
      </Text>

      <View style={styles.questionCard}>
        <Text style={styles.questionCaption}>{question.item.hanzi} · {question.item.pinyin}</Text>
        <Text style={styles.questionTitle}>{question.item.vietnamese}</Text>
        <Text style={styles.questionHint}>Đâu là tên tiếng Anh đúng?</Text>
      </View>

      {question.options.map((option) => {
        const isSelected = selectedAnswer === option;
        const isCorrectOption = option === question.correctAnswer;
        const showResult = selectedAnswer !== null;

        const optionStyle =
          showResult && isCorrectOption
            ? styles.optionCorrect
            : showResult && isSelected && !isCorrectOption
            ? styles.optionWrong
            : styles.option;
        const textStyle =
          showResult && isCorrectOption
            ? styles.optionTextCorrect
            : showResult && isSelected && !isCorrectOption
            ? styles.optionTextWrong
            : styles.optionText;

        return (
          <TouchableOpacity
            key={option}
            style={optionStyle}
            onPress={() => handleSelect(option)}
            disabled={selectedAnswer !== null}
            activeOpacity={0.85}
          >
            <Text style={textStyle}>{option}</Text>
          </TouchableOpacity>
        );
      })}

      {selectedAnswer && (
        <TouchableOpacity style={styles.primaryButton} onPress={handleNext}>
          <Text style={styles.primaryButtonText}>
            {currentIndex + 1 === quiz.length ? 'Xem kết quả' : 'Câu tiếp theo'}
          </Text>
        </TouchableOpacity>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  content: { padding: 20, paddingBottom: 40 },
  progress: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.textMuted,
    marginBottom: 12,
    textAlign: 'center',
  },
  questionCard: {
    backgroundColor: colors.primary,
    borderRadius: radius.lg,
    padding: 24,
    alignItems: 'center',
    marginBottom: 20,
    shadowColor: colors.primaryDark,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 4,
  },
  questionCaption: { fontSize: 14, color: colors.white, opacity: 0.85, marginBottom: 8 },
  questionTitle: { fontSize: 26, fontWeight: '700', color: colors.white, textAlign: 'center' },
  questionHint: { fontSize: 13, color: colors.white, opacity: 0.8, marginTop: 12 },
  option: {
    backgroundColor: colors.card,
    borderRadius: radius.md,
    borderWidth: 1.5,
    borderColor: colors.border,
    padding: 18,
    marginBottom: 12,
  },
  optionCorrect: {
    backgroundColor: colors.successBg,
    borderRadius: radius.md,
    borderWidth: 1.5,
    borderColor: colors.success,
    padding: 18,
    marginBottom: 12,
  },
  optionWrong: {
    backgroundColor: colors.dangerBg,
    borderRadius: radius.md,
    borderWidth: 1.5,
    borderColor: colors.danger,
    padding: 18,
    marginBottom: 12,
  },
  optionText: { fontSize: 16, color: colors.text, fontWeight: '600', textAlign: 'center' },
  optionTextCorrect: { fontSize: 16, color: colors.success, fontWeight: '700', textAlign: 'center' },
  optionTextWrong: { fontSize: 16, color: colors.danger, fontWeight: '700', textAlign: 'center' },
  primaryButton: {
    backgroundColor: colors.primary,
    borderRadius: radius.pill,
    paddingVertical: 14,
    alignItems: 'center',
    marginTop: 8,
  },
  primaryButtonText: { color: colors.white, fontWeight: '700', fontSize: 16 },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.background,
    paddingHorizontal: 32,
  },
  emptyIcon: { fontSize: 48, marginBottom: 12 },
  emptyTitle: { fontSize: 18, fontWeight: '700', color: colors.text, marginBottom: 6 },
  emptySubtitle: { fontSize: 14, color: colors.textMuted, textAlign: 'center', lineHeight: 20 },
  resultScore: { fontSize: 18, color: colors.textMuted, marginBottom: 20 },
});
