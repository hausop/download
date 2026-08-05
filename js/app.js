console.log("app.js loaded");

document.addEventListener("DOMContentLoaded", () => {

    console.log("DOM loaded");

    const searchBtn = document.getElementById("searchBtn");
    const btnText = searchBtn.querySelector("span");
    const resultDiv = document.getElementById("result");

    document.querySelectorAll("input").forEach(input => {

        input.addEventListener("keydown", e => {

            if (e.key === "Enter") {
                searchBtn.click();
            }

        });

    });

    searchBtn.addEventListener("click", async () => {

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

        let progress = 0;

        searchBtn.style.setProperty("--progress", "0%");

        const timer = setInterval(() => {

            if (progress < 20) progress += 4;
            else if (progress < 40) progress += 3;
            else if (progress < 60) progress += 2;
            else if (progress < 80) progress += 1.5;
            else if (progress < 90) progress += .5;

            if (progress > 90) progress = 90;

            searchBtn.style.setProperty("--progress", progress + "%");

        }, 80);

        try {

            const result = await searchFiles(school, team);

            clearInterval(timer);

            searchBtn.style.setProperty("--progress", "100%");

            if (result.length === 0) {

                resultDiv.innerHTML = `
                    <div class="no-result">
                        ❌ 查無符合資料
                    </div>
                `;

            } else {

                result.forEach(file => {

    resultDiv.innerHTML += `

        <a
            class="file-link"
            href="${file.preview}"
            target="_blank"
            rel="noopener noreferrer">

            ${file.name}

        </a>

    `;

});

            }

        } catch (err) {

            clearInterval(timer);

            console.error(err);

            resultDiv.innerHTML = `
                <div class="no-result">
                    ⚠️ 查詢失敗，請稍後再試
                </div>
            `;

            searchBtn.style.setProperty("--progress", "100%");

        } finally {

            searchBtn.classList.remove("loading");
            searchBtn.classList.add("success");

            btnText.textContent = "✔ 完成";

            setTimeout(() => {

                searchBtn.classList.remove("success");
                searchBtn.style.setProperty("--progress", "0%");
                btnText.textContent = "🔍 查詢";
                searchBtn.disabled = false;

            }, 600);

        }

    });

});
