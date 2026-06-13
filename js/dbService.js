let db;

async function initDB() {

    return new Promise((resolve, reject) => {

        const request =
            indexedDB.open(DB_NAME, DB_VERSION);

        request.onupgradeneeded = function (event) {

            db = event.target.result;

            if (!db.objectStoreNames.contains(STORES.MATERIALS)) {
                db.createObjectStore(STORES.MATERIALS, {
                    keyPath: "id",
                    autoIncrement: true
                });
            }

            if (!db.objectStoreNames.contains(STORES.LABOR)) {
                db.createObjectStore(STORES.LABOR, {
                    keyPath: "id",
                    autoIncrement: true
                });
            }

            if (!db.objectStoreNames.contains(STORES.DERIVED)) {
                db.createObjectStore(STORES.DERIVED, {
                    keyPath: "id",
                    autoIncrement: true
                });
            }

            if (!db.objectStoreNames.contains(STORES.SETTINGS)) {
                db.createObjectStore(STORES.SETTINGS, {
                    keyPath: "id"
                });
            }
        };

        request.onsuccess = function (event) {
            db = event.target.result;
            resolve();
        };

        request.onerror = function () {
            reject();
        };

    });

}
