import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation, Navigate } from 'react-router-dom';
import {
  ThemeProvider,
  AppBar,
  Toolbar,
  Typography,
  Box,
  CssBaseline,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  IconButton,
  Avatar,
  Chip,
  Tooltip,
  Divider
} from '@mui/material';
import DashboardRoundedIcon from '@mui/icons-material/DashboardRounded';
import Inventory2RoundedIcon from '@mui/icons-material/Inventory2Rounded';
import LocalShippingRoundedIcon from '@mui/icons-material/LocalShippingRounded';
import ReceiptLongRoundedIcon from '@mui/icons-material/ReceiptLongRounded';
import PointOfSaleRoundedIcon from '@mui/icons-material/PointOfSaleRounded';
import SwapVertRoundedIcon from '@mui/icons-material/SwapVertRounded';
import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded';
import MenuRoundedIcon from '@mui/icons-material/MenuRounded';

import { modernTheme } from './theme';
import Dashboard from './pages/Dashboard';
import Products from './pages/Products';
import Suppliers from './pages/Suppliers';
import Purchases from './pages/Purchases';
import Sales from './pages/Sales';
import Movements from './pages/Movements';
import Login from './pages/Login';
import apiClient from './api/client';

const drawerWidth = 260;

const menuItems = [
  { text: 'Dashboard', path: '/', icon: <DashboardRoundedIcon /> },
  { text: 'Inventory Catalog', path: '/products', icon: <Inventory2RoundedIcon /> },
  { text: 'Suppliers', path: '/suppliers', icon: <LocalShippingRoundedIcon /> },
  { text: 'Purchase Orders', path: '/purchases', icon: <ReceiptLongRoundedIcon /> },
  { text: 'Sales & POS', path: '/sales', icon: <PointOfSaleRoundedIcon /> },
  { text: 'Stock Audit Log', path: '/movements', icon: <SwapVertRoundedIcon /> },
];

function Layout({ children }: { children: React.ReactNode }) {
  const token = localStorage.getItem('token');
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState<any>(null);

  useEffect(() => {
    if (token) {
      apiClient
        .get('/auth/me')
        .then((res) => setCurrentUser(res.data))
        .catch(() => {
          localStorage.removeItem('token');
          window.location.href = '/login';
        });
    }
  }, [token]);

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    window.location.href = '/login';
  };

  const drawerContent = (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%', bgcolor: '#0f172a', color: '#f8fafc' }}>
      {/* Brand Header */}
      <Box sx={{ p: 3, display: 'flex', alignItems: 'center', gap: 1.5 }}>
        <Box
          sx={{
            width: 40,
            height: 40,
            borderRadius: 2.5,
            bgcolor: 'primary.main',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 4px 14px rgba(37,99,235,0.4)',
          }}
        >
          <Inventory2RoundedIcon sx={{ color: '#fff', fontSize: 24 }} />
        </Box>
        <Box>
          <Typography variant="h6" sx={{ fontWeight: 800, fontSize: '1.1rem', lineHeight: 1.2, letterSpacing: '-0.02em' }}>
            StockFlow Pro
          </Typography>
          <Typography variant="caption" sx={{ color: '#94a3b8', fontSize: '0.72rem' }}>
            Enterprise Inventory
          </Typography>
        </Box>
      </Box>

      <Divider sx={{ borderColor: 'rgba(255,255,255,0.08)', mx: 2 }} />

      {/* Nav Menu */}
      <Box sx={{ px: 2, py: 2, flexGrow: 1 }}>
        <List disablePadding>
          {menuItems.map((item) => {
            const active = location.pathname === item.path;
            return (
              <ListItem key={item.text} disablePadding sx={{ mb: 0.8 }}>
                <ListItemButton
                  component={Link}
                  to={item.path}
                  onClick={() => setMobileOpen(false)}
                  sx={{
                    borderRadius: 2,
                    px: 2,
                    py: 1.2,
                    color: active ? '#ffffff' : '#94a3b8',
                    bgcolor: active ? 'rgba(37, 99, 235, 0.2)' : 'transparent',
                    border: active ? '1px solid rgba(37, 99, 235, 0.4)' : '1px solid transparent',
                    '&:hover': {
                      bgcolor: active ? 'rgba(37, 99, 235, 0.25)' : 'rgba(255,255,255,0.05)',
                      color: '#ffffff',
                    },
                    transition: 'all 0.15s ease-in-out',
                  }}
                >
                  <ListItemIcon
                    sx={{
                      color: active ? 'primary.light' : '#64748b',
                      minWidth: 38,
                    }}
                  >
                    {item.icon}
                  </ListItemIcon>
                  <ListItemText
                    primary={item.text}
                    slotProps={{
                      primary: {
                        sx: {
                          fontSize: '0.9rem',
                          fontWeight: active ? 600 : 500,
                        },
                      },
                    }}
                  />
                </ListItemButton>
              </ListItem>
            );
          })}
        </List>
      </Box>

      {/* User profile & Logout */}
      <Box sx={{ p: 2, bgcolor: 'rgba(0,0,0,0.2)', borderTop: '1px solid rgba(255,255,255,0.08)' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, overflow: 'hidden' }}>
            <Avatar sx={{ bgcolor: 'secondary.main', width: 36, height: 36, fontSize: '0.9rem', fontWeight: 700 }}>
              {currentUser?.email ? currentUser.email.charAt(0).toUpperCase() : 'U'}
            </Avatar>
            <Box sx={{ overflow: 'hidden' }}>
              <Typography noWrap variant="body2" sx={{ fontWeight: 600, color: '#f8fafc' }}>
                {currentUser?.email || 'User'}
              </Typography>
              <Chip
                label={currentUser?.role || 'Admin'}
                size="small"
                sx={{
                  height: 18,
                  fontSize: '0.65rem',
                  bgcolor: 'rgba(16, 185, 129, 0.2)',
                  color: '#34d399',
                  fontWeight: 700,
                  px: 0.5,
                }}
              />
            </Box>
          </Box>
          <Tooltip title="Log out">
            <IconButton onClick={handleLogout} sx={{ color: '#94a3b8', '&:hover': { color: '#ef4444' } }}>
              <LogoutRoundedIcon fontSize="small" />
            </IconButton>
          </Tooltip>
        </Box>
      </Box>
    </Box>
  );

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', bgcolor: 'background.default' }}>
      <CssBaseline />

      {/* Top Navbar */}
      <AppBar
        position="fixed"
        elevation={0}
        sx={{
          width: { md: `calc(100% - ${drawerWidth}px)` },
          ml: { md: `${drawerWidth}px` },
          bgcolor: 'rgba(255, 255, 255, 0.85)',
          backdropFilter: 'blur(8px)',
          borderBottom: '1px solid #e2e8f0',
          color: 'text.primary',
        }}
      >
        <Toolbar sx={{ justifyContent: 'space-between', px: { xs: 2, md: 3 } }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <IconButton
              color="inherit"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ mr: 1, display: { md: 'none' } }}
            >
              <MenuRoundedIcon />
            </IconButton>
            <Typography variant="subtitle1" sx={{ fontWeight: 700, color: '#1e293b' }}>
              {menuItems.find((m) => m.path === location.pathname)?.text || 'Stock Control'}
            </Typography>
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
            <Chip
              label="Live Sync Active"
              color="success"
              variant="outlined"
              size="small"
              sx={{ fontWeight: 600, display: { xs: 'none', sm: 'inline-flex' } }}
            />
          </Box>
        </Toolbar>
      </AppBar>

      {/* Drawers */}
      <Box component="nav" sx={{ width: { md: drawerWidth }, flexShrink: { md: 0 } }}>
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{ keepMounted: true }}
          sx={{
            display: { xs: 'block', md: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
        >
          {drawerContent}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', md: 'block' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth, borderRight: 'none' },
          }}
          open
        >
          {drawerContent}
        </Drawer>
      </Box>

      {/* Main Page Area */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: { xs: 2, sm: 3, md: 4 },
          width: { md: `calc(100% - ${drawerWidth}px)` },
          mt: 8,
          maxWidth: 1600,
        }}
      >
        {children}
      </Box>
    </Box>
  );
}

export default function App() {
  return (
    <ThemeProvider theme={modernTheme}>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Layout><Dashboard /></Layout>} />
          <Route path="/products" element={<Layout><Products /></Layout>} />
          <Route path="/suppliers" element={<Layout><Suppliers /></Layout>} />
          <Route path="/purchases" element={<Layout><Purchases /></Layout>} />
          <Route path="/sales" element={<Layout><Sales /></Layout>} />
          <Route path="/movements" element={<Layout><Movements /></Layout>} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}
