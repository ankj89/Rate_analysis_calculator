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

    const datalistId =
        "materialList_" +
        Date.now();

    let options = "";

    materials.forEach(m => {

        const displayText =

            `${m.Material || ""} | ` +
            `${m.Brand || ""} | ` +
            `${m.Specification || ""}`;

        options += `
            <option value="${displayText}">
        `;

    });

    row.innerHTML = `

        <td>

            <input
                class="form-control materialSearch"
                list="${datalistId}"
                placeholder="Search or type new material">

            <datalist id="${datalistId}">
                ${options}
            </datalist>

        </td>

        <td>

            <input
                class="form-control uomInput">

        </td>

        <td>

            <input
                type="number"
                value="1"
                class="form-control qtyInput">

        </td>

        <td>

            <input
                type="number"
                class="form-control rateInput">

        </td>

        <td>

            <input
                class="form-control amountInput"
                readonly>

        </td>

        <td>

            <button
                type="button"
                class="btn btn-danger removeRow">

                X

            </button>

        </td>

    `;

    tbody.appendChild(row);

    wireMaterialRow(
        row,
        materials
    );

}

function wireMaterialRow(
    row,
    materials
) {

    const materialSearch =
        row.querySelector(
            ".materialSearch"
        );

    const uom =
        row.querySelector(
            ".uomInput"
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

    const removeBtn =
        row.querySelector(
            ".removeRow"
        );

    materialSearch.addEventListener(
        "change",
        () => {

            const selected =
                materials.find(m => {

                    const text =

                        `${m.Material || ""} | ` +
                        `${m.Brand || ""} | ` +
                        `${m.Specification || ""}`;

                    return (
                        text ===
                        materialSearch.value
                    );

                });

            if(selected){

                uom.value =
                    selected.UOM || "";

                rate.value =
                    selected.Rate || 0;

                uom.readOnly = true;
                rate.readOnly = true;

            }
            else{

                uom.value = "";
                rate.value = "";

                uom.readOnly = false;
                rate.readOnly = false;

            }

            calculate();

        }
    );

    qty.addEventListener(
        "input",
        calculate
    );

    rate.addEventListener(
        "input",
        calculate
    );

    removeBtn.addEventListener(
        "click",
        () => {

            row.remove();

            updateMaterialSummary();

        }
    );

    function calculate() {

        const total =

            Number(
                qty.value || 0
            )

            *

            Number(
                rate.value || 0
            );

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
