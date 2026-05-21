export default async function handler(req, res){

  const API_KEY =
    process.env.NEWS_API_KEY;

  const {
    country = "us",
    category,
    q,
    page = 1,
    pageSize = 20,
    endpoint = "top-headlines"
  } = req.query;

  let url =
    `https://newsapi.org/v2/${endpoint}?apiKey=${API_KEY}`;

  if(endpoint === "everything"){

    url += `&q=${q}`;

  }else{

    url += `&country=${country}`;

    if(category){

      url += `&category=${category}`;

    }

  }

  url += `&page=${page}&pageSize=${pageSize}`;

  try{

    const response =
      await fetch(url);

    const data =
      await response.json();

    res.status(200).json(data);

  }catch(error){

    res.status(500).json({
      error: "Failed to fetch news"
    });

  }

}