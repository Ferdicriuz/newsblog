/* =========================
   BOOKMARK STORAGE
========================= */
function getBookmarks(){

  return JSON.parse(
    localStorage.getItem("bookmarks")
  ) || [];

}

function saveBookmark(article){

  const bookmarks =
    getBookmarks();

  const exists =
    bookmarks.some(
      item => item.title === article.title
    );

  if(!exists){

    bookmarks.push(article);

    localStorage.setItem(
      "bookmarks",
      JSON.stringify(bookmarks)
    );

    showToast("Saved to bookmarks");

  }else{

    showToast("Already bookmarked");

  }

}

function removeBookmark(title){

  let bookmarks =
    getBookmarks();

  bookmarks =
    bookmarks.filter(
      article => article.title !== title
    );

  localStorage.setItem(
    "bookmarks",
    JSON.stringify(bookmarks)
  );

}

function clearBookmarks(){

  localStorage.removeItem("bookmarks");

}

/* =========================
   HISTORY STORAGE
========================= */
function getHistory(){

  return JSON.parse(
    localStorage.getItem("history")
  ) || [];

}

function saveHistory(article){

  let history =
    getHistory();

  history.unshift(article);

  /* LIMIT HISTORY */
  history = history.slice(0, 20);

  localStorage.setItem(
    "history",
    JSON.stringify(history)
  );

}

function clearHistory(){

  localStorage.removeItem("history");

}

/* =========================
   THEME STORAGE
========================= */
function saveTheme(theme){

  localStorage.setItem(
    "theme",
    theme
  );

}

function getTheme(){

  return localStorage.getItem("theme");

}

/* =========================
   SEARCH STORAGE
========================= */
function saveLastSearch(query){

  localStorage.setItem(
    "lastSearch",
    query
  );

}

function getLastSearch(){

  return localStorage.getItem(
    "lastSearch"
  ) || "";

}

/* =========================
   CATEGORY STORAGE
========================= */
function saveCategory(category){

  localStorage.setItem(
    "lastCategory",
    category
  );

}

function getCategory(){

  return localStorage.getItem(
    "lastCategory"
  );

}