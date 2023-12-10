let container = document.querySelector(".container");
let btn = document.getElementById("spin");
let isSpinning = false;
let totalRotation = 0; // Tích lũy góc quay

btn.onclick = function () {
    if (!isSpinning) {
        isSpinning = true;
        let rotation = 0;
        let spinSpeed = 500; // 2 vòng mỗi giây (1000 milliseconds / 2)
        let startTime = performance.now();

        function spin() {
            let currentTime = performance.now();
            let elapsedTime = currentTime - startTime;
            let progress = elapsedTime / spinSpeed;

            if (progress < 1) {
                rotation = 360 * progress; // 360 degrees per turn, 2 turns per second
                container.style.transform = "rotate(" + (totalRotation + rotation) + "deg)";
                requestAnimationFrame(spin);
            } else {
                isSpinning = false;
                totalRotation += rotation; // Cộng dồn góc quay
                // Choose the result here based on the final rotation angle
                chooseResult(totalRotation % 360);
            }
        }

        requestAnimationFrame(spin);
    }
};

// Function to choose the result based on the final rotation angle
function chooseResult(finalRotation) {
    let result;
    if (finalRotation >= 45 && finalRotation < 135) {
        result = 3;
    } else if (finalRotation >= 135 && finalRotation < 225) {
        result = 5;
    } else if (finalRotation >= 225 && finalRotation < 315) {
        result = 7;
    } else {
        result = -1; // Không thuộc 3 số 3, 5, 7
    }
    console.log("Result: " + result);
}