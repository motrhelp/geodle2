
const coordNames = ["→", "↘", "↓", "↙", "←", "↖", "↑", "↗", "→"];

const mapWidth = 430;
const mapHeight = 332;

function deg2rad(deg) {
    return deg * (Math.PI / 180)
}

export function getDistanceFromLatLonInKm(lat1, lon1, lat2, lon2) {
    var R = 6371; // Radius of the earth in km
    var dLat = deg2rad(lat2 - lat1);  // deg2rad below
    var dLon = deg2rad(lon2 - lon1);
    var a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2)
        ;
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    var d = R * c; // Distance in km
    return d;
}

function latLonToXY(latitude, longitude) {

    // get x value
    var x = (longitude + 180) * (mapWidth / 360)

    // convert from degrees to radians
    var latRad = latitude * Math.PI / 180;

    // get y value
    var mercN = Math.log(Math.tan((Math.PI / 4) + (latRad / 2)));
    var y = (mapHeight / 2) - (mapWidth * mercN / (2 * Math.PI));
    
    return [x, y];
}

export function getBearingFromLatLon(lat1, lon1, lat2, lon2) {
    var [x1, y1] = latLonToXY(lat1, lon1);
    var [x2, y2] = latLonToXY(lat2, lon2);

    // Flip the country to the other side of the map if it's closer this way
    if (Math.abs(x1 - x2) > mapWidth / 2) {
        if (x1 > x2) {
            x1 = x1 - mapWidth;
        } else {
            x2 = x2 - mapWidth;
        }
    }

    // Calculate the angle between the two countries
    var radians = Math.atan2(y2 - y1, x2 - x1); // in radians
    var compassReading = radians * (180 / Math.PI); // in degrees [-180, 180], 0 is East
    if (compassReading < 0) {   // in degreed [0, 360], 0 is East
        compassReading += 360;
    }
    
    var coordIndex = Math.round(compassReading / 45);

    return coordNames[coordIndex];
}