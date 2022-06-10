import React, { useState } from 'react'

import { Stack, Typography } from '@mui/material';

import Flag from './guessFlag/Flag';
import TopBar from './common/TopBar';
import BottomBar from './common/BottomBar';
import Guesses from './guessFlag/Guesses';
import Input from './guessFlag/Input';


export default function GuessFlagSreen({ country, nextLevel }) {

    const [guesses, setGuesses] = useState([]);
    const [victory, setVictory] = useState(false);

    function Hint({ condition }) {
        return (
            condition ?
                <Typography variant="h6">
                    Can you guess the country by its flag?
                </Typography>
                :
                null
        )
    }

    return (
        <Stack
            justifyContent="space-between"
            alignItems="center"
            spacing={1}
            sx={{
                height: '100vh',

                /* mobile viewport bug fix */
                minHeight: '-webkit-fill-available',
                maxHeight: '-webkit-fill-available',
            }}
            dispay='flex'
        >
            <TopBar victory={victory} nextLevel={nextLevel} />

            <Flag countryCode={country.code} />

            <Hint condition={guesses.length < 3 && !victory} />

            <Guesses guesses={guesses} />

            {victory ?
                <BottomBar />
                :
                <Input country={country} setGuesses={setGuesses} setVictory={setVictory} />
            }
        </Stack>
    )
}