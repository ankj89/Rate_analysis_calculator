async function initRateAnalysis() {

    await loadRACategories();

}
async function loadRACategories() {

    const materials =
        await materialService.getAll();

    const categories =
        [...new Set(
            materials.map(
                x => x.Category
            )
        )];

    const ddl =
        document.getElementById(
            "raCategory"
        );

    ddl.innerHTML = "";

    categories.forEach(cat => {

        ddl.innerHTML += `
            <option value="${cat}">
                ${cat}
            </option>
        `;

    });

}
