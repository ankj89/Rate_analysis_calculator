let laborData = [];

async function initLaborMaster() {

    document
        .getElementById("uploadLaborBtn")
        .addEventListener(
            "click",
            () => {
                document
                    .getElementById("laborUpload")
                    .click();
            }
        );

    document
        .getElementById("laborUpload")
        .addEventListener(
            "change",
            handleLaborUpload
        );

    document
        .getElementById("laborSearch")
        .addEventListener(
            "input",
            applyLaborFilters
        );

    document
        .getElementById("laborCategoryFilter")
        .addEventListener(
            "change",
            applyLaborFilters
        );

    await loadLabor();

}

async function handleLaborUpload() {

    const file =
        document.getElementById(
            "laborUpload"
        ).files[0];

    if (!file) return;

    const data =
        await file.arrayBuffer();

    const workbook =
        XLSX.read(data);

    const sheet =
        workbook.Sheets[
            workbook.SheetNames[0]
        ];

    const rows =
        XLSX.utils.sheet_to_json(sheet);

    await laborService.clear();

    await laborService.addMany(rows);

    await loadLabor();

}

async function loadLabor() {

    laborData =
        await laborService.getAll();

    renderLaborTable(laborData);

    populateLaborCategoryFilter();

}

function renderLaborTable(data) {

    const tbody =
        document.getElementById(
            "laborTableBody"
        );

    tbody.innerHTML = "";

    data.forEach(m => {

        tbody.innerHTML += `
        <tr>
            <td>${m.Category || ""}</td>
            <td>${m.Activity || ""}</td>
            <td>${m["Rate Type"] || ""}</td>
            <td>${m.Rate || ""}</td>
        </tr>
        `;

    });

}

function populateLaborCategoryFilter() {

    const ddl =
        document.getElementById(
            "laborCategoryFilter"
        );

    const categories =
        [...new Set(
            laborData.map(
                x => x.Category
            )
        )];

    ddl.innerHTML =
        '<option value="">All Categories</option>';

    categories.forEach(cat => {

        ddl.innerHTML +=
        `<option value="${cat}">
            ${cat}
        </option>`;

    });

}

function applyLaborFilters() {

    const search =
        document
            .getElementById(
                "laborSearch"
            )
            .value
            .toLowerCase();

    const category =
        document
            .getElementById(
                "laborCategoryFilter"
            )
            .value;

    let filtered = laborData;

    if(category){

        filtered =
            filtered.filter(
                x => x.Category === category
            );

    }

    if(search){

        filtered =
            filtered.filter(
                x =>
                    (x.Activity || "")
                    .toLowerCase()
                    .includes(search)
            );

    }

    renderLaborTable(filtered);

}
