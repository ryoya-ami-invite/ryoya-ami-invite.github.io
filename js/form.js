let formLoaded = false; // 一度だけ読み込むようにフラグ用意

$("#flipbook").bind("turned", function (e, page) {
  const totalPages = $("#flipbook").turn("pages");

  // ここで最後のページ（フォームのページ）を指定
  // 例えば最後のページが form の場合、totalPagesを使う
  if (page === totalPages - 1 && !formLoaded) {
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
        formLoaded = true; // フラグを立てて二重読み込みを防ぐ
      })
      .catch(err => {
        console.error("フォームの読み込み失敗:", err);
      });
  }
});

function setupForm() {
  const form = document.getElementById("rsvp-form");
  const status = document.getElementById("form-status");

  if (!form || !status) {
    console.warn("フォームかステータス要素が見つかりません");
    return;
  }

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    const data = new FormData(form);
    status.textContent = "送信中...";

    fetch("https://script.google.com/macros/s/AKfycbzqlqnO1o0KsrdAoiRlrWhQSdQMzGQcan_dp3kuXX3a-o10MUmr7aF2_Fg79TOIS9jp/exec", {
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
