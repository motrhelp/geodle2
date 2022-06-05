import React, { useState } from 'react'

import { Autocomplete, Button, List, ListItem, ListItemAvatar, ListItemText, Popper, Stack } from '@mui/material';
import { TextField } from '@mui/material';
import { Box } from '@mui/system';
import { South } from '@mui/icons-material';

import { countryList } from '../data/CountryList'
import { gameNumber } from '../util/GameNumber';

// The country to guess
const country = countryList[64];

function Flag() {
    return (
        <Box
            component="img"
            src={"https://flagcdn.com/" + country.code.toLowerCase() + ".svg"}
            alt="flag"
            width={'99%'}
            maxWidth={'400px'}
            border={1}
        />
    )
}


export default function GuessFlag() {

    const [guesses, setGuesses] = useState([]);
    const [guessInput, setGuessInput] = useState();

    function Input() {
        const PopperMy = function (props) {
            return (<Popper {...props} placement='top' />)
        }

        function onPressGuess() {
            setGuesses((previousGuesses) => [
                guessInput,
                ...previousGuesses
            ]);
        }

        return (
            <Stack
                direction="row"
                spacing={2}
            >
                <Autocomplete
                    options={countryList}
                    getOptionLabel={country => country.name}
                    renderInput={(params) => <TextField {...params} />}
                    sx={{
                        width: 260
                    }}
                    PopperComponent={PopperMy}
                    value={guessInput}
                    onChange={(event, newInput) => setGuessInput(newInput)}
                />
                <Button variant='contained' disableElevation
                    onClick={onPressGuess}
                >
                    Guess
                </Button>
            </Stack>
        )
    }

    function Guesses() {
        return (
            <List
                sx={{
                    maxHeight: '250px',
                    overflow: 'auto'
                }}
            >
                {guesses.map((guess, index) =>
                    <ListItem key={index}>
                        <ListItemAvatar>
                            <Box
                                component={"img"}
                                src={"https://flagcdn.com/20x15/" + guess.code.toLowerCase() + ".png"}
                                alt="guessFlagIcon"
                            />
                        </ListItemAvatar>
                        <ListItemAvatar>
                            <South />
                        </ListItemAvatar>
                        <ListItemText
                            sx={{ display: 'inline' }}
                            primary={guess.name}
                            secondary={Math.floor(Math.random() * 25000) + " km"}
                        >
                        </ListItemText>
                    </ListItem>
                )}
            </List>
        );
    }

    return (
        <Stack
            justifyContent="space-between"
            alignItems="center"
            spacing={1}
            px={1}
            py={1}
            sx={{
                /* mobile viewport bug fix */
                height: '-webkit-fill-available',
                minHeight: '-webkit-fill-available',
            }}
        >
            <Flag />
            <Guesses guesses={guesses} />
            <Input guesses={guesses} />
        </Stack>
    )
}