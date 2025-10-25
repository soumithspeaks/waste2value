import React from 'react';
import {View, StyleSheet, ScrollView} from 'react-native';
import {Text, Card, Button} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {useSelector} from 'react-redux';
import {COLORS} from '../../constants';

const HomeScreen = ({navigation}) => {
  const {user} = useSelector(state => state.auth);

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text variant="headlineMedium">Welcome, {user?.name || 'User'}!</Text>
        <Text variant="bodyMedium" style={styles.subtitle}>
          Let's recycle and earn rewards
        </Text>
      </View>

      <Card style={styles.card}>
        <Card.Content>
          <View style={styles.statsRow}>
            <View style={styles.statItem}>
              <Icon name="recycle" size={32} color={COLORS.primary} />
              <Text variant="titleLarge">0 kg</Text>
              <Text variant="bodySmall">Recycled</Text>
            </View>
            <View style={styles.statItem}>
              <Icon name="cash" size={32} color={COLORS.success} />
              <Text variant="titleLarge">₹0</Text>
              <Text variant="bodySmall">Earned</Text>
            </View>
            <View style={styles.statItem}>
              <Icon name="leaf" size={32} color={COLORS.secondary} />
              <Text variant="titleLarge">0 kg</Text>
              <Text variant="bodySmall">CO₂ Saved</Text>
            </View>
          </View>
        </Card.Content>
      </Card>

      <Card style={styles.card}>
        <Card.Title title="Quick Actions" />
        <Card.Content>
          <Button
            mode="contained"
            icon="camera"
            onPress={() => navigation.navigate('Camera')}
            style={styles.actionButton}>
            Classify Waste & Request Pickup
          </Button>
          <Button
            mode="outlined"
            icon="map-marker"
            onPress={() => {}}
            style={styles.actionButton}>
            Schedule Pickup
          </Button>
        </Card.Content>
      </Card>

      <Card style={styles.card}>
        <Card.Title title="Recent Pickups" />
        <Card.Content>
          <Text variant="bodyMedium" style={styles.emptyText}>
            No recent pickups
          </Text>
        </Card.Content>
      </Card>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  header: {
    padding: 20,
    backgroundColor: COLORS.surface,
  },
  subtitle: {
    color: COLORS.textSecondary,
    marginTop: 4,
  },
  card: {
    margin: 16,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  statItem: {
    alignItems: 'center',
  },
  actionButton: {
    marginTop: 12,
  },
  emptyText: {
    textAlign: 'center',
    color: COLORS.textSecondary,
    marginVertical: 16,
  },
});

export default HomeScreen;
