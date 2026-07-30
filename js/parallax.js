let targetX = 0;
let targetY = 0;

window.addEventListener("deviceorientation", e => {

    const x = e.gamma || 0;
    const y = e.beta || 0;

    targetX = x * 0.8;
    targetY = y * 0.4;

});
