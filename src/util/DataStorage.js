import AsyncStorage from '@react-native-async-storage/async-storage';

import countryList from '../data/CountryList';
import { gameNumber } from './GameNumber';

const today = new Date();
const datePrefix = gameNumber + today.getDate() + "" + today.getMonth();

export async function loadItem(item, fallback, setterToCall) {
    try {
        const itemFromStorage = await AsyncStorage.getItem('@' + datePrefix + item);
        if (itemFromStorage != null) {
            return setterToCall(JSON.parse(itemFromStorage));
        }
    } catch (e) {
        console.log("Error loading " + item);
        console.log(e);
    }
    return setterToCall(fallback);
}

export async function loadGlobalItem(item, fallback, setterToCall) {
    try {
        const itemFromStorage = await AsyncStorage.getItem('@' + item);
        if (itemFromStorage != null) {
            return setterToCall(JSON.parse(itemFromStorage));
        }
    } catch (e) {
        console.log("Error loading " + item);
        console.log(e);
    }
    return setterToCall(fallback);
}

export async function storeItem(name, value) {
    try {
        await AsyncStorage.setItem('@' + datePrefix + name, JSON.stringify(value));
    } catch (e) {
        console.log("Error storing " + name);
        console.log(e);
    }
}

export async function storeGlobalItem(name, value) {
    try {
        await AsyncStorage.setItem('@' + name, JSON.stringify(value));
    } catch (e) {
        console.log("Error storing " + name);
        console.log(e);
    }
}

export async function flushStorage() {
    AsyncStorage.clear();
}