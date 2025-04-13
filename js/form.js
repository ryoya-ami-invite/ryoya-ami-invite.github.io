// form.html が読み込まれた後にイベント登録
function setupForm() {
  const form = document.getElementById("rsvp-form");
  if (!form) {
    console.warn("フォームがまだ読み込まれてないばい");
    return;
  }

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    const data = new FormData(form);
    const status = document.getElementById("form-status");
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