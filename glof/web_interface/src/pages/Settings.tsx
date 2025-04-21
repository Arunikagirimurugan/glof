import React, { useState } from 'react';
import {
  Box,
  Typography,
  Paper,
  Grid,
  TextField,
  Switch,
  FormControlLabel,
  Button,
  Divider,
  Alert,
  Snackbar,
  Card,
  CardContent,
  InputAdornment,
} from '@mui/material';
import {
  Notifications as NotificationsIcon,
  Save as SaveIcon,
  Security as SecurityIcon,
  Storage as StorageIcon,
  Tune as TuneIcon,
} from '@mui/icons-material';

interface Settings {
  alertThreshold: number;
  refreshInterval: number;
  apiKey: string;
  notificationsEnabled: boolean;
  emailNotifications: boolean;
  smsNotifications: boolean;
  dataRetentionDays: number;
  debugMode: boolean;
}

const Settings: React.FC = () => {
  const [settings, setSettings] = useState<Settings>({
    alertThreshold: 0.7,
    refreshInterval: 5,
    apiKey: '****************************************',
    notificationsEnabled: true,
    emailNotifications: true,
    smsNotifications: false,
    dataRetentionDays: 30,
    debugMode: false,
  });

  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success' as 'success' | 'error',
  });

  const handleChange = (field: keyof Settings) => (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value =
      event.target.type === 'checkbox'
        ? event.target.checked
        : event.target.value;
    setSettings({ ...settings, [field]: value });
  };

  const handleSave = () => {
    // Simulate API call
    setTimeout(() => {
      setSnackbar({
        open: true,
        message: 'Settings saved successfully',
        severity: 'success',
      });
    }, 1000);
  };

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Typography variant="h4" gutterBottom>
        Settings
      </Typography>

      <Grid container spacing={3}>
        {/* Alert Settings */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <NotificationsIcon sx={{ mr: 1 }} />
                <Typography variant="h6">Alert Settings</Typography>
              </Box>
              <Divider sx={{ mb: 2 }} />

              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Alert Threshold"
                    type="number"
                    value={settings.alertThreshold}
                    onChange={handleChange('alertThreshold')}
                    InputProps={{
                      inputProps: { min: 0, max: 1, step: 0.1 },
                      endAdornment: (
                        <InputAdornment position="end">
                          {(settings.alertThreshold * 100).toFixed(0)}%
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <FormControlLabel
                    control={
                      <Switch
                        checked={settings.notificationsEnabled}
                        onChange={handleChange('notificationsEnabled')}
                      />
                    }
                    label="Enable Notifications"
                  />
                </Grid>
                <Grid item xs={12}>
                  <FormControlLabel
                    control={
                      <Switch
                        checked={settings.emailNotifications}
                        onChange={handleChange('emailNotifications')}
                      />
                    }
                    label="Email Notifications"
                  />
                </Grid>
                <Grid item xs={12}>
                  <FormControlLabel
                    control={
                      <Switch
                        checked={settings.smsNotifications}
                        onChange={handleChange('smsNotifications')}
                      />
                    }
                    label="SMS Notifications"
                  />
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>

        {/* System Settings */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <TuneIcon sx={{ mr: 1 }} />
                <Typography variant="h6">System Settings</Typography>
              </Box>
              <Divider sx={{ mb: 2 }} />

              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Data Refresh Interval"
                    type="number"
                    value={settings.refreshInterval}
                    onChange={handleChange('refreshInterval')}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">minutes</InputAdornment>
                      ),
                    }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Data Retention Period"
                    type="number"
                    value={settings.dataRetentionDays}
                    onChange={handleChange('dataRetentionDays')}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">days</InputAdornment>
                      ),
                    }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <FormControlLabel
                    control={
                      <Switch
                        checked={settings.debugMode}
                        onChange={handleChange('debugMode')}
                      />
                    }
                    label="Debug Mode"
                  />
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>

        {/* API Settings */}
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <SecurityIcon sx={{ mr: 1 }} />
                <Typography variant="h6">API Settings</Typography>
              </Box>
              <Divider sx={{ mb: 2 }} />

              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="API Key"
                    type="password"
                    value={settings.apiKey}
                    onChange={handleChange('apiKey')}
                  />
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Box sx={{ mt: 3, display: 'flex', justifyContent: 'flex-end' }}>
        <Button
          variant="contained"
          color="primary"
          startIcon={<SaveIcon />}
          onClick={handleSave}
        >
          Save Settings
        </Button>
      </Box>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={snackbar.severity}
          sx={{ width: '100%' }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default Settings; 