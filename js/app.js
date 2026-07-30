console.log("app.js loaded");

document.addEventListener("DOMContentLoaded", () => {

    const loading = document.getElementById("loading");
const searchBtn = document.getElementById("searchBtn");

    document.querySelectorAll("input").forEach(input => {

    input.addEventListener("keydown", e => {

        if (e.key === "Enter") {
            searchBtn.click();
        }

    });

});

    console.log("DOM loaded");

    document.getElementById("searchBtn").addEventListener("click", async () => {

        console.log("Search Click");

        const school = document.getElementById("school").value.trim();
        const team = document.getElementById("team").value.trim();

        try {
            searchBtn.disabled = true;
searchBtn.textContent = "查詢中...";

loading.style.display = "block";

const result = await searchFiles(school, team);

loading.style.display = "none";

searchBtn.disabled = false;
searchBtn.textContent = "🔍 查詢";

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

            <a href="${file.download}" target="_blank" rel="noopener noreferrer">
    ⬇️ 下載
            </a>
        </div>
    `;

});
            
            document.getElementById("team").addEventListener("keydown", (e) => {

    if (e.key === "Enter") {
        searchBtn.click();
    }

});
      
        } catch (err) {

    loading.style.display = "none";

    searchBtn.disabled = false;
    searchBtn.textContent = "🔍 查詢";

    console.error(err);

}

    });

    document.getElementById("guideBtn").addEventListener("click", async () => {

        console.log("Guide Click");

        try {
            const result = await getGuide();
            window.open(result.url, "_blank", "noopener,noreferrer");
        } catch (err) {
            console.error(err);
        }

    });

});
