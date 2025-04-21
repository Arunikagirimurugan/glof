import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Paper,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  ListItemSecondaryAction,
  IconButton,
  Chip,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  CircularProgress,
  Divider,
  TextField,
  MenuItem,
} from '@mui/material';
import {
  Warning as WarningIcon,
  Delete as DeleteIcon,
  Edit as EditIcon,
  LocationOn as LocationIcon,
  Notifications as NotificationsIcon,
} from '@mui/icons-material';

interface Alert {
  id: string;
  title: string;
  description: string;
  location: string;
  severity: 'low' | 'medium' | 'high';
  timestamp: string;
  status: 'active' | 'resolved' | 'investigating';
}

const Alerts: React.FC = () => {
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedAlert, setSelectedAlert] = useState<Alert | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  useEffect(() => {
    fetchAlerts();
  }, []);

  const fetchAlerts = async () => {
    // Simulate API call
    setTimeout(() => {
      const mockAlerts: Alert[] = [
        {
          id: '1',
          title: 'Critical Water Level',
          description: 'Water level has exceeded the critical threshold in Glacier A',
          location: 'Glacier A',
          severity: 'high',
          timestamp: new Date().toISOString(),
          status: 'active',
        },
        {
          id: '2',
          title: 'Temperature Increase',
          description: 'Rapid temperature increase detected in Glacier B',
          location: 'Glacier B',
          severity: 'medium',
          timestamp: new Date(Date.now() - 3600000).toISOString(),
          status: 'investigating',
        },
        {
          id: '3',
          title: 'Minor Glacial Movement',
          description: 'Slight movement detected in Glacier C',
          location: 'Glacier C',
          severity: 'low',
          timestamp: new Date(Date.now() - 7200000).toISOString(),
          status: 'resolved',
        },
      ];
      setAlerts(mockAlerts);
      setLoading(false);
    }, 1000);
  };

  const handleAlertClick = (alert: Alert) => {
    setSelectedAlert(alert);
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
    setSelectedAlert(null);
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'high':
        return 'error';
      case 'medium':
        return 'warning';
      default:
        return 'success';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'error';
      case 'investigating':
        return 'warning';
      default:
        return 'success';
    }
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
        <Typography variant="h4">Alerts</Typography>
        <Button
          variant="contained"
          startIcon={<NotificationsIcon />}
          onClick={fetchAlerts}
        >
          Refresh Alerts
        </Button>
      </Box>

      <Paper>
        <List>
          {alerts.map((alert, index) => (
            <React.Fragment key={alert.id}>
              {index > 0 && <Divider />}
              <ListItem button onClick={() => handleAlertClick(alert)}>
                <ListItemIcon>
                  <WarningIcon
                    color={getSeverityColor(alert.severity)}
                  />
                </ListItemIcon>
                <ListItemText
                  primary={
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      {alert.title}
                      <Chip
                        label={alert.severity.toUpperCase()}
                        color={getSeverityColor(alert.severity)}
                        size="small"
                      />
                      <Chip
                        label={alert.status.toUpperCase()}
                        color={getStatusColor(alert.status)}
                        size="small"
                      />
                    </Box>
                  }
                  secondary={
                    <>
                      <Typography component="span" variant="body2">
                        {alert.description}
                      </Typography>
                      <br />
                      <Typography
                        component="span"
                        variant="body2"
                        color="textSecondary"
                      >
                        {new Date(alert.timestamp).toLocaleString()}
                      </Typography>
                    </>
                  }
                />
                <ListItemSecondaryAction>
                  <IconButton edge="end" aria-label="edit">
                    <EditIcon />
                  </IconButton>
                  <IconButton edge="end" aria-label="delete">
                    <DeleteIcon />
                  </IconButton>
                </ListItemSecondaryAction>
              </ListItem>
            </React.Fragment>
          ))}
        </List>
      </Paper>

      <Dialog open={dialogOpen} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
        {selectedAlert && (
          <>
            <DialogTitle>Alert Details</DialogTitle>
            <DialogContent>
              <Box sx={{ mb: 2 }}>
                <Typography variant="h6">{selectedAlert.title}</Typography>
                <Typography color="textSecondary" gutterBottom>
                  {new Date(selectedAlert.timestamp).toLocaleString()}
                </Typography>
              </Box>

              <Box sx={{ mb: 2 }}>
                <Typography variant="subtitle2">Description</Typography>
                <Typography>{selectedAlert.description}</Typography>
              </Box>

              <Box sx={{ mb: 2 }}>
                <Typography variant="subtitle2">Location</Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <LocationIcon color="primary" />
                  <Typography>{selectedAlert.location}</Typography>
                </Box>
              </Box>

              <Box sx={{ mb: 2 }}>
                <Typography variant="subtitle2">Status</Typography>
                <TextField
                  select
                  fullWidth
                  value={selectedAlert.status}
                  margin="dense"
                >
                  <MenuItem value="active">Active</MenuItem>
                  <MenuItem value="investigating">Investigating</MenuItem>
                  <MenuItem value="resolved">Resolved</MenuItem>
                </TextField>
              </Box>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleCloseDialog}>Close</Button>
              <Button variant="contained" color="primary">
                Update Status
              </Button>
            </DialogActions>
          </>
        )}
      </Dialog>
    </Box>
  );
};

export default Alerts; 