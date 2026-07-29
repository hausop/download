console.log("app.js loaded");

document.addEventListener("DOMContentLoaded", () => {

    console.log("DOM loaded");

    document.getElementById("searchBtn").addEventListener("click", async () => {

        console.log("Search Click");

        const school = document.getElementById("school").value.trim();
        const team = document.getElementById("team").value.trim();

        try {
            const result = await searchFiles(school, team);

const resultDiv = document.getElementById("result");

resultDiv.innerHTML = "";

if (result.length === 0) {

    resultDiv.innerHTML = "<p>查無符合資料</p>";
    return;

}

result.forEach(file => {

    resultDiv.innerHTML += `
        <div class="file-card">
            <h3>${file.name}</h3>

            <a href="${file.preview}" target="_blank">
                👁️ 預覽
            </a>

            |

            <a href="${file.download}">
                ⬇️ 下載
            </a>
        </div>
    `;

});
        } catch (err) {
            console.error(err);
        }

    });

    document.getElementById("guideBtn").addEventListener("click", async () => {

        console.log("Guide Click");

        try {
            const result = await getGuide();
            window.open(result.url, "_blank");
        } catch (err) {
            console.error(err);
        }

    });

});
