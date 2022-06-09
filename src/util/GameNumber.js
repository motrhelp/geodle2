
import {countriesWithFlags, countryList} from "../data/CountryList";

export const gameNumber = generateConsistentRandomGameNumber();

function generateConsistentRandomGameNumber() {
    return generateConsistentRandomNumber(0, countriesWithFlags.length);
}

export function generateConsistentRandomNumber(hash, limit) {
    // First hash, based on the date
    const today = new Date();
    const firstHash = (today.getDate() + hash + today.getMonth() * 5) % limit;

    // Second hash, based on a country's name
    let secondHash = 0;
    for (let i = 0; i < countryList[firstHash].name.length; i++) {
        secondHash += countryList[firstHash].name.charCodeAt(0);
    }

    // Combine the two
    let thirdHash = firstHash * secondHash;

    return thirdHash % limit;
}