import React, { useState } from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import { Snackbar, Stack, Button, Alert } from '@mui/material';
import TopBar from './common/TopBar';
import BottomBar from './common/BottomBar';
import Geocode from "react-geocode";
import { getBearingFromLatLon, getDistanceFromLatLonInKm } from '../util/DistanceCalculator';

const apiKey = "AIzaSyAC4obA_8hVx_SAzfc4V0Hn9LgIlfbha6w";

const containerStyle = {
    height: '100%',
    width: '100%'
};

const center = {
    lat: 0,
    lng: -40
};

const mapStyle = [
    {
        "elementType": "labels",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "administrative",
        "elementType": "geometry",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "administrative.land_parcel",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "administrative.neighborhood",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "poi",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "road",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "road",
        "elementType": "labels.icon",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "transit",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    }
]

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

    function onClick(mapMouseEvent) {
        if (!victory) {
            setUnconfirmedMarker({
                lat: mapMouseEvent.latLng.lat(),
                lng: mapMouseEvent.latLng.lng()
            })

            setShowConfirmation(true);
        }
    }

    function getCountryFromGeocode(geocode) {
        return geocode.results[0].address_components.find(address => address.types?.includes("country"));
    }

    function isCountryCloseToMarker() {
        return getDistanceFromLatLonInKm(country.lat, country.lon, unconfirmedMarker.lat, unconfirmedMarker.lng) < 200
    }

    function registerAttempt() {
        const bearingIcons = [
            "m15 5-1.41 1.41L18.17 11H2v2h16.17l-4.59 4.59L15 19l7-7-7-7z",
            "M19 9h-2v6.59L5.41 4 4 5.41 15.59 17H9v2h10V9z",
            "m19 15-1.41-1.41L13 18.17V2h-2v16.17l-4.59-4.59L5 15l7 7 7-7z",
            "M15 19v-2H8.41L20 5.41 18.59 4 7 15.59V9H5v10h10z",
            "m9 19 1.41-1.41L5.83 13H22v-2H5.83l4.59-4.59L9 5l-7 7 7 7z",
            "M5 15h2V8.41L18.59 20 20 18.59 8.41 7H15V5H5v10z",
            "m5 9 1.41 1.41L11 5.83V22h2V5.83l4.59 4.59L19 9l-7-7-7 7z",
            "M9 5v2h6.59L4 18.59 5.41 20 17 8.41V15h2V5H9z",
            "m15 5-1.41 1.41L18.17 11H2v2h16.17l-4.59 4.59L15 19l7-7-7-7z"
        ]

        function getBearingIcon() {
            let bearing = getBearingFromLatLon(unconfirmedMarker.lat, unconfirmedMarker.lng, country.lat, country.lon,);
            return bearingIcons[Math.round(bearing / 45)];
        }

        setMarkers((previousMarkers) => [,
            ...previousMarkers,
            <Marker
                key={unconfirmedMarker.lat + unconfirmedMarker.lng + previousMarkers.length}
                position={{
                    lat: unconfirmedMarker.lat,
                    lng: unconfirmedMarker.lng
                }}
                icon={{
                    path: getBearingIcon(),
                    fillColor: "black",
                    fillOpacity: 1,
                }}
            />
        ]);
    }

    function registerFailedAttempt() {
        registerAttempt();
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
            // spacing={1}
            sx={{
                height: '100vh',

                /* mobile viewport bug fix */
                minHeight: '-webkit-fill-available ',
                maxHeight: '-webkit-fill-available',
            }}
            dispay='flex'
        >
            <TopBar title="Level 2" previousLevel={previousLevel} nextLevel={nextLevel}/>
            <LoadScript
                googleMapsApiKey={apiKey}
            >
                <GoogleMap
                    mapContainerStyle={containerStyle}
                    center={center}
                    zoom={2}
                    onClick={onClick}
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
            <Snackbar
                open={showConfirmation && !showSuccess}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
                autoHideDuration={6000}
                message={"Are you sure this is " + country.name + "?"}
                action={
                    <Button
                        onClick={onClickYes}
                    >
                        YES
                    </Button>
                }
            />

            <Snackbar
                open={!showConfirmation && !showSuccess}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
                autoHideDuration={6000}
                message={"Can you point " + country.name + " on the map?"}
            />

            <Snackbar open={showSuccess}
                autoHideDuration={6000}
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                sx={{ paddingTop: 10 }}
            >
                <Alert severity="success">
                    Well done! You found {country.name}
                </Alert>
            </Snackbar>

            <Snackbar open={showFailure}
                autoHideDuration={6000}
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                sx={{ paddingTop: 10 }}
                onClose={() => setShowFailure(false)}
            >
                <Alert severity="error">
                    Wrong! The arrow is a hint.
                </Alert>
            </Snackbar>

            {
                victory ?
                    <BottomBar />
                    : null
            }

        </Stack >
    )

}