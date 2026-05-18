export default async function handler(req, res) {

  /* =========================
     GET QUERY PARAMETERS
  ========================= */
  const {
    country = "us",
    category,
    page = 1,
    pageSize = 12,
    q,
    endpoint
  } = req.query;

  /* =========================
     API KEY
  ========================= */
  const API_KEY =
    process.env.NEWS_API_KEY;

  /* =========================
     BUILD URL
  ========================= */
  let url = "";

  /* SEARCH NEWS */
  if(endpoint === "everything"){

    url =
      `https://newsapi.org/v2/everything?q=${q}&pageSize=${pageSize}&sortBy=publishedAt&language=en&apiKey=${API_KEY}`;

  }

  /* CATEGORY / HEADLINES */
  else{

    url =
      `https://newsapi.org/v2/top-headlines?country=${country}&page=${page}&pageSize=${pageSize}&apiKey=${API_KEY}`;

    /* ADD CATEGORY */
    if(category){

      url += `&category=${category}`;

    }

  }

  try{

    /* =========================
       FETCH FROM NEWS API
    ========================= */
    const response =
      await fetch(url);

    const data =
      await response.json();

    /* =========================
       RETURN DATA
    ========================= */
    res.status(200).json(data);

  }catch(error){

    console.log(
      "Server Error:",
      error
    );

    res.status(500).json({
      status: "error",
      message: "Failed to fetch news"
    });

  }

}