/* =========================
   API CONFIG
========================= */

// Vercel Serverless Function
const BASE_URL = "/api/news";

/* =========================
   HANDLE API RESPONSE
========================= */
async function handleResponse(response){

  if(!response.ok){

    throw new Error(
      `HTTP Error: ${response.status}`
    );

  }

  return await response.json();

}

/* =========================
   FETCH TOP HEADLINES
========================= */
async function fetchNews(page = 1){

  try{

    startLoading();

    // Nigeria first page
    let url =
      `${BASE_URL}?country=ng&page=${page}`;

    // Other pages global US news
    if(page > 1){

      url =
        `${BASE_URL}?country=us&page=${page}`;

    }

    const response =
      await fetch(url);

    const data =
      await handleResponse(response);

    finishLoading();

    return data.articles || [];

  }catch(error){

    console.log(
      "Fetch News Error:",
      error
    );

    finishLoading();

    return await loadFallbackNews();

  }

}

/* =========================
   FETCH CATEGORY NEWS
========================= */
async function fetchCategory(category){

  try{

    startLoading();

    let url = "";

    /* SPORTS => USA */
    if(category === "sports"){

      url =
        `${BASE_URL}?country=us&category=sports`;

    }

    /* OTHER CATEGORIES => NIGERIA */
    else{

      url =
        `${BASE_URL}?country=ng&category=${category}`;

    }

    const response =
      await fetch(url);

    const data =
      await handleResponse(response);

    finishLoading();

    return data.articles || [];

  }catch(error){

    console.log(
      "Category Error:",
      error
    );

    finishLoading();

    return [];

  }

}
// LOAD TREANDING NEWS

async function loadTrendingNews(){

  if(!trendingContainer) return;

  try{

    const articles =
      await fetchTrendingNews();

    trendingContainer.innerHTML = "";

    if(!articles.length){

      trendingContainer.innerHTML = `
        <p>No trending news available</p>
      `;

      return;

    }

    articles
      .slice(0, 5)
      .forEach(article => {

        const item =
          document.createElement("div");

        item.classList.add(
          "trending-item"
        );

        item.innerHTML = `
          <img
            src="${article.urlToImage || 'assets/images/fallback.jpg'}"
            alt="Trending"
            onerror="this.src='assets/images/fallback.jpg'"
          >

          <div class="trending-content">

            <h4>
              ${article.title}
            </h4>

            <p>
              ${
                article.description
                ? article.description.substring(0, 80) + "..."
                : "No description available"
              }
            </p>

            <a
              href="${article.url}"
              target="_blank"
            >
              Read More
            </a>

          </div>
        `;

        trendingContainer.appendChild(item);

      });

  }catch(error){

    console.log(
      "Trending News Error:",
      error
    );

  }

}
/* =========================
   SEARCH NEWS
========================= */
async function searchNews(query){

  try{

    startLoading();

    const response =
      await fetch(
        `${BASE_URL}?endpoint=everything&q=${query}`
      );

    const data =
      await handleResponse(response);

    finishLoading();

    return data.articles || [];

  }catch(error){

    console.log(
      "Search Error:",
      error
    );

    finishLoading();

    return [];

  }

}

/* =========================
   FETCH BREAKING NEWS
========================= */
async function fetchBreakingNews(){

  try{

    const response =
      await fetch(
        `${BASE_URL}?country=ng&pageSize=10`
      );

    const data =
      await handleResponse(response);

    return data.articles || [];

  }catch(error){

    console.log(
      "Breaking News Error:",
      error
    );

    return [];

  }

}

/* =========================
   FETCH TRENDING NEWS
========================= */
async function fetchTrendingNews(){

  try{

    const response =
      await fetch(
        `${BASE_URL}?country=us&pageSize=5`
      );

    const data =
      await handleResponse(response);

    return data.articles || [];

  }catch(error){

    console.log(
      "Trending News Error:",
      error
    );

    return [];

  }

}

/* =========================
   LOAD FALLBACK NEWS
========================= */
async function loadFallbackNews(){

  try{

    const response =
      await fetch(
        "/data/sample-news.json"
      );

    const data =
      await response.json();

    return data.articles || [];

  }catch(error){

    console.log(
      "Fallback Error:",
      error
    );

    return [];

  }

}

/* =========================
   FETCH SINGLE ARTICLE
========================= */
async function fetchSingleArticle(title){

  try{

    const articles =
      await fetchNews();

    return articles.find(
      article =>
        article.title === title
    );

  }catch(error){

    console.log(
      "Single Article Error:",
      error
    );

    return null;

  }

}

/* =========================
   CATEGORY SELECTOR
========================= */
async function selectCategory(category){

  saveCategory(category);

  const articles =
    await fetchCategory(category);

  if(newsContainer){

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

}