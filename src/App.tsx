import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, CssBaseline, Container } from '@mui/material';
import { createTheme } from '@mui/material/styles';
import List from './pages/List.tsx';
import Create from './pages/Create.tsx';
import Update from './pages/Update.tsx';
import View from './pages/View.tsx';
import TopNav from './components/TopNav.tsx';

const theme = createTheme({
  typography: {
    fontFamily: 'Poppins, sans-serif',
    h4: {
      fontFamily: 'Poppins, sans-serif',
    },
    button: {
      fontFamily: 'Poppins, sans-serif',
    },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          fontFamily: 'Poppins, sans-serif',
        },
      },
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <TopNav />
        <Container>
          <Routes>
            <Route path="/" element={<List />} />
            <Route path="/create" element={<Create />} />
            <Route path="/update/:id" element={<Update />} />
            <Route path="/view/:id" element={<View />} />
          </Routes>
        </Container>
      </Router>
    </ThemeProvider>
  );
}

export default App;
