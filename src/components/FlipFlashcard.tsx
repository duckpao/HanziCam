import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import Animated, { useSharedValue, useAnimatedStyle, withTiming, interpolate } from 'react-native-reanimated';

interface FlipFlashcardProps {
  content: string;
}

export const FlipFlashcard: React.FC<FlipFlashcardProps> = ({ content }) => {
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
    <TouchableOpacity onPress={handleFlip} style={styles.container}>
      <Animated.View style={[styles.card, styles.front, frontStyle]}>
        <Text style={styles.textFront}>Nhấn để xem nghĩa</Text>
      </Animated.View>
      <Animated.View style={[styles.card, styles.back, backStyle]}>
        <Text style={styles.text}>{content}</Text>
      </Animated.View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: { width: '90%', height: 200, marginVertical: 10 },
  card: {
    ...StyleSheet.absoluteFill,
    backgroundColor: '#fff',
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backfaceVisibility: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  front: { backgroundColor: '#4da6ff' },
  back: { backgroundColor: '#fff' },
  text: { fontSize: 16, color: '#333' },
  textFront: { fontSize: 16, color: '#fff', fontWeight: 'bold' },
});
