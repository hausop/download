console.log("app.js loaded");

document.addEventListener("DOMContentLoaded", () => {

    console.log("DOM loaded");

    const loading = document.getElementById("loading");
    const searchBtn = document.getElementById("searchBtn");
    const btnText = searchBtn.querySelector(".btn-text");
    const arrow = searchBtn.querySelector(".btn-arrow");
    const resultDiv = document.getElementById("result");

    document.querySelectorAll("input").forEach(input => {

        input.addEventListener("keydown", e => {

            if (e.key === "Enter") {
                searchBtn.click();
            }

        });

    });

    searchBtn.addEventListener("click", async () => {

        console.log("Search Click");

        const school = document.getElementById("school").value.trim();
        const team = document.getElementById("team").value.trim();

        if (!school || !team) {

            alert("請輸入學校及隊名");

            return;

        }

        resultDiv.innerHTML = "";

        searchBtn.disabled = true;

searchBtn.classList.add("loading");

btnText.textContent = "查詢中...";

        try {

            const result = await searchFiles(school, team);

                    if (result.length === 0) {

                resultDiv.innerHTML = `
                    <div class="no-result">
                        ❌ 查無符合資料
                    </div>
                `;

                return;

            }

            result.forEach(file => {

                resultDiv.innerHTML += `
                    <div class="file-card">

                        <h3>${file.name}</h3>

                        <a
                            href="${file.preview}"
                            target="_blank">

                            👁️ 預覽

                        </a>

                        <a
                            href="${file.download}"
                            target="_blank"
                            rel="noopener noreferrer">

                            ⬇️ 下載

                        </a>

                    </div>
                `;

            });

        } catch (err) {

            console.error(err);

            resultDiv.innerHTML = `
                <div class="no-result">
                    ⚠️ 查詢失敗，請稍後再試
                </div>
            `;

        } finally {

            searchBtn.classList.remove("loading");
searchBtn.classList.add("success");

searchBtn.textContent = "✔ 完成";

setTimeout(()=>{

    searchBtn.classList.remove("success");

    searchBtn.classList.remove("loading");

btnText.textContent = "✔ 完成";

setTimeout(()=>{

    btnText.textContent="🔍 查詢";

    searchBtn.disabled=false;

},500);

        }

    });

    document.getElementById("guideBtn").addEventListener("click", async () => {

        console.log("Guide Click");

        try {

            const result = await getGuide();

            window.open(
                result.url,
                "_blank",
                "noopener,noreferrer"
            );

        } catch (err) {

            console.error(err);

            alert("下載失敗，請稍後再試");

        }

    });

});
