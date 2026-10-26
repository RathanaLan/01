import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Button,
  TextField,
  Typography,
  Container,
  Paper,
  Tabs,
  Tab,
  Alert,
  Stack,
  Divider,
} from '@mui/material';
import Inventory2RoundedIcon from '@mui/icons-material/Inventory2Rounded';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import PersonAddOutlinedIcon from '@mui/icons-material/PersonAddOutlined';
import axios from 'axios';

export default function Login() {
  const [tab, setTab] = useState<'LOGIN' | 'REGISTER'>('LOGIN');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const endpoint = tab === 'LOGIN' ? '/api/auth/login' : '/api/auth/register';
      const payload: any = { email, password };
      if (tab === 'REGISTER') {
        payload.role = 'ADMIN';
      }

      const res = await axios.post(`http://localhost:4000${endpoint}`, payload, { timeout: 2500 });
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('user_email', res.data.user.email);
      navigate('/');
    } catch (err: any) {
      // If backend server is not running (e.g. deployed on GitHub Pages), grant demo access!
      if (!err.response || err.code === 'ERR_NETWORK' || err.code === 'ECONNABORTED') {
        console.info('[Demo Mode] Server not detected, entering standalone client mode');
        localStorage.setItem('token', 'demo_client_jwt_token');
        localStorage.setItem('user_email', email || 'admin@stockflow.internal');
        navigate('/');
        return;
      }
      setError(err.response?.data?.error || 'Authentication failed. Please verify credentials.');
    } finally {
      setLoading(false);
    }
  };

  const handleQuickDemoFill = () => {
    setEmail('admin@stockflow.internal');
    setPassword('admin123');
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'radial-gradient(circle at 50% 30%, #1e293b 0%, #0f172a 100%)',
        p: 2,
      }}
    >
      <Container maxWidth="xs">
        <Paper
          elevation={4}
          sx={{
            p: 4,
            borderRadius: 4,
            border: '1px solid rgba(255,255,255,0.1)',
            bgcolor: '#ffffff',
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.4)',
          }}
        >
          {/* Brand Header */}
          <Box sx={{ textAlign: 'center', mb: 3 }}>
            <Box
              sx={{
                width: 52,
                height: 52,
                borderRadius: 3,
                bgcolor: 'primary.main',
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                mb: 1.5,
                boxShadow: '0 8px 20px rgba(37,99,235,0.4)',
              }}
            >
              <Inventory2RoundedIcon sx={{ color: '#fff', fontSize: 30 }} />
            </Box>
            <Typography variant="h5" sx={{ fontWeight: 800, color: '#0f172a' }}>
              StockFlow Pro
            </Typography>
            <Typography variant="body2" sx={{ color: '#64748b' }}>
              Enterprise Stock Control & Operations
            </Typography>
          </Box>

          {/* Tab Selector */}
          <Tabs
            value={tab}
            onChange={(_, val) => {
              setTab(val);
              setError('');
            }}
            variant="fullWidth"
            sx={{ mb: 3, borderBottom: '1px solid #e2e8f0' }}
          >
            <Tab icon={<LockOutlinedIcon fontSize="small" />} iconPosition="start" label="Sign In" value="LOGIN" sx={{ fontWeight: 600 }} />
            <Tab icon={<PersonAddOutlinedIcon fontSize="small" />} iconPosition="start" label="Register" value="REGISTER" sx={{ fontWeight: 600 }} />
          </Tabs>

          {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
          )}

          {/* Form */}
          <Box component="form" onSubmit={handleAuth}>
            <Stack spacing={2.5}>
              <TextField
                required
                fullWidth
                label="Email Address"
                placeholder="name@company.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="email"
              />
              <TextField
                required
                fullWidth
                label="Password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="current-password"
              />

              <Button
                type="submit"
                fullWidth
                variant="contained"
                size="large"
                disabled={loading}
                sx={{ py: 1.4, fontSize: '0.95rem' }}
              >
                {loading ? 'Authenticating...' : tab === 'LOGIN' ? 'Sign In to Portal' : 'Create Admin Account'}
              </Button>
            </Stack>
          </Box>

          <Divider sx={{ my: 3 }} />

          {/* Quick Demo Assist */}
          <Box sx={{ textAlign: 'center' }}>
            <Typography variant="caption" sx={{ color: '#64748b', display: 'block', mb: 1 }}>
              First time running the system? Click below to prefill demo credentials:
            </Typography>
            <Button
              variant="text"
              size="small"
              onClick={handleQuickDemoFill}
              sx={{ fontWeight: 600, color: 'primary.main', fontSize: '0.8rem' }}
            >
              Fill Demo Admin Credentials
            </Button>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
}
