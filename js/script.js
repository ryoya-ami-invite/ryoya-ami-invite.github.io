// カウントダウン
const countdownEl = document.getElementById("countdown");
const targetDate = new Date("2025-08-17T24:00:00");

function updateCountdown() {
  const now = new Date();
  const diff = targetDate - now;

  if (diff <= 0) {
    countdownEl.innerText = "当日です！";
    return;
  }

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  countdownEl.innerText = `結婚式まであと ${days}日`;
}

setInterval(updateCountdown, 1000);
updateCountdown();

// 花びらアニメーション
function createPetal() {
  const petal = document.createElement("div");
  petal.classList.add("petal");
  petal.style.left = Math.random() * 100 + "vw";
  petal.style.animationDuration = 5 + Math.random() * 5 + "s";
  petal.style.opacity = 0.6 + Math.random() * 0.4;
  petal.style.transform = `rotate(${Math.random() * 360}deg)`;
  document.body.appendChild(petal);
  setTimeout(() => petal.remove(), 10000);
}
setInterval(createPetal, 250);

fetch("../html/form.html")
  .then(res => res.text())
  .then(html => {
    document.getElementById("form").innerHTML = html;
    setupForm(); // ← 読み込み完了後に呼び出すのが超重要！
  });