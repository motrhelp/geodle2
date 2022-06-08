import { CssBaseline } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import GuessFlagScreen from './components/GuessFlagScreen'
import { countriesWithFlags } from './data/CountryList';
import { gameNumber } from './util/GameNumber'

function App() {
  const blackAndWhiteTheme = createTheme({
    palette: {
      type: 'light',
      primary: {
        main: '#ffffff',
      },
      secondary: {
        main: '#dd2c00',
      },
    },
  });

  // The country to guess
  const country = countriesWithFlags[gameNumber];

  return (
    <ThemeProvider theme={blackAndWhiteTheme} >
      <CssBaseline enableColorScheme />
      <GuessFlagScreen country={country} />
    </ThemeProvider>
  );
}

export default App;
