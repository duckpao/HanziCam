import React from 'react';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import { CameraView as ExpoCameraView, CameraViewProps } from 'expo-camera';
import { colors } from '../theme/colors';

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
    width: 84,
    height: 84,
    borderRadius: 42,
    borderWidth: 5,
    borderColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
  },
  captureButtonInner: {
    width: 66,
    height: 66,
    borderRadius: 33,
    backgroundColor: colors.primary,
  },
  disabledButton: {
    opacity: 0.5,
  },
});
