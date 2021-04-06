let useLocalStorage = false

window.onload = function () {
    const client = initClient()
    window.client = client
}

function initClient() {
    return useLocalStorage ? new LocalClient().init() : new IndexedClient().init()
}

class IndexedClient {
    init() {
        const open = indexedDB.open('store', 2);
        open.onupgradeneeded = function(event) {
            event.target.result.createObjectStore("appeals", { keyPath: "id" });
        };
        return this
    }

    setItem(key, value) {
        const open = indexedDB.open('store', 2);

        open.onsuccess = function (event) {
            const db = event.target.result;
            const transaction = db.transaction(["appeals"], "readwrite");
            const objectStore = transaction.objectStore("appeals");
            objectStore.add({"id": key, value: JSON.stringify(value) });
        };

    }

    getItem(key, callback) {
        const open = indexedDB.open('store', 2);

        open.onsuccess = function (event) {
            const db = event.target.result;
            const transaction = db.transaction(["appeals"], "readwrite");
            const objectStore = transaction.objectStore("appeals");
            const request = objectStore.get(key)
            request.onsuccess = function(event) {
            	if (event.target.result)
                	callback(JSON.parse(event.target.result.value))
            }
        };
    }
}

class LocalClient {

    init() {
        this.db = localStorage
        return this
    }

    setItem(key, value) {
        this.db.setItem(key, JSON.stringify(value))
    }

    getItem(key, callback) {
        const value = this.db.getItem(key)

        callback(JSON.parse(value))
    }
}
