module.exports = async function handler(req, res) {

  const {
    country = "us",
    category,
    page = 1,
    pageSize = 12,
    q,
    endpoint
  } = req.query;

  const API_KEY =
    process.env.NEWS_API_KEY;

  let url = "";

  /* SEARCH */
  if(endpoint === "everything"){

    url =
      `https://newsapi.org/v2/everything?q=${q}&pageSize=${pageSize}&sortBy=publishedAt&language=en&apiKey=${API_KEY}`;

  }

  /* TOP HEADLINES */
  else{

    url =
      `https://newsapi.org/v2/top-headlines?country=${country}&page=${page}&pageSize=${pageSize}&apiKey=${API_KEY}`;

    if(category){

      url += `&category=${category}`;

    }

  }

  try{

    const response =
      await fetch(url);

    const data =
      await response.json();

    res.status(200).json(data);

  }catch(error){

    console.log(error);

    res.status(500).json({
      message: "Server Error"
    });

  }

};