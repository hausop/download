document.addEventListener("DOMContentLoaded", () => {

    document
        .getElementById("searchBtn")
        .addEventListener("click", async () => {

            const school =
                document.getElementById("school").value.trim();

            const team =
                document.getElementById("team").value.trim();

            console.log(await searchFiles(school, team));

        });

    document
        .getElementById("guideBtn")
        .addEventListener("click", async () => {

            const result = await getGuide();

            console.log(result);

        });

});
