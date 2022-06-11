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
import { backendKey, frontendKey, mapStyle, onClickMap, registerAttempt } from './guessMap/Markers';
import { useEffect } from 'react';

const containerStyle = {
    height: '100%',
    width: '100%'
};

var center = {
    lat: 0,
    lng: -40
};

const defaultMapOptions = {
    styles: mapStyle,
    disableDefaultUI: true,
}

Geocode.setApiKey(backendKey);

export default function GuessCapitalMapScreen({ country, previousLevel, nextLevel }) {

    const [markers, setMarkers] = useState([]);
    const [unconfirmedMarker, setUnconfirmedMarker] = useState();
    const [showConfirmation, setShowConfirmation] = useState();
    const [victory, setVictory] = useState();
    const [showSuccess, setShowSuccess] = useState();
    const [showFailure, setShowFailure] = useState();
    const [capital, setCapital] = useState(country.capital);

    // Load locations
    useEffect(() => {
        center.lat = country.lat;
        center.lng = country.lon;
    
        Geocode.fromAddress(capital.name).then(
            (response) => {
              const { lat, lng } = response.results[0].geometry.location;
              capital.lat = lat;
              capital.lon = lng;
            },
            (error) => {
              console.error(error);
            }
          );
    }, []);

    function getCapitalFromGeocode(geocode) {
        return geocode.results[0].address_components.find(address => address.types?.includes("locality"));
    }

    function isCapitalCloseToMarker() {
        return getDistanceFromLatLonInKm(capital.lat, capital.lon, unconfirmedMarker.lat, unconfirmedMarker.lng) < 20
    }

    function registerFailedAttempt() {
        registerAttempt(setMarkers, unconfirmedMarker, capital);
        setShowFailure(true);
        setShowConfirmation(false);
        setUnconfirmedMarker(null);
    }

    function registerSuccessfulAttempt() {
        setShowSuccess(true);
        setShowConfirmation(false);
        setVictory(true);
    }

    function onClickYes() {
        if (isCapitalCloseToMarker()) {
            registerSuccessfulAttempt();
        } else {
            registerFailedAttempt();
        }
    }
    function onClickNo() {
        setShowConfirmation(false);
        setUnconfirmedMarker(null);
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
            <TopBar title="Level 3" victory={victory} previousLevel={previousLevel} nextLevel={nextLevel} />

            <LoadScript
                googleMapsApiKey={frontendKey}
            >
                <GoogleMap
                    mapContainerStyle={containerStyle}
                    center={center}
                    zoom={4}
                    onClick={event => onClickMap(event, victory, setUnconfirmedMarker, setShowConfirmation)}
                    options={defaultMapOptions}
                >
                    {markers}

                    {unconfirmedMarker ?
                        <Marker
                            position={unconfirmedMarker}
                            animation={showConfirmation ? 1 : 0}
                        />
                        : null
                    }
                </GoogleMap>
            </LoadScript>

            <SuccessSnackbar
                showSuccess={showSuccess}
                place={country.capital.name}
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
                    onClickNo={onClickNo}
                    showConfirmation={showConfirmation}
                    place={country.capital.name}
                />
            }

        </Stack >
    )

}