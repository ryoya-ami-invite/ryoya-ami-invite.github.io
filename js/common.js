const countdownEl = document.getElementById("countdown");
const targetDate = new Date("2025-08-18T00:00:00");

function updateCountdown() {
  const now = new Date();
  const diff = targetDate - now;
  countdownEl.innerText = diff <= 0 ? "当日です！" : `結婚式まであと ${Math.floor(diff / (1000 * 60 * 60 * 24))}日`;
}

setInterval(updateCountdown, 1000);
updateCountdown();