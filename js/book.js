$(document).ready(function () {
  const $book = $("#flipbook");

$('#flipbook').turn({
  width: 1200,
  height: 900,
  autoCenter: true,
  display: 'double',
  elevation: 0,
  gradients: false,
  acceleration: true
});

  $(".page").on("click", function () {
    const index = $(this).index();
    const total = $book.turn("pages");
    const current = $book.turn("page");

    let targetPage = 0;

    if (index === 0) targetPage = 2;
    else if (index === 1) targetPage = 1;
    else if (index === 2) targetPage = 4;
    else if (index === 3) targetPage = 2;
    else if (index === 4) targetPage = 6;
    else if (index === 5) targetPage = 4;
    else return;

    if (targetPage > total || targetPage === current) return;
    $book.turn("page", targetPage);
  });

  setupBackgroundTriggers();
});

document.addEventListener("DOMContentLoaded", function () {
  const seasonalGreetingElement = document.querySelector(".seasonal-greeting");

  if (!seasonalGreetingElement) return;

  const month = new Date().getMonth() + 1; // 0始まりやけん+1しとく

  const greetings = {
    1: "春の訪れを心待ちにする季節となりました。",
    2: "梅のたよりも聞かれる季節となりました。",
    3: "日増しに暖かさを加える季節となりました。",
    4: "花のたよりも聞かれる季節となりました。",
    5: "若葉の緑もすがすがしい季節となりました。",
    6: "初夏の風もさわやかな季節となりました。",
    7: "木々の緑もあざやかな季節となりました。",
    8: "朝夕涼味を覚える季節となりました。",
    9: "秋の訪れを感じる季節となりました。",
    10: "日増しに秋も深まる季節となりました。",
    11: "紅葉の色が日々に映える季節となりました。",
    12: "日増しに寒さを感じる季節となりました。"
  };

  seasonalGreetingElement.textContent = greetings[month] || "季節のご挨拶を申し上げます。";
});

document.addEventListener("DOMContentLoaded", () => {
  const urlParams = new URLSearchParams(window.location.search);
  const role = urlParams.get("role");
  const psElement = document.querySelector(".ps-message");

  if (role && psElement) {
    let message = "";

    switch (role) {
      case "toast":
        message = "～追伸～ \n披露宴では、ご挨拶と乾杯の音頭を\nお願いさせていただければと思っております。\nどうぞよろしくお願いいたします。";
        break;
      case "keyholder":
        message = "～追伸～ \nご祝儀袋を入れる金庫の鍵の管理を\nお願いいたします。\n当日ちょっとだけ頼りにさせてください！";
        break;
      case "reception":
        message = "～追伸～ \n受付のお手伝い、本当にありがとうございます。\n当日はよろしくお願いいたします！";
        break;
      case "performance":
        message = "～追伸～ \nピアノ演奏、どうぞよろしくお願いいたします。\n素敵な時間を一緒に過ごせること、\n心から楽しみにしております。"
        break;
      case "speech":
        message = "～追伸～ \n当日はお時間をいただき、\nひと言ご挨拶をお願いしております。\nどうぞよろしくお願いいたします。"
        break;
      case "friend_speech":
        message = "～追伸～ \n当日はご多用の中、ご挨拶をお願いしております。\n少しカジュアルな雰囲気で構いませんので、\nどうぞよろしくお願いいたします。"
        break;
    }

    if (message) {
      psElement.innerHTML = message.replace(/\n/g, "<br>");
      psElement.style.display = "block";
    }
  }

    const receptionNote = document.getElementById("reception-note");

    if (role === "reception") {
      receptionNote.innerHTML = `
        <div class="reception-box">
          <p>🌸 受付をお願いしております皆様へ</p>
          <p>当日は <strong>受付開始（13:00）より30分前の12:30</strong> <br>には式場へお越しいただき、準備をお願いいたします。</p>
          <p>ご協力に心より感謝申し上げます。</p>
        </div>
      `;
      receptionNote.style.display = "block";
    }

    const flipbook = $("#flipbook");

  document.querySelectorAll("nav a[data-page]").forEach(link => {
    link.addEventListener("click", function (e) {
      e.preventDefault();
      const targetPage = parseInt(this.dataset.page, 10);
      if (!isNaN(targetPage)) {
        flipbook.turn("page", targetPage);
        document.getElementById("flipbook").scrollIntoView({
          behavior: "smooth",
          block: "center"
        });
      }
    });
  });
});