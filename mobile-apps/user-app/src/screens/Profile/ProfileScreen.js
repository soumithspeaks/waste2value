import React from 'react';
import {View, StyleSheet, ScrollView} from 'react-native';
import {Text, List, Divider, Button} from 'react-native-paper';
import {useDispatch, useSelector} from 'react-redux';
import {logout} from '../../redux/slices/authSlice';
import {COLORS} from '../../constants';

const ProfileScreen = () => {
  const dispatch = useDispatch();
  const {user} = useSelector(state => state.auth);

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text variant="headlineMedium">{user?.name || 'User'}</Text>
        <Text variant="bodyMedium" style={styles.email}>
          {user?.email}
        </Text>
        <Text variant="bodyMedium" style={styles.phone}>
          {user?.phone}
        </Text>
      </View>

      <List.Section>
        <List.Subheader>Account</List.Subheader>
        <List.Item
          title="My Wallet"
          left={props => <List.Icon {...props} icon="wallet" />}
          onPress={() => {}}
        />
        <Divider />
        <List.Item
          title="My Addresses"
          left={props => <List.Icon {...props} icon="map-marker" />}
          onPress={() => {}}
        />
        <Divider />
        <List.Item
          title="Referral Code"
          description={user?.referralCode}
          left={props => <List.Icon {...props} icon="share-variant" />}
          onPress={() => {}}
        />
      </List.Section>

      <List.Section>
        <List.Subheader>Settings</List.Subheader>
        <List.Item
          title="Notifications"
          left={props => <List.Icon {...props} icon="bell" />}
          onPress={() => {}}
        />
        <Divider />
        <List.Item
          title="Language"
          left={props => <List.Icon {...props} icon="translate" />}
          onPress={() => {}}
        />
        <Divider />
        <List.Item
          title="Help & Support"
          left={props => <List.Icon {...props} icon="help-circle" />}
          onPress={() => {}}
        />
      </List.Section>

      <View style={styles.logoutContainer}>
        <Button
          mode="contained"
          onPress={handleLogout}
          buttonColor={COLORS.error}
          icon="logout">
          Logout
        </Button>
      </View>
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
    alignItems: 'center',
  },
  email: {
    color: COLORS.textSecondary,
    marginTop: 4,
  },
  phone: {
    color: COLORS.textSecondary,
    marginTop: 2,
  },
  logoutContainer: {
    padding: 20,
    marginTop: 20,
  },
});

export default ProfileScreen;
