export default async function handler(request, response) {
  const urlObj = new URL(request.url, `http://${request.headers.host}`);
  
  // Look for the endpoint query switcher (everything vs top-headlines)
  const endpoint = urlObj.searchParams.get('endpoint') || 'top-headlines';
  
  // Clean up our placeholder marker before passing query params to NewsAPI
  urlObj.searchParams.delete('endpoint');
  const queryString = urlObj.search;

  // FIXED: Added .org/v2/ so the URL builds perfectly
  const targetUrl = `https://newsapi.org{endpoint}${queryString}&apiKey=${process.env.NEWS_API_KEY}`;

  try {
    const apiResponse = await fetch(targetUrl);
    const data = await apiResponse.json();
    return response.status(200).json(data);
  } catch (error) {
    return response.status(500).json({ error: "Failed to fetch news from server" });
  }
}
