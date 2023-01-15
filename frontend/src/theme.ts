import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#6610F2',
    },
    secondary: {
      main: '#2F0147',
    },
    error: {
      main: '#EF6351',
    },
    success: {
      main: '#519872',
    },
    info: {
      main: '#FFFCF2',
    },
  },
});

export default theme;
