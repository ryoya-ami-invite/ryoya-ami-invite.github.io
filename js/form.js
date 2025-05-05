let formLoaded = false;

function loadFormIfNeeded() {
  if (formLoaded) return;

  const formContainer = document.getElementById("form");
  if (!formContainer) {
    console.warn("#form 要素が見つかりません");
    return;
  }

  fetch("html/form.html")
    .then(res => res.text())
    .then(html => {
      formContainer.innerHTML = html;
      setupForm();
      formLoaded = true;
    })
    .catch(err => {
      console.error("フォームの読み込み失敗:", err);
    });
}

// PC：ページめくりで最終ページになった時にロード
$("#flipbook").bind("turned", function (e, page) {
  const totalPages = $("#flipbook").turn("pages");
  if (page === totalPages - 1) {
    loadFormIfNeeded();
  }
});

//　スマホ：ロード時にすぐ読み込む
if (window.innerWidth <= 768) {
  document.addEventListener("DOMContentLoaded", loadFormIfNeeded);
}

function setupForm() {
  const form = document.getElementById("rsvp-form");
  const status = document.getElementById("form-status");

  if (!form || !status) {
    console.warn("フォームかステータス要素が見つかりません");
    return;
  }

  const carRadio = document.querySelector('input[name="access"][value="車"]');
  const modal = document.getElementById("car-modal");
  const modalClose = document.getElementById("modal-close");

  if (carRadio && modal && modalClose) {
    carRadio.addEventListener("change", () => {
      if (carRadio.checked) {
        modal.style.display = "flex";
      }
    });

    modalClose.addEventListener("click", () => {
      modal.style.display = "none";
    });
  }

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    const data = new FormData(form);
    status.textContent = "送信中...";

    fetch("https://script.google.com/macros/s/AKfycbzuSYKVSNGqymtun9qWpzOk03oAykAbOb8BcsgMvXG6BFQnIBWqDr-Z12SJ2RFWuzY/exec", {
      method: "POST",
      mode: "no-cors",
      body: data
    })
    .then(() => {
      form.reset();
      status.textContent = "送信が完了しました。ありがとうございました！";
    })
    .catch((error) => {
      console.error("送信エラー:", error);
      status.textContent = "送信に失敗しました。時間をおいてもう一度お試しください。";
    });
  });
}
