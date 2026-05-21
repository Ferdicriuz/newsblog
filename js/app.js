/* =========================
   ELEMENT SELECTORS
========================= */
const newsContainer =
  document.getElementById("newsContainer");

const loader =
  document.getElementById("loader");

const searchInput =
  document.getElementById("searchInput");

const searchBtn =
  document.getElementById("searchBtn");

const trendingContainer =
  document.getElementById("trendingContainer");

const breakingNews =
  document.getElementById("breakingNews");

const themeToggle =
  document.getElementById("themeToggle");

const backToTop =
  document.getElementById("backToTop");

const menuToggle =
  document.getElementById("menuToggle");

const navLinks =
  document.querySelector(".nav-links");

const progressBar =
  document.getElementById("progressBar");

  const MAX_PAGES = 5;


/* =========================
   GLOBAL STATE
========================= */
let page = 1;
let loading = false;

/* =========================
   DISPLAY NEWS
========================= */
async function displayNews(){

  if(!newsContainer) return;

  showLoader();

  showSkeletonLoader(newsContainer);

  const articles =
    await fetchNews();

  hideLoader();

  newsContainer.innerHTML = "";

  if(!articles.length){

    showEmptyState(
      newsContainer,
      "No News Found",
      "Please try again later"
    );

    return;

  }

  articles.forEach(article => {

    const card =
      createNewsCard(article);

    newsContainer.appendChild(card);

  });

}

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
    onerror="this.src='assets/images/fallback.jpg'"
  >

  <div class="news-content">

    <h3>${article.title}</h3>

   <p class="news-story">
  ${
    truncateText(
      article.content ||
      article.description ||
      "No content available",
      400
    )
  }
</p>

    <div class="actions">

      <button class="read-btn">
        Read More
      </button>

     <button class="bookmark-btn">
  <i class="fa-regular fa-bookmark"></i>
  Save
</button>

<button class="share-btn">
  <i class="fa-solid fa-share-nodes"></i>
  Share
</button>

  </div>
`;

  /* READ MORE */
  newsCard
    .querySelector(".read-btn")
    .addEventListener(
      "click",
      () => {

        saveHistory(article);

        localStorage.setItem(
          "selectedArticle",
          JSON.stringify(article)
        );

        window.location.href =
          "pages/article.html";

      }
    );

  /* BOOKMARK */
  newsCard
    .querySelector(".bookmark-btn")
    .addEventListener(
      "click",
      () => {

        saveBookmark(article);

        updateBookmarkCount();

        showToast(
          "Saved to bookmarks"
        );

      }
    );

  /* SHARE */
  newsCard
    .querySelector(".share-btn")
    .addEventListener(
      "click",
      async () => {

        if(navigator.share){

          await navigator.share({
            title: article.title,
            text: article.description,
            url: article.url
          });

        }else{

          navigator.clipboard.writeText(
            article.url
          );

          showToast(
            "Link copied"
          );

        }

      }
    );

  return newsCard;

}

/* =========================
   TRENDING NEWS
========================= */
async function loadTrendingNews(){

  if(!trendingContainer) return;

  const articles =
    await fetchNews();

  trendingContainer.innerHTML = "";

  articles
    .slice(0, 5)
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

      trendingContainer
        .appendChild(item);

    });

}

/* =========================
   BREAKING NEWS
========================= */
async function loadBreakingNews(){

  if(!breakingNews) return;

  const articles =
    await fetchNews();

  const headlines =
    articles
      .slice(0, 10)
      .map(article =>
        article.title
      )
      .join(" 🔥 ");

  breakingNews.innerText =
    headlines;

}

/* =========================
   LOAD MORE NEWS
========================= */

async function loadMoreNews() {

  if (loading) return;

  /* STOP BEFORE MAKING REQUEST */
  if (page >= MAX_PAGES) {
    showToast("End of news");
    window.removeEventListener("scroll", handleInfiniteScroll);
    return;
  }

  loading = true;
  page++;

  try {

    const articles = await fetchNews(page);

    if (!articles || articles.length === 0) {

      window.removeEventListener("scroll", handleInfiniteScroll);
      showToast("No more news available");

      loading = false;
      return;
    }

    articles.forEach(article => {

      const card = createNewsCard(article);
      newsContainer.appendChild(card);

    });

  } catch (error) {

    console.log("Load more error:", error);
    showToast("Failed to load more news");

  }

  loading = false;
}

/* =========================
   INFINITE SCROLL
========================= */
async function handleInfiniteScroll() {

  if (
    window.innerHeight + window.scrollY >=
    document.body.offsetHeight - 500
  ) {

    await loadMoreNews();

  }

}

window.addEventListener(
  "scroll",
  handleInfiniteScroll
);

/* =========================
   DEBOUNCE
========================= */
function debounce(func, delay){

  let timer;

  return (...args) => {

    clearTimeout(timer);

    timer =
      setTimeout(
        () => func(...args),
        delay
      );

  };

}

/* =========================
   SEARCH
========================= */
const handleSearch =
  debounce(async () => {

    if(!searchInput) return;

    const query =
      searchInput.value.trim();

    saveLastSearch(query);

    if(!query){

      displayNews();

      return;

    }

    showLoader();

    window.location.href =
  `pages/search.html?q=${query}`;
    hideLoader();

    newsContainer.innerHTML = "";

    if(!articles.length){

      showEmptyState(
        newsContainer,
        "No Results Found",
        "Try another keyword"
      );

      return;

    }

    articles.forEach(article => {

      const card =
        createNewsCard(article);

      newsContainer.appendChild(card);

    });

  }, 500);

/* SEARCH LISTENERS */
if(searchInput){

  searchInput.addEventListener(
    "input",
    handleSearch
  );

  searchInput.value =
    getLastSearch();

}

if(searchBtn){

  searchBtn.addEventListener(
    "click",
    handleSearch
  );

}

/* =========================
   CATEGORY
========================= */
async function loadCategory(category){

  page = 1;

  if(!newsContainer) return;

  showLoader();

  showSkeletonLoader(newsContainer);

  const articles =
    await fetchCategory(category);

  hideLoader();

  newsContainer.innerHTML = "";

  if(!articles.length){

    showEmptyState(
      newsContainer,
      "No News Found",
      "Try another category"
    );

    return;

  }

  articles.forEach(article => {

    const card =
      createNewsCard(article);

    newsContainer.appendChild(card);

  });

}

/* =========================
   RESTORE CATEGORY
========================= */
const savedCategory =
  getCategory();

if(savedCategory){

  loadCategory(savedCategory);

}else{

  displayNews();

}

/* =========================
   HISTORY
========================= */
function loadHistory(){

  const historyContainer =
    document.getElementById(
      "historyContainer"
    );

  if(!historyContainer) return;

  const history =
    getHistory();

  historyContainer.innerHTML = "";

  if(!history.length){

    showEmptyState(
      historyContainer,
      "No History Yet",
      "Articles you read will appear here"
    );

    return;

  }

  history.forEach(article => {

    const card =
      createNewsCard(article);

    historyContainer.appendChild(card);

  });

}

loadHistory();

/* =========================
   DARK MODE
========================= */
if(getTheme() === "dark"){

  document.body.classList.add(
    "dark-mode"
  );

}

if(themeToggle){

  themeToggle.addEventListener(
    "click",
    () => {

      document.body.classList.toggle(
        "dark-mode"
      );

      if(
        document.body.classList.contains(
          "dark-mode"
        )
      ){

        saveTheme("dark");

      }else{

        saveTheme("light");

      }

    }
  );

}

/* =========================
   BACK TO TOP
========================= */
window.addEventListener(
  "scroll",
  () => {

    if(!backToTop) return;

    if(window.scrollY > 300){

      backToTop.style.display =
        "block";

    }else{

      backToTop.style.display =
        "none";

    }

  }
);

if(backToTop){

  backToTop.addEventListener(
    "click",
    () => {

      window.scrollTo({
        top: 0,
        behavior: "smooth"
      });

    }
  );

}

/* =========================
   MOBILE MENU
========================= */
if(menuToggle){

  menuToggle.addEventListener(
    "click",
    () => {

      navLinks.classList.toggle(
        "active"
      );
      

    }
  );

}

/* =========================
   NEWSLETTER
========================= */
const subscribeBtn =
  document.getElementById(
    "subscribeBtn"
  );

if(subscribeBtn){

  subscribeBtn.addEventListener(
    "click",
    () => {

      const email =
        document.getElementById(
          "newsletterInput"
        ).value;

      if(!email){

        showToast(
          "Please enter email"
        );

      }else{

        showToast(
          "Subscribed successfully!"
        );

      }

    }
  );

}

/* =========================
   LIVE TIME
========================= */
function updateTime(){

  const liveTime =
    document.getElementById(
      "liveTime"
    );

  if(liveTime){

    liveTime.innerText =
      new Date().toLocaleString();

  }

}

setInterval(updateTime, 1000);

/* =========================
   ACTIVE NAV LINKS
========================= */
document.querySelectorAll(
  ".nav-links a"
).forEach(link => {

  link.addEventListener(
    "click",
    () => {

      document.querySelectorAll(
        ".nav-links a"
      ).forEach(l => {

        l.classList.remove(
          "active"
        );

      });

      link.classList.add(
        "active"
      );

    }
  );

});

/* =========================
   UTIL FUNCTION
========================= */
function truncateText(
  text,
  limit
){

  return text.length > limit
    ? text.substring(0, limit) + "..."
    : text;

}

/* =========================
   INITIAL LOADS
========================= */
updateBookmarkCount();

loadTrendingNews();

loadBreakingNews();