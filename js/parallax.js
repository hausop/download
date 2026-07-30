let targetX = 0;
let targetY = 0;

let currentX = 0;
let currentY = 0;

// iPhone 權限
if (
    typeof DeviceOrientationEvent !== "undefined" &&
    typeof DeviceOrientationEvent.requestPermission === "function"
) {

    document.addEventListener(
        "click",
        async () => {

            try {

                const permission =
                    await DeviceOrientationEvent.requestPermission();

                if (permission === "granted") {

                    startParallax();

                }

            } catch (e) {}

        },
        { once: true }
    );

} else {

    startParallax();

}

function startParallax() {

    window.addEventListener("deviceorientation", e => {

        const gamma = e.gamma || 0;
        const beta = e.beta || 0;

        targetX = gamma * 1.2;
        targetY = beta * 0.6;

    });

}

function animate() {

    currentX += (targetX - currentX) * 0.05;
    currentY += (targetY - currentY) * 0.05;

    document.body.style.setProperty(
        "--bg-transform",
        `translate3d(${currentX}px, ${currentY}px, 0)`
    );

    requestAnimationFrame(animate);

}

animate();
