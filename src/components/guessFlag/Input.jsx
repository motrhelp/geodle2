import { Autocomplete, Popper, Stack, TextField, Button } from "@mui/material";
import { useState } from "react";
import { countryList } from "../../data/CountryList";
import { getBearingFromLatLon, getDistanceFromLatLonInKm } from "../../util/DistanceCalculator";

export default function Input({ country, setGuesses, setVictory }) {

    const [guessInput, setGuessInput] = useState(null);

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
            pb={1}
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
                color="secondary"
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