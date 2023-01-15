import React from 'react';
import { ThemeProvider } from '@mui/material';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Homepage from './pages/Homepage';
import TermsAndConditions from './pages/TermsAndConditions';
import MicrophoneRecoder from './components/MicrophoneRecorder/MicrophoneRecoder';
import Done from './pages/Done';
import theme from './theme';

const App = () => (
  <ThemeProvider theme={theme}>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/session/:sessionCode/terms" element={<TermsAndConditions />} />
        <Route path="/session/:sessionCode/audio/:audioId" element={<MicrophoneRecoder />} />
        <Route path="/session/:sessionCode/done" element={<Done />} />
      </Routes>
    </BrowserRouter>
  </ThemeProvider>
);

export default App;
