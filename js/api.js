/* =========================
   API CONFIG
========================= */

const BASE_URL = "/api/news";


/* =========================
   HANDLE RESPONSE
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
   FETCH NEWS
========================= */

async function fetchNews(page = 1){

  try{

    const response =
      await fetch(
        `${BASE_URL}?country=us&page=${page}`
      );

    const data =
      await handleResponse(response);

    return data.articles || [];

  }catch(error){

    console.log(
      "Fetch News Error:",
      error
    );

    return [];

  }

}


/* =========================
   FETCH TRENDING
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
      "Trending Error:",
      error
    );

    return [];

  }

}


/* =========================
   FETCH BREAKING
========================= */

async function fetchBreakingNews(){

  try{

    const response =
      await fetch(
        `${BASE_URL}?country=us&pageSize=10`
      );

    const data =
      await handleResponse(response);

    return data.articles || [];

  }catch(error){

    console.log(
      "Breaking Error:",
      error
    );

    return [];

  }

}


/* =========================
   CATEGORY NEWS
========================= */

async function fetchCategory(category){

  try{

    const response =
      await fetch(
        `${BASE_URL}?country=us&category=${category}`
      );

    const data =
      await handleResponse(response);

    return data.articles || [];

  }catch(error){

    console.log(
      "Category Error:",
      error
    );

    return [];

  }

}


/* =========================
   SEARCH NEWS
========================= */

async function searchNews(query){

  try{

    const response =
      await fetch(
        `${BASE_URL}?endpoint=everything&q=${query}`
      );

    const data =
      await handleResponse(response);

    return data.articles || [];

  }catch(error){

    console.log(
      "Search Error:",
      error
    );

    return [];

  }

}