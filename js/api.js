/* =========================
   API CONFIG
========================= */
const API_KEY = "9f671c6aab6649b98fcd16c27ddf2db6";

const BASE_URL =
  "https://newsapi.org/v2";

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

    const response =
      await fetch(
        `${BASE_URL}/top-headlines?country=us&page=${page}&apiKey=${API_KEY}`
      );

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

    const response =
      await fetch(
        `${BASE_URL}/top-headlines?country=us&category=${category}&apiKey=${API_KEY}`
      );

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

/* =========================
   SEARCH NEWS
========================= */
async function searchNews(query){

  try{

    startLoading();

    const response =
      await fetch(
        `${BASE_URL}/everything?q=${query}&apiKey=${API_KEY}`
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
        `${BASE_URL}/top-headlines?country=us&pageSize=10&apiKey=${API_KEY}`
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
        `${BASE_URL}/top-headlines?country=us&pageSize=5&apiKey=${API_KEY}`
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
   LOAD FALLBACK JSON
========================= */
async function loadFallbackNews(){

  try{

    const response =
      await fetch(
        "../data/sample-news.json"
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