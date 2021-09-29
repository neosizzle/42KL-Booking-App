import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
  palette: {
    type: 'light',
    primary: {
      main: '#38560f',
      contrastText: '#f7fbec',
    },
    secondary: {
      main: '#b46d60',
    },
    info: {
      main: '#60a7b4',
    },
    background: {
      default: '#fffaf2',
    },
  },
  typography: {
    fontFamily: 'NTR',
    subtitle2: {
      fontSize: '0.9rem',
    },
    fontSize: 17,
    fontWeightLight: 300,
  },
  props: {
    MuiButtonBase: {
      disableRipple: true,
    },
  },
  spacing: 8,
});