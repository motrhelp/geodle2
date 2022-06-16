import { CssBaseline } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { useState } from 'react';
import GuessCapitalMapScreen from './components/GuessCapitalMapScreen';
import GuessCapitalName from './components/GuessCapitalName';
import GuessCountryMapScreen from './components/GuessCountryMapScreen';
import GuessFlagScreen from './components/GuessFlagScreen'
import { countriesWithFlags } from './data/CountryList';
import { gameNumber } from './util/GameNumber'

function App() {

  const [level, setLevel] = useState(3);

  function nextLevel() {
    setLevel(level + 1);
  }

  function previousLevel() {
    setLevel(level - 1);
  }

  // Color theme
  const blackAndWhiteTheme = createTheme({
    palette: {
      type: 'light',
      primary: {
        main: '#000000'
      },
      secondary: {
        main: '#ffffff',
      }
    },
  });

  // The country to guess
  const country = countriesWithFlags[gameNumber];

  return (
    <ThemeProvider theme={blackAndWhiteTheme} >
      <CssBaseline enableColorScheme />
      {level == 1 ?
        <GuessFlagScreen country={country} nextLevel={nextLevel} />
        : level == 2 ?
          <GuessCountryMapScreen country={country} previousLevel={previousLevel} nextLevel={nextLevel} />
          : level == 3 ?
            <GuessCapitalName country={country} previousLevel={previousLevel} nextLevel={nextLevel} />
            : level == 4 ?
              <GuessCapitalMapScreen country={country} previousLevel={previousLevel} />
              : null
      }
    </ThemeProvider>
  );
}

export default App;
