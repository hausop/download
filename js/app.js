console.log("app.js loaded");

document.addEventListener("DOMContentLoaded", () => {

    console.log("DOM loaded");

    document.getElementById("searchBtn").addEventListener("click", async () => {

        console.log("Search Click");

        const school = document.getElementById("school").value.trim();
        const team = document.getElementById("team").value.trim();

        try {
            const result = await searchFiles(school, team);
            console.log(result);
        } catch (err) {
            console.error(err);
        }

    });

    document.getElementById("guideBtn").addEventListener("click", async () => {

        console.log("Guide Click");

        try {
            const result = await getGuide();
            console.log(result);
        } catch (err) {
            console.error(err);
        }

    });

});
