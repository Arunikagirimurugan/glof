import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Switch,
  TouchableOpacity,
  ScrollView,
  Alert,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../App';
import Icon from 'react-native-vector-icons/MaterialIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';

type SettingsScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'Settings'
>;

interface Settings {
  notifications: boolean;
  highRiskAlerts: boolean;
  locationTracking: boolean;
  darkMode: boolean;
  autoRefresh: boolean;
  refreshInterval: number;
}

const SettingsScreen = () => {
  const navigation = useNavigation<SettingsScreenNavigationProp>();
  const [settings, setSettings] = useState<Settings>({
    notifications: true,
    highRiskAlerts: true,
    locationTracking: true,
    darkMode: false,
    autoRefresh: true,
    refreshInterval: 15,
  });

  useEffect(() => {
    loadSettings();
  }, []);

  const loadSettings = async () => {
    try {
      const savedSettings = await AsyncStorage.getItem('appSettings');
      if (savedSettings) {
        setSettings(JSON.parse(savedSettings));
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to load settings');
    }
  };

  const saveSettings = async (newSettings: Settings) => {
    try {
      await AsyncStorage.setItem('appSettings', JSON.stringify(newSettings));
      setSettings(newSettings);
    } catch (error) {
      Alert.alert('Error', 'Failed to save settings');
    }
  };

  const toggleSetting = (key: keyof Settings) => {
    const newSettings = {
      ...settings,
      [key]: !settings[key],
    };
    saveSettings(newSettings);
  };

  const renderSettingItem = (
    title: string,
    description: string,
    key: keyof Settings,
    icon: string
  ) => (
    <View style={styles.settingItem}>
      <View style={styles.settingIcon}>
        <Icon name={icon} size={24} color="#2196F3" />
      </View>
      <View style={styles.settingContent}>
        <Text style={styles.settingTitle}>{title}</Text>
        <Text style={styles.settingDescription}>{description}</Text>
      </View>
      <Switch
        value={settings[key]}
        onValueChange={() => toggleSetting(key)}
        trackColor={{ false: '#767577', true: '#81b0ff' }}
        thumbColor={settings[key] ? '#2196F3' : '#f4f3f4'}
      />
    </View>
  );

  return (
    <ScrollView style={styles.container}>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Notifications</Text>
        {renderSettingItem(
          'Push Notifications',
          'Receive alerts and updates',
          'notifications',
          'notifications'
        )}
        {renderSettingItem(
          'High Risk Alerts',
          'Get immediate alerts for high-risk situations',
          'highRiskAlerts',
          'warning'
        )}
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Location</Text>
        {renderSettingItem(
          'Location Tracking',
          'Allow app to track your location for better alerts',
          'locationTracking',
          'location-on'
        )}
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Appearance</Text>
        {renderSettingItem(
          'Dark Mode',
          'Use dark theme',
          'darkMode',
          'brightness-4'
        )}
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Data Refresh</Text>
        {renderSettingItem(
          'Auto Refresh',
          'Automatically update data',
          'autoRefresh',
          'refresh'
        )}
      </View>

      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          Alert.alert(
            'Clear Data',
            'Are you sure you want to clear all app data?',
            [
              {
                text: 'Cancel',
                style: 'cancel',
              },
              {
                text: 'Clear',
                style: 'destructive',
                onPress: async () => {
                  try {
                    await AsyncStorage.clear();
                    Alert.alert('Success', 'App data cleared successfully');
                    loadSettings();
                  } catch (error) {
                    Alert.alert('Error', 'Failed to clear app data');
                  }
                },
              },
            ]
          );
        }}
      >
        <Text style={styles.buttonText}>Clear App Data</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  section: {
    marginTop: 20,
    backgroundColor: '#fff',
    paddingVertical: 10,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#666',
    marginLeft: 15,
    marginBottom: 10,
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  settingIcon: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  settingContent: {
    flex: 1,
    marginLeft: 10,
  },
  settingTitle: {
    fontSize: 16,
    color: '#333',
    marginBottom: 4,
  },
  settingDescription: {
    fontSize: 14,
    color: '#666',
  },
  button: {
    margin: 20,
    padding: 15,
    backgroundColor: '#ff4444',
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default SettingsScreen; 