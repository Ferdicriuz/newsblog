/* =========================
   GET SELECTED ARTICLE
========================= */
const articleData = JSON.parse(
  localStorage.getItem("selectedArticle")
);

/* =========================
   LOAD ARTICLE
========================= */
async function loadArticle() {

  if (!articleData) {

    document.body.innerHTML = `
      <div style="text-align:center; padding:50px;">
        <h2>No article found</h2>
        <a href="../index.html">Go back home</a>
      </div>
    `;

    return;
  }

  /* IMAGE */
  document.getElementById("articleImage").src =
    articleData.urlToImage || "../assets/images/fallback.jpg";

  document.getElementById("articleImage").onerror =
    () => {
      document.getElementById("articleImage").src =
        "../assets/images/fallback.jpg";
    };

  /* TITLE */
  document.getElementById("articleTitle").innerText =
    articleData.title || "No title";

  /* DESCRIPTION */
  document.getElementById("articleDescription").innerText =
    articleData.content || articleData.description || "No content available";

  /* AUTHOR */
  document.getElementById("articleAuthor").innerText =
    articleData.author || "Unknown Author";

  /* DATE */
  document.getElementById("articleDate").innerText =
    articleData.publishedAt
      ? new Date(articleData.publishedAt).toDateString()
      : "Unknown Date";

  /* FULL LINK */
  const link = document.getElementById("articleLink");

  link.href = articleData.url || "#";
  link.innerText = "Read Full Article";

  /* RELATED NEWS */
  const articles = await fetchNews();
  loadRelatedNews(articles, articleData.title);
}

loadArticle();

/* =========================
   RELATED NEWS
========================= */
function loadRelatedNews(articles, currentTitle) {

  const relatedContainer =
    document.getElementById("relatedNews");

  if (!relatedContainer) return;

  relatedContainer.innerHTML = "";

  const related = articles
    .filter(article => article.title !== currentTitle)
    .slice(0, 5);

  if (related.length === 0) {

    relatedContainer.innerHTML = `
      <p>No related news found</p>
    `;

    return;
  }

  related.forEach(article => {

    const item = document.createElement("div");
    item.classList.add("related-item");

    item.innerHTML = `
      <h4>${article.title}</h4>
      <a href="#" class="read-more">Read More</a>
    `;

    item.addEventListener("click", () => {

      localStorage.setItem(
        "selectedArticle",
        JSON.stringify(article)
      );

      location.reload();
    });

    relatedContainer.appendChild(item);
  });
}