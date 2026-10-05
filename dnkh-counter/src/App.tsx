// src/App.tsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, Link } from 'react-router-dom';
import { CssBaseline, ThemeProvider, createTheme, AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import Home from './pages/Home';
import ImageMode from './pages/ImageMode';
import CaptureMode from './pages/CaptureMode';
import LiveMode from './pages/LiveMode';
import ProductionLineMode from './pages/ProductionLineMode';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: { main: '#00bcd4' },
    secondary: { main: '#ff9800' },
    background: { default: '#0d1b2a' },
  },
});

function App() {
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <Router>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              DNKH AI Item Counter
            </Typography>
            <Button color="inherit" component={Link} to="/">Home</Button>
            <Button color="inherit" component={Link} to="/image">Image</Button>
            <Button color="inherit" component={Link} to="/capture">Capture</Button>
            <Button color="inherit" component={Link} to="/live">Live</Button>
            <Button color="inherit" component={Link} to="/production">Production Line</Button>
          </Toolbar>
        </AppBar>
        <Box sx={{ padding: 2 }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/image" element={<ImageMode />} />
            <Route path="/capture" element={<CaptureMode />} />
            <Route path="/live" element={<LiveMode />} />
            <Route path="/production" element={<ProductionLineMode />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Box>
      </Router>
    </ThemeProvider>
  );
}

export default App;
