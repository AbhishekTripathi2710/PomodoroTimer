let timer = null;
let timeLeft = 25 * 60; 
let isRunning = false;

function broadcastUpdate() {
  chrome.runtime.sendMessage({ timeLeft, isRunning });
}

function startTimer() {
  if (isRunning) return;
  isRunning = true;
  timer = setInterval(() => {
    timeLeft--;
    broadcastUpdate();

    if (timeLeft <= 0) {
      clearInterval(timer);
      isRunning = false;
      showNotification();
    }
  }, 1000);
}

function stopTimer() {
  clearInterval(timer);
  isRunning = false;
}

function resetTimer() {
  stopTimer();
  timeLeft = 25 * 60;
  broadcastUpdate();
}

function showNotification() {
  chrome.notifications.create({
    type: "basic",
    iconUrl: "icons/icon128.png",
    title: "Focus session complete!",
    message: "Time for a break 🎉",
    priority: 2
  });
}

chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
  if (msg.command === "start") startTimer();
  if (msg.command === "stop") stopTimer();
  if (msg.command === "reset") resetTimer();
  if (msg.command === "getState")
    sendResponse({ timeLeft, isRunning });

  return true; 
});
