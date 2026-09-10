import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { CameraView as ExpoCameraView, CameraViewProps } from 'expo-camera';

interface CameraComponentProps extends CameraViewProps {
  cameraRef: React.RefObject<any>;
  onCapture: () => void;
  loading: boolean;
}

export const CameraComponent: React.FC<CameraComponentProps> = ({ cameraRef, onCapture, loading, ...props }) => {
  return (
    <View style={styles.container}>
      <ExpoCameraView
        style={StyleSheet.absoluteFill}
        ref={cameraRef}
        {...props}
      />
      <View style={styles.footer}>
        <TouchableOpacity
          style={[styles.captureButton, loading && styles.disabledButton]}
          onPress={onCapture}
          disabled={loading}
        >
          <View style={styles.captureButtonInner} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  footer: {
    position: 'absolute',
    bottom: 30,
    width: '100%',
    alignItems: 'center',
  },
  captureButton: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 4,
    borderColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  captureButtonInner: {
    width: 65,
    height: 65,
    borderRadius: 32.5,
    backgroundColor: '#fff',
  },
  disabledButton: {
    opacity: 0.5,
  },
});
