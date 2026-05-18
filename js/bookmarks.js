const bookmarksContainer =
  document.getElementById("bookmarksContainer");

const emptyState =
  document.getElementById("emptyState");

const clearBookmarksBtn =
  document.getElementById("clearBookmarks");

/* =========================
   LOAD BOOKMARKS
========================= */
function loadBookmarks(){

  const bookmarks =
    JSON.parse(localStorage.getItem("bookmarks")) || [];

  bookmarksContainer.innerHTML = "";

  /* EMPTY STATE */
  if(bookmarks.length === 0){

    emptyState.style.display = "block";

    return;

  }

  emptyState.style.display = "none";

  bookmarks.forEach(article => {

    const card =
      createNewsCard(article);

    /* REMOVE BUTTON */
    const removeBtn =
      document.createElement("button");

    removeBtn.innerText =
      "Remove";

    removeBtn.classList.add("remove-btn");

    removeBtn.addEventListener("click", () => {

      removeBookmark(article.title);

    });

    card.querySelector(".actions")
      .appendChild(removeBtn);

    bookmarksContainer.appendChild(card);

  });

}

/* =========================
   REMOVE BOOKMARK
========================= */
function removeBookmark(title){

  let bookmarks =
    JSON.parse(localStorage.getItem("bookmarks")) || [];

  bookmarks =
    bookmarks.filter(
      article => article.title !== title
    );

  localStorage.setItem(
    "bookmarks",
    JSON.stringify(bookmarks)
  );

  showToast("Bookmark removed");

  loadBookmarks();

}

/* =========================
   CLEAR ALL
========================= */
clearBookmarksBtn.addEventListener(
  "click",
  () => {

    localStorage.removeItem("bookmarks");

    showToast("All bookmarks cleared");

    loadBookmarks();

  }
);

loadBookmarks();