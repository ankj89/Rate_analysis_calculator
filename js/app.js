document.addEventListener(
    "DOMContentLoaded",
    async () => {

        await initDB();

        initializeNavigation();

        await initMaterialMaster();
        await initLaborMaster();

    }
);

function initializeNavigation() {

    document.querySelectorAll(".nav-btn")
        .forEach(btn => {

            btn.addEventListener("click", () => {

                switchPage(
                    btn.dataset.page
                );

            });

        });

}
