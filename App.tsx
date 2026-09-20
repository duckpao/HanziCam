import "react-native-gesture-handler";
import "react-native-reanimated";

import React, { useState, useRef } from "react";
import {
  StyleSheet,
  View,
  Text,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import { useCameraPermissions } from "expo-camera";
import { SafeAreaView } from "react-native-safe-area-context";
import { CameraComponent } from "./src/components/CameraComponent";
import { useVocabulary } from "./src/context/VocabularyContext";
import { colors, radius } from "./src/theme/colors";


export default function App() {
  const [permission, requestPermission] = useCameraPermissions();
  const [loading, setLoading] = useState(false);

  // Safe hook call: if App is rendered outside of provider, this throws,
  // but it's inside AppNavigator which wraps it.
  const vocabulary = useVocabulary();
  const addWord = vocabulary?.addWord;

  const cameraRef = useRef<any>(null);

  if (!permission) return <View style={styles.centerContainer} />;

  if (!permission.granted) {
    return (
      <View style={styles.centerContainer}>
        <Text style={styles.message}>Cần cấp quyền Camera.</Text>
        <TouchableOpacity style={styles.button} onPress={requestPermission}>
          <Text style={styles.buttonText}>Cấp quyền</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const callGeminiAPI = async (base64Image: string) => {
    const apiKey = process.env.EXPO_PUBLIC_GEMINI_API_KEY;
    if (!apiKey) return;

    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-3.6-flash:generateContent?key=${apiKey}`;
    const promptText =
      "Nhận diện vật thể chính trong ảnh và trả lời DUY NHẤT bằng một object JSON hợp lệ, " +
      "không thêm chữ nào khác, không dùng markdown, theo đúng schema: " +
      '{"english":"Tên tiếng Anh","hanzi":"Chữ Hán","pinyin":"Pinyin","hanViet":"Nghĩa Hán Việt","vietnamese":"Nghĩa Tiếng Việt"}';

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                { text: promptText },
                { inlineData: { mimeType: "image/jpeg", data: base64Image } },
              ],
            },
          ],
        }),
      });

      const data = await response.json();
      const textResponse: string | undefined =
        data.candidates?.[0]?.content?.parts?.[0]?.text;
      if (textResponse && addWord) {
        const jsonText = textResponse
          .replace(/```json/gi, "")
          .replace(/```/g, "")
          .trim();
        const parsed = JSON.parse(jsonText);
        const { english, hanzi, pinyin, hanViet, vietnamese } = parsed;
        if (english && hanzi && pinyin && hanViet && vietnamese) {
          addWord({ english, hanzi, pinyin, hanViet, vietnamese });
        }
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const takePicture = async () => {
    if (cameraRef.current) {
      setLoading(true);
      const photo = await cameraRef.current.takePictureAsync({
        base64: true,
        quality: 0.5,
      });
      if (photo?.base64) await callGeminiAPI(photo.base64);
      else setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.cameraContainer}>
        <CameraComponent
          cameraRef={cameraRef}
          onCapture={takePicture}
          loading={loading}
          facing="back"
        />
        {loading && (
          <View style={styles.loadingOverlay}>
            <ActivityIndicator size="large" color={colors.primary} />
          </View>
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  centerContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.background,
    paddingHorizontal: 24,
  },
  cameraContainer: { flex: 1 },
  loadingOverlay: {
    ...StyleSheet.absoluteFill,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.overlay,
  },
  message: {
    textAlign: "center",
    marginBottom: 16,
    fontSize: 16,
    color: colors.text,
  },
  button: {
    backgroundColor: colors.primary,
    paddingVertical: 12,
    paddingHorizontal: 28,
    borderRadius: radius.pill,
  },
  buttonText: { color: colors.white, fontWeight: "600", fontSize: 16 },
});
