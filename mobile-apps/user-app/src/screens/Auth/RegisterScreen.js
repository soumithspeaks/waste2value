import React from 'react';
import {View, StyleSheet} from 'react-native';
import {Text} from 'react-native-paper';
import {COLORS} from '../../constants';

const RegisterScreen = ({navigation}) => {
  return (
    <View style={styles.container}>
      <Text variant="headlineMedium">Register Screen</Text>
      <Text variant="bodyMedium" style={styles.subtitle}>
        Registration form will be implemented here
      </Text>
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
  subtitle: {
    marginTop: 16,
    color: COLORS.textSecondary,
  },
});

export default RegisterScreen;
