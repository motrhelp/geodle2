import { Marker } from "@react-google-maps/api";
import { getBearingFromLatLon } from "../../util/DistanceCalculator";

export const backendKey = "AIzaSyCkW8j9YYfVVgyewb01H4JQUoc0f-OVotc";
export const frontendKey = "AIzaSyAC4obA_8hVx_SAzfc4V0Hn9LgIlfbha6w";

export const mapStyle = [
    {
        "elementType": "labels",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    // {
    //     "featureType": "administrative",
    //     "elementType": "geometry",
    //     "stylers": [
    //         {
    //             "visibility": "off"
    //         }
    //     ]
    // },
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

export function onClickMap(mapMouseEvent, victory, setUnconfirmedMarker, setShowConfirmation) {
    if (!victory) {
        setUnconfirmedMarker({
            lat: mapMouseEvent.latLng.lat(),
            lng: mapMouseEvent.latLng.lng()
        })

        setShowConfirmation(true);
    }
}

export function registerAttempt(setMarkers, unconfirmedMarker, place) {
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
        let bearing = getBearingFromLatLon(unconfirmedMarker.lat, unconfirmedMarker.lng, place.lat, place.lon,);
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