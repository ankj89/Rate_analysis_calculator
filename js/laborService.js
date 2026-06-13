const laborService = {

    async getAll() {

        return new Promise((resolve, reject) => {

            const tx =
                db.transaction(
                    STORES.LABOR,
                    "readonly"
                );

            const store =
                tx.objectStore(
                    STORES.LABOR
                );

            const request =
                store.getAll();

            request.onsuccess = () =>
                resolve(request.result);

            request.onerror = reject;

        });

    },

    async addMany(records) {

        return new Promise((resolve, reject) => {

            const tx =
                db.transaction(
                    STORES.LABOR,
                    "readwrite"
                );

            const store =
                tx.objectStore(
                    STORES.LABOR
                );

            records.forEach(r => store.add(r));

            tx.oncomplete = resolve;
            tx.onerror = reject;

        });

    },

    async clear() {

        return new Promise((resolve, reject) => {

            const tx =
                db.transaction(
                    STORES.LABOR,
                    "readwrite"
                );

            const store =
                tx.objectStore(
                    STORES.LABOR
                );

            const request =
                store.clear();

            request.onsuccess = resolve;
            request.onerror = reject;

        });

    }

};
