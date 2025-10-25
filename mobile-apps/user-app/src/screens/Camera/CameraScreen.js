import React from 'react';
import {View, StyleSheet} from 'react-native';
import {Text, Button} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {COLORS} from '../../constants';

const CameraScreen = () => {
  return (
    <View style={styles.container}>
      <Icon name="camera" size={64} color={COLORS.primary} />
      <Text variant="headlineMedium" style={styles.title}>
        Waste Classification
      </Text>
      <Text variant="bodyMedium" style={styles.subtitle}>
        Camera and AI classification will be implemented here
      </Text>
      <Button mode="contained" icon="camera" style={styles.button}>
        Take Photo
      </Button>
      <Button mode="outlined" icon="image" style={styles.button}>
        Choose from Gallery
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    marginTop: 24,
    marginBottom: 8,
  },
  subtitle: {
    color: COLORS.textSecondary,
    textAlign: 'center',
    marginBottom: 32,
  },
  button: {
    marginTop: 12,
    minWidth: 200,
  },
});

export default CameraScreen;
