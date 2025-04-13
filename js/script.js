// カウントダウン
const countdownEl = document.getElementById("countdown");
const targetDate = new Date("2025-08-18T00:00:00");

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

fetch("html/form.html")
  .then(res => res.text())
  .then(html => {
    document.getElementById("form").innerHTML = html;
    setupForm(); // ← 読み込み完了後に呼び出すのが超重要！
  });

const bg = document.getElementById("photo-background");
const triggers = document.querySelectorAll(".photo-trigger");

let currentImage = "";
let isVisible = false;

function updatePhotoOnScroll() {
  let matched = false;

  triggers.forEach((trigger) => {
    const rect = trigger.getBoundingClientRect();
    if (rect.top < window.innerHeight / 2 && rect.bottom > window.innerHeight / 2) {
      const img = trigger.dataset.photo;
      if (img && currentImage !== img) {
        bg.style.backgroundImage = `url('img/${img}')`;
        currentImage = img;
      }

      if (!isVisible) {
        bg.style.opacity = "1";
        isVisible = true;
      }

      matched = true;
    }
  });

  const lastTrigger = triggers[triggers.length - 1];
  const rect = lastTrigger.getBoundingClientRect();

  // フェードアウト（最後を過ぎたらだけ）
  if (rect.bottom < window.innerHeight * 0.5) {
    if (isVisible) {
      bg.style.opacity = "0";
      isVisible = false;
    }
  }
}

window.addEventListener("scroll", updatePhotoOnScroll);
window.addEventListener("load", () => {
  bg.style.opacity = "0"; // ← 初期は非表示
  updatePhotoOnScroll();
});