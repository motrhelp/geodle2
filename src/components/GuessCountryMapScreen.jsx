import React, { useState } from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import { Stack } from '@mui/material';
import TopBar from './common/TopBar';
import BottomBar from './common/BottomBar';
import Geocode from "react-geocode";
import { getDistanceFromLatLonInKm } from '../util/DistanceCalculator';
import ConfirmationBar from './guessMap/ConfirmationBar';
import FailureSnackbar from './guessMap/FailureSnackbar';
import SuccessSnackbar from './guessMap/SuccessSnackbar';
import { mapStyle, onClickMap, registerAttempt } from './guessMap/Markers';

const containerStyle = {
    height: '100%',
    width: '100%'
};

const center = {
    lat: 0,
    lng: -40
};

const defaultMapOptions = {
    styles: mapStyle,
    disableDefaultUI: true,
}

Geocode.setApiKey("AIzaSyCkW8j9YYfVVgyewb01H4JQUoc0f-OVotc");

export default function GuessCountryMapScreen({ country, previousLevel, nextLevel }) {

    const [markers, setMarkers] = useState([]);
    const [unconfirmedMarker, setUnconfirmedMarker] = useState();
    const [showConfirmation, setShowConfirmation] = useState();
    const [victory, setVictory] = useState();
    const [showSuccess, setShowSuccess] = useState();
    const [showFailure, setShowFailure] = useState();

    function getCountryFromGeocode(geocode) {
        return geocode.results[0].address_components.find(address => address.types?.includes("country"));
    }

    function isCountryCloseToMarker() {
        return getDistanceFromLatLonInKm(country.lat, country.lon, unconfirmedMarker.lat, unconfirmedMarker.lng) < 200
    }

    function registerFailedAttempt() {
        registerAttempt(setMarkers, unconfirmedMarker, country);
        setShowFailure(true);
        setShowConfirmation(false);
        setUnconfirmedMarker(null);
    }

    function registerSuccessfulAttempt() {
        setShowSuccess(true);
        setVictory(true);
    }

    function onClickYes() {
        Geocode.fromLatLng(unconfirmedMarker.lat, unconfirmedMarker.lng).then(
            (response) => {
                let countryFromGeocode = getCountryFromGeocode(response);
                if (countryFromGeocode != undefined) {
                    if (country.code === countryFromGeocode.short_name) {
                        registerSuccessfulAttempt();
                    } else {
                        registerFailedAttempt();
                    }
                }
                // Workaround for disputed territories
                else if (isCountryCloseToMarker()) {
                    registerSuccessfulAttempt();
                } else {
                    registerFailedAttempt();
                }
            },
            (error) => {
                console.error(error);
            }
        );
    }

    return (
        <Stack
            justifyContent="space-between"
            alignItems="center"
            sx={{
                height: '100vh',

                /* mobile viewport bug fix */
                minHeight: '-webkit-fill-available ',
                maxHeight: '-webkit-fill-available',
            }}
            dispay='flex'
        >
            <TopBar title="Level 2" previousLevel={previousLevel} nextLevel={nextLevel} />

            <LoadScript
                googleMapsApiKey={"AIzaSyAC4obA_8hVx_SAzfc4V0Hn9LgIlfbha6w"}
            >
                <GoogleMap
                    mapContainerStyle={containerStyle}
                    center={center}
                    zoom={2}
                    onClick={event => onClickMap(event, victory, setUnconfirmedMarker, setShowConfirmation)}
                    options={defaultMapOptions}
                >
                    {markers}

                    {unconfirmedMarker ?
                        <Marker
                            position={unconfirmedMarker}
                            animation={1}
                        />
                        : null
                    }
                </GoogleMap>
            </LoadScript>

            <SuccessSnackbar 
                showSuccess={showSuccess}
                place={country.name}
            />

            <FailureSnackbar 
                showFailure={showFailure}
                setShowFailure={setShowFailure}
            />

            {victory ?
                <BottomBar />
                :
                <ConfirmationBar
                    onClickYes={onClickYes}
                    showConfirmation={showConfirmation}
                    place={country.name}
                />
            }

        </Stack >
    )

}