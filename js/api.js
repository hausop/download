const API = "https://certificate-api.taiyung133.workers.dev";

const TIMEOUT = 10000; // 10 秒
const RETRY_DELAY = 1000; // 1 秒

async function fetchWithTimeout(url) {

    const controller = new AbortController();

    const timer = setTimeout(() => {

        controller.abort();

    }, TIMEOUT);

    try {

        const response = await fetch(url, {

            signal: controller.signal

        });

        clearTimeout(timer);

        return response;

    } catch (err) {

        clearTimeout(timer);

        throw err;

    }

}

async function request(url, retry = true) {

    try {

        const response = await fetchWithTimeout(url);

        if (!response.ok) {

            throw new Error(`API Error: ${response.status}`);

        }

        return await response.json();

    } catch (err) {

        // Timeout 或 5xx 時自動重試一次
        if (
            retry &&
            (
                err.name === "AbortError" ||
                err.message.includes("500") ||
                err.message.includes("502") ||
                err.message.includes("503")
            )
        ) {

            console.log("Retrying...");

            await new Promise(resolve =>
                setTimeout(resolve, RETRY_DELAY)
            );

            return request(url, false);

        }

        if (err.name === "AbortError") {

            throw new Error("查詢逾時，請稍後再試");

        }

        throw err;

    }

}

async function searchFiles(school, team) {

    const url =
        `${API}?action=search&school=${encodeURIComponent(school)}&team=${encodeURIComponent(team)}`;

    return request(url);

}

async function getGuide() {

    return request(`${API}?action=guide`);

}

console.log("api.js loaded");
