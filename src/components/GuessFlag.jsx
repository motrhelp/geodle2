import React, { useState } from 'react'

import { AppBar, Autocomplete, Button, Dialog, DialogContent, DialogContentText, DialogTitle, IconButton, List, ListItem, ListItemAvatar, ListItemText, Paper, Popper, Stack, Toolbar, Typography } from '@mui/material';
import { TextField } from '@mui/material';
import { Box, textAlign } from '@mui/system';
import { ArrowBackIos, ArrowForwardIos, East, North, NorthEast, NorthWest, ShareLocation, South, SouthEast, SouthWest, West } from '@mui/icons-material';
import PublicIcon from '@mui/icons-material/Public';
import ShareIcon from '@mui/icons-material/Share';
import CheckIcon from '@mui/icons-material/Check';
import RefreshIcon from '@mui/icons-material/Refresh';

import { countriesWithFlags, countryList } from '../data/CountryList'
import { gameNumber } from '../util/GameNumber';
import { getBearingFromLatLon, getDistanceFromLatLonInKm } from '../util/DistanceCalculator';
import dist from 'react-scrollable-list';

// The country to guess
const country = countriesWithFlags[gameNumber];

function Flag() {
    return (
        <Paper justifyContent='center' elevation={1} >
            <Box
                component="img"
                src={"https://flagcdn.com/" + country.code.toLowerCase() + ".svg"}
                alt="flag"
                width={'100%'}
                maxWidth={'400px'}
                px={1}
                pt={1}
            />
        </Paper>
    )
}


export default function GuessFlag() {

    const [guesses, setGuesses] = useState([]);
    const [guessInput, setGuessInput] = useState();
    const [victory, setVictory] = useState(false);

    function Input() {
        const PopperMy = function (props) {
            return (<Popper {...props} placement='top' style={{ width: '1' }} />)
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
                setVictory(true);
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
                <Button
                    variant='outlined'
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

        function getBearingIcon(bearing, distance) {
            if (distance > 0) {
                return bearingIcons[Math.round(bearing / 45)];
            } else {
                return <CheckIcon />
            }
        }

        return (
            <List
                sx={{
                    maxHeight: '250px',
                    minHeight: '150px',
                    overflow: 'auto'
                }}
                dense
            >
                {guesses.map((guess, index) =>
                    <ListItem key={index}>
                        <ListItemAvatar>
                            {getBearingIcon(guess.bearing, guess.distance)}
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

    function Hint() {
        return (
            <Typography variant="h6">
                Can you guess the country by its flag?
            </Typography>
        )
    }

    function EndGameBar() {
        return (
            <AppBar position='static' sx={{ top: 'auto', bottom: 0 }}>
                <Toolbar>
                    <IconButton
                        color="inherit"
                    >
                        <PublicIcon />
                    </IconButton>
                    <Typography variant="h6" component="div" sx={{
                        flexGrow: 1,
                        textAlign: 'center'
                    }}>
                        VICTORY
                    </Typography>
                    <IconButton
                        color="inherit">
                        <ShareIcon />
                    </IconButton>
                </Toolbar>
            </AppBar>
        )
    }

    const onClickRefresh = () => {
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

            <AppBar position="static">
                <Toolbar >
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        sx={{ mr: 2 }}
                    >
                        <ArrowBackIos />
                    </IconButton>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        GEODLE
                    </Typography>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        Level 1
                    </Typography>
                    {victory ?
                        <IconButton
                            color='inherit'
                            onClick={onClickRefresh}
                        >
                            <RefreshIcon />
                        </IconButton>
                        : null
                    }
                    <IconButton
                        edge="end"
                        color="inherit"
                    >
                        <ArrowForwardIos />
                    </IconButton>
                </Toolbar>
            </AppBar>

            <Flag />

            {guesses.length < 3 ?
                <Hint />
                :
                null
            }

            <Guesses guesses={guesses} />

            {victory ?
                <EndGameBar />
                :
                <Input guesses={guesses} />
            }
        </Stack>
    )
}