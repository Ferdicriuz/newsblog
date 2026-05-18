export default async function handler(request, response) {
  const urlObj = new URL(request.url, `http://${request.headers.host}`);
  
  // Check if frontend wants 'everything' or defaults to 'top-headlines'
  const endpoint = urlObj.searchParams.get('endpoint') || 'top-headlines';
  
  // Remove our custom endpoint marker so it doesn't mess up NewsAPI
  urlObj.searchParams.delete('endpoint');
  
  const queryString = urlObj.search;

  // Build the clean target URL securely
  const targetUrl = `https://newsapi.org{endpoint}${queryString}&apiKey=${process.env.NEWS_API_KEY}`;

  const apiResponse = await fetch(targetUrl);
  const data = await apiResponse.json();

  return response.status(200).json(data);
}
