import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import Animated, { useSharedValue, useAnimatedStyle, withTiming, interpolate } from 'react-native-reanimated';
import { colors, radius } from '../theme/colors';
import { VocabularyItem } from '../context/VocabularyContext';

interface FlipFlashcardProps {
  item: VocabularyItem;
}

export const FlipFlashcard: React.FC<FlipFlashcardProps> = ({ item }) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const flip = useSharedValue(0);

  const frontStyle = useAnimatedStyle(() => {
    const rotate = interpolate(flip.value, [0, 1], [0, 180]);
    return {
      transform: [{ rotateY: `${rotate}deg` }],
    };
  });

  const backStyle = useAnimatedStyle(() => {
    const rotate = interpolate(flip.value, [0, 1], [180, 360]);
    return {
      transform: [{ rotateY: `${rotate}deg` }],
    };
  });

  const handleFlip = () => {
    flip.value = withTiming(isFlipped ? 0 : 1, { duration: 500 });
    setIsFlipped(!isFlipped);
  };

  return (
    <TouchableOpacity onPress={handleFlip} style={styles.container} activeOpacity={0.9}>
      <Animated.View style={[styles.card, styles.front, frontStyle]}>
        <Text style={styles.caption}>{item.hanzi} · {item.pinyin}</Text>
        <Text style={styles.primaryText}>{item.vietnamese}</Text>
        <Text style={styles.hint}>Nhấn để xem tiếng Anh</Text>
      </Animated.View>
      <Animated.View style={[styles.card, styles.back, backStyle]}>
        <Text style={styles.primaryTextBack}>{item.english}</Text>
        <Text style={styles.captionBack}>{item.hanViet}</Text>
      </Animated.View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: { width: '90%', height: 200, marginVertical: 10, alignSelf: 'center' },
  card: {
    ...StyleSheet.absoluteFill,
    borderRadius: radius.lg,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
    backfaceVisibility: 'hidden',
    shadowColor: colors.primaryDark,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 4,
  },
  front: { backgroundColor: colors.primary },
  back: {
    backgroundColor: colors.card,
    borderWidth: 1,
    borderColor: colors.border,
  },
  caption: {
    fontSize: 14,
    color: colors.white,
    opacity: 0.85,
    marginBottom: 8,
  },
  primaryText: {
    fontSize: 24,
    fontWeight: '700',
    color: colors.white,
    textAlign: 'center',
  },
  hint: {
    fontSize: 12,
    color: colors.white,
    opacity: 0.75,
    marginTop: 12,
  },
  primaryTextBack: {
    fontSize: 24,
    fontWeight: '700',
    color: colors.primaryDark,
    textAlign: 'center',
  },
  captionBack: {
    fontSize: 14,
    color: colors.textMuted,
    marginTop: 8,
    textAlign: 'center',
  },
});
