const materialService = {

    async getAll() {

        return new Promise((resolve, reject) => {

            const tx =
                db.transaction(
                    STORES.MATERIALS,
                    "readonly"
                );

            const store =
                tx.objectStore(
                    STORES.MATERIALS
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
                    STORES.MATERIALS,
                    "readwrite"
                );

            const store =
                tx.objectStore(
                    STORES.MATERIALS
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
                    STORES.MATERIALS,
                    "readwrite"
                );

            const store =
                tx.objectStore(
                    STORES.MATERIALS
                );

            const request =
                store.clear();

            request.onsuccess = resolve;
            request.onerror = reject;

        });

    }

};

async update(record) {

    return new Promise((resolve, reject) => {

        const tx = db.transaction(
            STORES.MATERIALS,
            "readwrite"
        );

        const store = tx.objectStore(
            STORES.MATERIALS
        );

        const request = store.put(record);

        request.onsuccess = resolve;
        request.onerror = reject;

    });

},

async delete(id) {

    return new Promise((resolve, reject) => {

        const tx = db.transaction(
            STORES.MATERIALS,
            "readwrite"
        );

        const store = tx.objectStore(
            STORES.MATERIALS
        );

        const request = store.delete(id);

        request.onsuccess = resolve;
        request.onerror = reject;

    });

}
