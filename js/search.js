const searchInput =
  document.getElementById("searchInput");

const searchBtn =
  document.getElementById("searchBtn");

/* =========================
   DEBOUNCE
========================= */
function debounce(func, delay){

  let timer;

  return (...args) => {

    clearTimeout(timer);

    timer =
      setTimeout(() => func(...args), delay);

  };

}

/* =========================
   SEARCH NEWS
========================= */
async function searchNews(query){

  try{

    startLoading();

    const response = await fetch(
      `https://newsapi.org/v2/everything?q=${query}&apiKey=${API_KEY}`
    );

    const data = await response.json();

    finishLoading();

    newsContainer.innerHTML = "";

    if(!data.articles.length){

      newsContainer.innerHTML = `
        <div class="error-message">

          <h2>No Results Found</h2>

          <p>
            Try another keyword
          </p>

        </div>
      `;

      return;

    }

    data.articles.forEach(article => {

      const card =
        createNewsCard(article);

      newsContainer.appendChild(card);

    });

  }catch(error){

    console.log(error);

    finishLoading();

  }

}

/* =========================
   HANDLE SEARCH
========================= */
const handleSearch = debounce(async () => {

  const query =
    searchInput.value.trim();

  localStorage.setItem(
    "lastSearch",
    query
  );

  if(!query){

    displayNews();

    return;

  }

  await searchNews(query);

}, 500);

/* =========================
   REAL TIME SEARCH
========================= */
searchInput.addEventListener(
  "input",
  handleSearch
);

/* =========================
   ENTER KEY SEARCH
========================= */
searchInput.addEventListener(
  "keypress",
  (e) => {

    if(e.key === "Enter"){

      searchBtn.click();

    }

  }
);

/* =========================
   BUTTON SEARCH
========================= */
searchBtn.addEventListener(
  "click",
  async () => {

    const query =
      searchInput.value.trim();

    if(!query) return;

    await searchNews(query);

  }
);

/* =========================
   RESTORE LAST SEARCH
========================= */
searchInput.value =
  localStorage.getItem("lastSearch") || "";