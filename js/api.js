const API = "https://certificate-api.taiyung133.workers.dev";

async function searchFiles(school, team) {

    const url =
        `${API}?action=search&school=${encodeURIComponent(school)}&team=${encodeURIComponent(team)}`;

    const response = await fetch(url);

    if (!response.ok) {
        throw new Error(`API Error: ${response.status}`);
    }

    return await response.json();
}

async function getGuide() {

    const response =
        await fetch(`${API}?action=guide`);

    if (!response.ok) {
        throw new Error(`API Error: ${response.status}`);
    }

    return await response.json();
}

console.log("api.js loaded");
