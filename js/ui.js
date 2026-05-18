/* =========================
   CREATE NEWS CARD
========================= */
function createNewsCard(article){

  const newsCard =
    document.createElement("div");

  newsCard.classList.add("news-card");

  newsCard.innerHTML = `
    <img
      src="${article.urlToImage || 'assets/images/fallback.jpg'}"
      alt="news image"
      loading="lazy"
      onerror="this.src='../assets/images/fallback.jpg'"
    >

    <div class="news-content">

      <h3>
        ${article.title}
      </h3>

      <p>
        ${truncateText(article.description || "", 100)}
      </p>

      <div class="actions">

        <button class="read-btn">
          Read More
        </button>

        <button class="bookmark-btn">
          Save
        </button>

        <button class="share-btn">
          Share
        </button>

      </div>

    </div>
  `;

  /* =========================
     READ ARTICLE
  ========================= */
  newsCard.querySelector(".read-btn")
    .addEventListener("click", () => {

      saveHistory(article);

      localStorage.setItem(
        "selectedArticle",
        JSON.stringify(article)
      );

      window.location.href =
        "../pages/article.html";

    });

  /* =========================
     BOOKMARK
  ========================= */
  newsCard.querySelector(".bookmark-btn")
    .addEventListener("click", () => {

      saveBookmark(article);

      updateBookmarkCount();

    });

  /* =========================
     SHARE
  ========================= */
  newsCard.querySelector(".share-btn")
    .addEventListener("click", async () => {

      if(navigator.share){

        await navigator.share({
          title: article.title,
          text: article.description,
          url: article.url
        });

      }else{

        alert(
          "Sharing not supported"
        );

      }

    });

  return newsCard;

}

/* =========================
   SKELETON LOADER
========================= */
function showSkeletonLoader(container){

  container.innerHTML = "";

  for(let i = 0; i < 6; i++){

    const skeleton =
      document.createElement("div");

    skeleton.classList.add("skeleton");

    container.appendChild(skeleton);

  }

}

/* =========================
   TOAST MESSAGE
========================= */
function showToast(message){

  const toast =
    document.getElementById("toast");

  if(!toast) return;

  toast.innerText = message;

  toast.classList.add("show");

  setTimeout(() => {

    toast.classList.remove("show");

  }, 3000);

}

/* =========================
   EMPTY STATE
========================= */
function showEmptyState(
  container,
  title,
  message
){

  container.innerHTML = `
    <div class="empty-state">

      <h2>
        ${title}
      </h2>

      <p>
        ${message}
      </p>

    </div>
  `;

}

/* =========================
   ERROR MESSAGE
========================= */
function showErrorState(
  container,
  message = "Something went wrong"
){

  container.innerHTML = `
    <div class="error-message">

      <h2>
        Error
      </h2>

      <p>
        ${message}
      </p>

    </div>
  `;

}

/* =========================
   TRENDING SIDEBAR
========================= */
function renderTrendingNews(
  container,
  articles
){

  container.innerHTML = "";

  articles.slice(0, 5)
    .forEach(article => {

      const item =
        document.createElement("div");

      item.classList.add(
        "trending-item"
      );

      item.innerHTML = `
        <h4>
          ${article.title}
        </h4>

        <a
          href="${article.url}"
          target="_blank"
        >
          Read More
        </a>
      `;

      container.appendChild(item);

    });

}

/* =========================
   BOOKMARK COUNT
========================= */
function updateBookmarkCount(){

  const bookmarkCount =
    document.getElementById(
      "bookmarkCount"
    );

  if(!bookmarkCount) return;

  const bookmarks =
    getBookmarks();

  bookmarkCount.innerText =
    bookmarks.length;

}

/* =========================
   PROGRESS BAR
========================= */
function startLoading(){

  const progressBar =
    document.getElementById(
      "progressBar"
    );

  if(!progressBar) return;

  progressBar.style.width =
    "30%";

}

function finishLoading(){

  const progressBar =
    document.getElementById(
      "progressBar"
    );

  if(!progressBar) return;

  progressBar.style.width =
    "100%";

  setTimeout(() => {

    progressBar.style.width =
      "0%";

  }, 400);

}

/* =========================
   PAGE LOADER
========================= */
function showLoader(){

  const loader =
    document.getElementById(
      "loader"
    );

  if(loader){

    loader.style.display =
      "block";

  }

}

function hideLoader(){

  const loader =
    document.getElementById(
      "loader"
    );

  if(loader){

    loader.style.display =
      "none";

  }

}