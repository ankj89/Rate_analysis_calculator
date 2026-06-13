let materialData = [];


async function initMaterialMaster() {

    document
        .getElementById("uploadMaterialBtn")
        .addEventListener(
            "click",
            handleMaterialUpload
        );

    document
        .getElementById("materialSearch")
        .addEventListener(
            "input",
            applyMaterialFilters
        );

    document
        .getElementById("categoryFilter")
        .addEventListener(
            "change",
            applyMaterialFilters
        );

    document
        .getElementById("groupFilter")
        .addEventListener(
            "change",
            applyMaterialFilters
        );
    document
    .getElementById("exportMaterialBtn")
    .addEventListener(
        "click",
        exportMaterials
    );

    await loadMaterials();

}

async function handleMaterialUpload() {

    const file =
        document.getElementById(
            "materialUpload"
        ).files[0];

    if (!file) {

        alert("Select a file");

        return;
    }

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

    await materialService.clear();

    await materialService.addMany(rows);

    await loadMaterials();
}
async function loadMaterials() {

    materialData =
        await materialService.getAll();

    renderMaterialTable(materialData);

    populateCategoryFilter();

    populateGroupFilter();

}





function renderMaterialTable(data) {

    const tbody =
        document.getElementById(
            "materialTableBody"
        );

    tbody.innerHTML = "";

    data.forEach(m => {

        tbody.innerHTML += `
        <tr>

            <td>${m.Category || ""}</td>

            <td>${m["Material Group"] || ""}</td>

            <td>${m.Material || ""}</td>

            <td>${m.Brand || ""}</td>

            <td>${m.Specification || ""}</td>

            <td>${m.UOM || ""}</td>

            <td>${m.Rate || ""}</td>

           <td>

    <button
        class="btn btn-sm btn-warning"
        onclick="editMaterial(${m.id})">

        Edit

    </button>

    <button
        class="btn btn-sm btn-danger"
        onclick="deleteMaterial(${m.id})">

        Delete

    </button>

</td>

        </tr>
        `;

    });

}

function populateCategoryFilter() {

    const ddl =
        document.getElementById(
            "categoryFilter"
        );

    const categories =
        [...new Set(
            materialData.map(
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

function populateGroupFilter() {

    const ddl =
        document.getElementById(
            "groupFilter"
        );

    const groups =
        [...new Set(
            materialData.map(
                x => x["Material Group"]
            )
        )];

    ddl.innerHTML =
        '<option value="">All Groups</option>';

    groups.forEach(group => {

        ddl.innerHTML +=
        `<option value="${group}">
            ${group}
        </option>`;

    });

}


function applyMaterialFilters() {

    const search =
        document.getElementById("materialSearch")
            .value
            .toLowerCase();

    const category =
        document.getElementById("categoryFilter")
            .value;

    const group =
        document.getElementById("groupFilter")
            .value;

    let filtered = materialData;

    if(category){

        filtered = filtered.filter(
            x => x.Category === category
        );

    }

    if(group){

        filtered = filtered.filter(
            x => x["Material Group"] === group
        );

    }

    if(search){

        filtered = filtered.filter(
            x =>
                (x.Material || "")
                    .toLowerCase()
                    .includes(search)
                ||
                (x.Brand || "")
                    .toLowerCase()
                    .includes(search)
                ||
                (x.Specification || "")
                    .toLowerCase()
                    .includes(search)
        );

    }

    renderMaterialTable(filtered);

}

async function editMaterial(id) {

    const material =
        materialData.find(
            x => x.id === id
        );

    if (!material) return;

    const newRate =
        prompt(
            "Enter New Rate",
            material.Rate
        );

    if (
        newRate === null ||
        newRate === ""
    ) return;

    material.Rate =
        Number(newRate);

    await materialService.update(
        material
    );

    await loadMaterials();

}
async function deleteMaterial(id) {

    const confirmDelete =
        confirm(
            "Delete this material?"
        );

    if (!confirmDelete) return;

    await materialService.delete(id);

    await loadMaterials();

}

function exportMaterials() {

    const worksheet =
        XLSX.utils.json_to_sheet(
            materialData
        );

    const workbook =
        XLSX.utils.book_new();

    XLSX.utils.book_append_sheet(
        workbook,
        worksheet,
        "Materials"
    );

    XLSX.writeFile(
        workbook,
        "Material_Master.xlsx"
    );

}
