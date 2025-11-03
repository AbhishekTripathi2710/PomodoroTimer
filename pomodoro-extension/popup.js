document.getElementById("startBtn").addEventListener("click", () => {
  chrome.runtime.sendMessage({ command: "start" });
});

document.getElementById("pauseBtn").addEventListener("click", () => {
  chrome.runtime.sendMessage({ command: "stop" });
});

document.getElementById("resetBtn").addEventListener("click", () => {
  chrome.runtime.sendMessage({ command: "reset" });
});

function updateDisplay(timeLeft) {
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  document.getElementById("timerDisplay").textContent =
    `${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}`;
}

setInterval(() => {
  chrome.runtime.sendMessage({ command: "getState" }, (res) => {
    if (!res) return;
    updateDisplay(res.timeLeft);
  });
}, 1000);
