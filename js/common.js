const countdownEl = document.getElementById("countdown");
const targetDate = new Date("2025-08-17T00:00:00");

function updateCountdown() {
  const now = getDateFromParamOrNow();
  const diff = targetDate - now;
  countdownEl.innerText = diff == 0 ? "当日です！" : `結婚式まであと ${Math.floor(diff / (1000 * 60 * 60 * 24))}日`;
}

setInterval(updateCountdown, 1000);
updateCountdown();

function getDateFromParamOrNow() {
  const urlParams = new URLSearchParams(window.location.search);
  const dateStr = urlParams.get("date"); // 例: ?date=20250817

  if (dateStr && /^\d{8}$/.test(dateStr)) {
    const year = parseInt(dateStr.slice(0, 4), 10);
    const month = parseInt(dateStr.slice(4, 6), 10) - 1; // 0始まり
    const day = parseInt(dateStr.slice(6, 8), 10);

    const date = new Date(year, month, day);

    // 入力値と一致するか確認（不正な日付はズレる）
    if (
      date.getFullYear() === year &&
      date.getMonth() === month &&
      date.getDate() === day
    ) {
      return date;
    }
  }

  return new Date();
}
