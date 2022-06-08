import { CssBaseline } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import GuessFlag from './components/GuessFlag'

const blackAndWhiteTheme = createTheme({
  palette: {
    type: 'light',
    primary: {
      main: '#212121',
    },
    secondary: {
      main: '#dd2c00',
    },
  },
});


function App() {
  return (
    <ThemeProvider theme={blackAndWhiteTheme} >
      <CssBaseline enableColorScheme />
      <GuessFlag />
    </ThemeProvider>
  );
}

export default App;
