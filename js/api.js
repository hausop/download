const API =
    "https://script.google.com/macros/s/AKfycbzevezXvC7qezFEXmrPl_uWY53R65Q2_vDdOu_GIIXqRDm_LV4A_zQByfjyY7SKNYu0/exec";

async function searchFiles(school, team) {

    const url =
        `${API}?action=search&school=${encodeURIComponent(school)}&team=${encodeURIComponent(team)}`;

    const response = await fetch(url);

    if (!response.ok) {
        throw new Error("API Error");
    }

    return await response.json();

}

async function getGuide() {

    const response =
        await fetch(`${API}?action=guide`);

    if (!response.ok) {
        throw new Error("API Error");
    }

    return await response.json();

}
