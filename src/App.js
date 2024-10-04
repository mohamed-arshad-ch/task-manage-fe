// src/App.js
import React from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';
import TaskList from './components/TaskList';

const theme = createTheme({
  palette: {
    mode: 'light', // You can switch to 'dark' for a dark theme
    primary: {
      main: '#1976d2', // Customize your primary color
    },
    secondary: {
      main: '#dc004e', // Customize your secondary color
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <TaskList />
    </ThemeProvider>
  );
}

export default App;
