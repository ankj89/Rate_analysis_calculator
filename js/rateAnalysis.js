async function initRateAnalysis() {

    await loadRACategories();

    document
        .getElementById("addMaterialRow")
        .addEventListener(
            "click",
            addMaterialRow
        );

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

async function addMaterialRow() {

    const materials =
        await materialService.getAll();

    const tbody =
        document.getElementById(
            "raMaterialTable"
        );

    const row =
        document.createElement("tr");

    let options = "";

    materials.forEach(m => {

        options += `
        <option
            value="${m.id}"
            data-rate="${m.Rate || 0}">

            ${m.Material || ""} |
            ${m.Brand || ""} |
            ${m.Specification || ""}

        </option>
        `;

    });

    row.innerHTML = `

        <td>

            <select class="form-select materialDropdown">

                <option value="">
                    Select Material
                </option>

                ${options}

            </select>

        </td>

        <td>

            <input
                type="number"
                class="form-control qtyInput"
                value="1">

        </td>

        <td>

            <input
                class="form-control rateInput"
                readonly>

        </td>

        <td>

            <input
                class="form-control amountInput"
                readonly>

        </td>

        <td>

            <button
                class="btn btn-danger">

                X

            </button>

        </td>

    `;

    tbody.appendChild(row);

    wireMaterialRow(row);

}

function wireMaterialRow(row) {

    const dropdown =
        row.querySelector(
            ".materialDropdown"
        );

    const qty =
        row.querySelector(
            ".qtyInput"
        );

    const rate =
        row.querySelector(
            ".rateInput"
        );

    const amount =
        row.querySelector(
            ".amountInput"
        );

    dropdown.addEventListener(
        "change",
        () => {

            const selected =
                dropdown.selectedOptions[0];

            const materialRate =
                Number(
                    selected.dataset.rate || 0
                );

            rate.value =
                materialRate;

            calculateRow();

        }
    );

    qty.addEventListener(
        "input",
        calculateRow
    );

    function calculateRow() {

        const total =
            Number(qty.value || 0)
            *
            Number(rate.value || 0);

        amount.value =
            total.toFixed(2);

        updateMaterialSummary();

    }

}

function updateMaterialSummary() {

    let total = 0;

    document
        .querySelectorAll(
            ".amountInput"
        )
        .forEach(x => {

            total +=
                Number(
                    x.value || 0
                );

        });

    document
        .getElementById(
            "materialCost"
        )
        .innerText =
        total.toFixed(2);

    updateTotalCost();

}

function updateTotalCost() {

    const materialCost =
        Number(
            document
                .getElementById(
                    "materialCost"
                )
                .innerText || 0
        );

    const laborCost =
        Number(
            document
                .getElementById(
                    "laborCost"
                )
                .innerText || 0
        );

    const directCost =
        materialCost + laborCost;

    document
        .getElementById(
            "directCost"
        )
        .innerText =
        directCost.toFixed(2);

}
