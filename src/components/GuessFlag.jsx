import React, { useState } from 'react'

import { Autocomplete, Button, Dialog, DialogContent, DialogContentText, DialogTitle, List, ListItem, ListItemAvatar, ListItemText, Popper, Stack } from '@mui/material';
import { TextField } from '@mui/material';
import { Box } from '@mui/system';
import { East, North, NorthEast, NorthWest, South, SouthEast, SouthWest, West } from '@mui/icons-material';

import { countriesWithFlags, countryList } from '../data/CountryList'
import { gameNumber } from '../util/GameNumber';
import { getBearingFromLatLon, getDistanceFromLatLonInKm } from '../util/DistanceCalculator';

// The country to guess
const country = countriesWithFlags[gameNumber];

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
    const [openVictoryAlert, setOpenVictoryAlert] = useState(false);

    function Input() {
        const PopperMy = function (props) {
            return (<Popper {...props} placement='top' style={{ width: '400px' }} />)
        }

        function onPressGuess() {
            // Calculate distance and bearing
            let distance = getDistanceFromLatLonInKm(guessInput.lat, guessInput.lon, country.lat, country.lon);
            let bearing = getBearingFromLatLon(guessInput.lat, guessInput.lon, country.lat, country.lon);

            // Register attempt
            setGuesses((previousGuesses) => [
                {
                    ...guessInput,
                    distance,
                    bearing
                },
                ...previousGuesses
            ]);

            // Process victory
            if (guessInput.code === country.code) {
                setOpenVictoryAlert(true);
            }

            // Clean up
            setGuessInput();
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
                <Button variant='outlined' 
                    onClick={onPressGuess}
                >
                    Guess
                </Button>
            </Stack>
        )
    }

    function Guesses() {
        const bearingIcons = [<East />, <SouthEast />, <South />, <SouthWest />,
        <West />, <NorthWest />, <North />, <NorthEast />, <East />];

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
                            {bearingIcons[Math.round(guess.bearing / 45)]}
                        </ListItemAvatar>
                        <ListItemAvatar>
                            <Box
                                component={"img"}
                                src={"https://flagcdn.com/20x15/" + guess.code.toLowerCase() + ".png"}
                                alt="guessFlagIcon"
                            />
                        </ListItemAvatar>
                        <ListItemText
                            sx={{ display: 'inline' }}
                            primary={guess.name}
                            secondary={guess.distance + " km"}
                        >
                        </ListItemText>
                    </ListItem>
                )}
            </List>
        );
    }

    const onCloseVictoryAlert = () => {
        setOpenVictoryAlert(false);
        window.location.reload(false);
    };

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

            {/* Alert */}
            <Dialog
                open={openVictoryAlert}
                onClose={onCloseVictoryAlert}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {"Well done!"}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        You got it right, it's {country.name}! For now that's it. I'm still working on further logic. Stay tuned.
                    </DialogContentText>
                </DialogContent>
            </Dialog>
        </Stack>
    )
}