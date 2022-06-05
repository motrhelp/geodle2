import { loadItem, storeItem } from "./DataStorage"

var lastRefreshed;

function setLastRefreshed(lastRefreshedFromStorage) {
    lastRefreshed = lastRefreshedFromStorage;
}

async function refreshVersion() {
    var now = new Date();
    await loadItem("lastRefreshed", null, setLastRefreshed);
    if (lastRefreshed != null) {
        var minutesSinceRefresh = Math.ceil((now - new Date(lastRefreshed)) / 1000 / 60);
    }
    if (lastRefreshed == null || minutesSinceRefresh > 60) {
        storeItem("lastRefreshed", new Date());
        window.location.reload(false);
    }
}

export default refreshVersion;