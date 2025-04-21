import React, { useState, useEffect } from 'react';
import {
  View,
  StyleSheet,
  Dimensions,
  Alert,
  ActivityIndicator,
} from 'react-native';
import MapView, { Marker, Circle } from 'react-native-maps';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../App';

type MapScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Map'>;

interface RiskArea {
  id: string;
  latitude: number;
  longitude: number;
  riskLevel: number;
  radius: number;
}

const MapScreen = () => {
  const navigation = useNavigation<MapScreenNavigationProp>();
  const [loading, setLoading] = useState(true);
  const [riskAreas, setRiskAreas] = useState<RiskArea[]>([]);

  useEffect(() => {
    fetchRiskAreas();
  }, []);

  const fetchRiskAreas = async () => {
    try {
      // TODO: Replace with actual API call
      const mockData: RiskArea[] = [
        {
          id: '1',
          latitude: 30.0,
          longitude: 70.0,
          riskLevel: 0.8,
          radius: 5000,
        },
        {
          id: '2',
          latitude: 31.0,
          longitude: 71.0,
          riskLevel: 0.6,
          radius: 3000,
        },
      ];
      setRiskAreas(mockData);
      setLoading(false);
    } catch (error) {
      Alert.alert('Error', 'Failed to fetch risk areas');
      setLoading(false);
    }
  };

  const getRiskColor = (riskLevel: number) => {
    if (riskLevel >= 0.8) return 'rgba(255, 0, 0, 0.3)';
    if (riskLevel >= 0.5) return 'rgba(255, 165, 0, 0.3)';
    return 'rgba(0, 255, 0, 0.3)';
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#2196F3" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: 30.0,
          longitude: 70.0,
          latitudeDelta: 5,
          longitudeDelta: 5,
        }}
      >
        {riskAreas.map((area) => (
          <React.Fragment key={area.id}>
            <Marker
              coordinate={{
                latitude: area.latitude,
                longitude: area.longitude,
              }}
              title={`Risk Level: ${(area.riskLevel * 100).toFixed(0)}%`}
              description="Tap for more information"
              onPress={() => {
                Alert.alert(
                  'Risk Area Details',
                  `Risk Level: ${(area.riskLevel * 100).toFixed(0)}%\nRadius: ${(area.radius / 1000).toFixed(1)}km`
                );
              }}
            />
            <Circle
              center={{
                latitude: area.latitude,
                longitude: area.longitude,
              }}
              radius={area.radius}
              fillColor={getRiskColor(area.riskLevel)}
              strokeColor={getRiskColor(area.riskLevel).replace('0.3', '1')}
              strokeWidth={2}
            />
          </React.Fragment>
        ))}
      </MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  map: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
});

export default MapScreen; 