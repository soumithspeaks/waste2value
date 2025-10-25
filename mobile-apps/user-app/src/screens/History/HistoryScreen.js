import React from 'react';
import {View, StyleSheet} from 'react-native';
import {Text} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {COLORS} from '../../constants';

const HistoryScreen = () => {
  return (
    <View style={styles.container}>
      <Icon name="history" size={64} color={COLORS.primary} />
      <Text variant="headlineMedium" style={styles.title}>
        Pickup History
      </Text>
      <Text variant="bodyMedium" style={styles.subtitle}>
        Your pickup history will be displayed here
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
  title: {
    marginTop: 24,
    marginBottom: 8,
  },
  subtitle: {
    color: COLORS.textSecondary,
    textAlign: 'center',
  },
});

export default HistoryScreen;
