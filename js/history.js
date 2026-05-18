const historyContainer =
  document.getElementById("historyContainer");

const emptyHistory =
  document.getElementById("emptyHistory");

const clearHistoryBtn =
  document.getElementById("clearHistory");

/* =========================
   LOAD HISTORY
========================= */
function loadHistory(){

  const history =
    JSON.parse(localStorage.getItem("history")) || [];

  historyContainer.innerHTML = "";

  /* EMPTY STATE */
  if(history.length === 0){

    emptyHistory.style.display = "block";

    return;

  }

  emptyHistory.style.display = "none";

  history.forEach(article => {

    const card =
      createNewsCard(article);

    historyContainer.appendChild(card);

  });

}

/* =========================
   CLEAR HISTORY
========================= */
clearHistoryBtn.addEventListener(
  "click",
  () => {

    localStorage.removeItem("history");

    showToast("History cleared");

    loadHistory();

  }
);

loadHistory();