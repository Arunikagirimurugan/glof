import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Alert,
  RefreshControl,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../App';
import Icon from 'react-native-vector-icons/MaterialIcons';

type AlertsScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Alerts'>;

interface AlertItem {
  id: string;
  title: string;
  description: string;
  timestamp: string;
  riskLevel: number;
  location: string;
  isRead: boolean;
}

const AlertsScreen = () => {
  const navigation = useNavigation<AlertsScreenNavigationProp>();
  const [alerts, setAlerts] = useState<AlertItem[]>([]);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    fetchAlerts();
  }, []);

  const fetchAlerts = async () => {
    try {
      // TODO: Replace with actual API call
      const mockData: AlertItem[] = [
        {
          id: '1',
          title: 'High Risk Alert',
          description: 'Potential GLOF detected in Region A',
          timestamp: '2024-01-20T10:30:00Z',
          riskLevel: 0.9,
          location: 'Region A',
          isRead: false,
        },
        {
          id: '2',
          title: 'Medium Risk Alert',
          description: 'Unusual glacial activity observed',
          timestamp: '2024-01-19T15:45:00Z',
          riskLevel: 0.6,
          location: 'Region B',
          isRead: true,
        },
      ];
      setAlerts(mockData);
    } catch (error) {
      Alert.alert('Error', 'Failed to fetch alerts');
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await fetchAlerts();
    setRefreshing(false);
  };

  const markAsRead = (alertId: string) => {
    setAlerts(
      alerts.map((alert) =>
        alert.id === alertId ? { ...alert, isRead: true } : alert
      )
    );
  };

  const getRiskColor = (riskLevel: number) => {
    if (riskLevel >= 0.8) return '#ff4444';
    if (riskLevel >= 0.5) return '#ffbb33';
    return '#00C851';
  };

  const renderAlertItem = ({ item }: { item: AlertItem }) => (
    <TouchableOpacity
      style={[styles.alertItem, !item.isRead && styles.unreadAlert]}
      onPress={() => {
        if (!item.isRead) {
          markAsRead(item.id);
        }
        Alert.alert(
          item.title,
          `${item.description}\n\nLocation: ${item.location}\nRisk Level: ${(
            item.riskLevel * 100
          ).toFixed(0)}%`
        );
      }}
    >
      <View style={styles.alertHeader}>
        <Text style={styles.alertTitle}>{item.title}</Text>
        <View
          style={[
            styles.riskIndicator,
            { backgroundColor: getRiskColor(item.riskLevel) },
          ]}
        />
      </View>
      <Text style={styles.alertDescription}>{item.description}</Text>
      <View style={styles.alertFooter}>
        <Text style={styles.alertTimestamp}>
          {new Date(item.timestamp).toLocaleString()}
        </Text>
        <Text style={styles.alertLocation}>{item.location}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={alerts}
        renderItem={renderAlertItem}
        keyExtractor={(item) => item.id}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Icon name="notifications-none" size={48} color="#757575" />
            <Text style={styles.emptyText}>No alerts available</Text>
          </View>
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  alertItem: {
    backgroundColor: '#fff',
    padding: 15,
    marginHorizontal: 15,
    marginTop: 15,
    borderRadius: 10,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  unreadAlert: {
    borderLeftWidth: 4,
    borderLeftColor: '#2196F3',
  },
  alertHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  alertTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  riskIndicator: {
    width: 12,
    height: 12,
    borderRadius: 6,
  },
  alertDescription: {
    fontSize: 14,
    color: '#666',
    marginBottom: 10,
  },
  alertFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  alertTimestamp: {
    fontSize: 12,
    color: '#999',
  },
  alertLocation: {
    fontSize: 12,
    color: '#666',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  emptyText: {
    fontSize: 16,
    color: '#757575',
    marginTop: 10,
  },
});

export default AlertsScreen; 