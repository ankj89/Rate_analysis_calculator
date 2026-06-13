async function initMaterialMaster() {

    document
        .getElementById("uploadMaterialBtn")
        .addEventListener(
            "click",
            handleMaterialUpload
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

    const materials =
        await materialService.getAll();

    const tbody =
        document.getElementById(
            "materialTableBody"
        );

    tbody.innerHTML = "";

    materials.forEach(m => {

        tbody.innerHTML += `
        <tr>

            <td>${m.Category || ""}</td>

            <td>${m["Material Group"] || ""}</td>

            <td>${m.Material || ""}</td>

            <td>${m.Brand || ""}</td>

            <td>${m.Rate || ""}</td>

        </tr>
        `;

    });

}
