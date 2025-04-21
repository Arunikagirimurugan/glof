import React, { useState, useEffect } from 'react';
import {
  Box,
  Grid,
  Paper,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  CircularProgress,
  Button,
  IconButton,
  Tooltip,
} from '@mui/material';
import {
  Refresh as RefreshIcon,
  LocationOn as LocationIcon,
  Warning as WarningIcon,
} from '@mui/icons-material';

interface MonitoringData {
  id: string;
  location: string;
  coordinates: {
    lat: number;
    lon: number;
  };
  riskLevel: number;
  lastUpdate: string;
  status: 'normal' | 'warning' | 'critical';
  temperature: number;
  waterLevel: number;
}

const Monitoring: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [monitoringData, setMonitoringData] = useState<MonitoringData[]>([]);
  const [refreshing, setRefreshing] = useState(false);

  const fetchData = async () => {
    setRefreshing(true);
    // Simulate API call
    setTimeout(() => {
      const mockData: MonitoringData[] = [
        {
          id: '1',
          location: 'Glacier A',
          coordinates: { lat: 35.12, lon: 75.34 },
          riskLevel: 0.8,
          lastUpdate: new Date().toISOString(),
          status: 'critical',
          temperature: 5.2,
          waterLevel: 45.6,
        },
        {
          id: '2',
          location: 'Glacier B',
          coordinates: { lat: 35.45, lon: 76.12 },
          riskLevel: 0.4,
          lastUpdate: new Date().toISOString(),
          status: 'normal',
          temperature: 2.8,
          waterLevel: 32.1,
        },
        {
          id: '3',
          location: 'Glacier C',
          coordinates: { lat: 36.01, lon: 75.89 },
          riskLevel: 0.6,
          lastUpdate: new Date().toISOString(),
          status: 'warning',
          temperature: 4.1,
          waterLevel: 38.9,
        },
      ];
      setMonitoringData(mockData);
      setLoading(false);
      setRefreshing(false);
    }, 1000);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'critical':
        return 'error';
      case 'warning':
        return 'warning';
      default:
        return 'success';
    }
  };

  const getRiskLevelColor = (level: number) => {
    if (level >= 0.7) return '#f44336';
    if (level >= 0.4) return '#ff9800';
    return '#4caf50';
  };

  if (loading) {
    return (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
        <Typography variant="h4">Monitoring</Typography>
        <Button
          variant="contained"
          startIcon={<RefreshIcon />}
          onClick={fetchData}
          disabled={refreshing}
        >
          Refresh
        </Button>
      </Box>

      <Grid container spacing={3}>
        <Grid item xs={12}>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Location</TableCell>
                  <TableCell>Coordinates</TableCell>
                  <TableCell>Risk Level</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Temperature (°C)</TableCell>
                  <TableCell>Water Level (m)</TableCell>
                  <TableCell>Last Update</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {monitoringData.map((row) => (
                  <TableRow key={row.id}>
                    <TableCell>{row.location}</TableCell>
                    <TableCell>
                      {row.coordinates.lat.toFixed(2)}°N,{' '}
                      {row.coordinates.lon.toFixed(2)}°E
                    </TableCell>
                    <TableCell>
                      <Box
                        sx={{
                          display: 'flex',
                          alignItems: 'center',
                        }}
                      >
                        <Box
                          sx={{
                            width: 100,
                            height: 10,
                            bgcolor: '#eee',
                            borderRadius: 5,
                            mr: 1,
                            overflow: 'hidden',
                          }}
                        >
                          <Box
                            sx={{
                              width: `${row.riskLevel * 100}%`,
                              height: '100%',
                              bgcolor: getRiskLevelColor(row.riskLevel),
                            }}
                          />
                        </Box>
                        {(row.riskLevel * 100).toFixed(0)}%
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Chip
                        label={row.status.toUpperCase()}
                        color={getStatusColor(row.status)}
                        size="small"
                      />
                    </TableCell>
                    <TableCell>{row.temperature.toFixed(1)}</TableCell>
                    <TableCell>{row.waterLevel.toFixed(1)}</TableCell>
                    <TableCell>
                      {new Date(row.lastUpdate).toLocaleString()}
                    </TableCell>
                    <TableCell>
                      <Tooltip title="View on map">
                        <IconButton size="small" color="primary">
                          <LocationIcon />
                        </IconButton>
                      </Tooltip>
                      {row.status !== 'normal' && (
                        <Tooltip title="View alerts">
                          <IconButton size="small" color="error">
                            <WarningIcon />
                          </IconButton>
                        </Tooltip>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Monitoring; 