const CATEGORY_MAP = {
  technology: "technology OR tech",
  sports: "sports OR football OR basketball OR soccer",
  business: "business OR economy OR finance",
  entertainment: "entertainment OR movie OR celebrity"
};

async function loadCategory(category) {
  const query = CATEGORY_MAP[category];

  if (!query) return;

  showLoader();

  try {
    const res = await fetch(
      `https://newsapi.org/v2/everything?q=${query}&language=en&sortBy=publishedAt&apiKey=${API_KEY}`
    );

    const data = await res.json();

    hideLoader();

    newsContainer.innerHTML = "";

    if (!data.articles.length) {
      newsContainer.innerHTML = `
        <p style="padding:20px;">No news found for ${category}</p>
      `;
      return;
    }

    data.articles.forEach(article => {
      const card = createNewsCard(article);
      newsContainer.appendChild(card);
    });

  } catch (err) {
    console.log(err);
    hideLoader();
  }
}