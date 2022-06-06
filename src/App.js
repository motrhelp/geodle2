import { ThemeProvider, createTheme } from '@mui/material/styles';
import GuessFlag from './components/GuessFlag'

const darkTheme = createTheme({
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
    <ThemeProvider theme={darkTheme} >
      <GuessFlag />
    </ThemeProvider>
  );
}

export default App;
