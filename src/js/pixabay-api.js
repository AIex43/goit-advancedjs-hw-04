const API_KEY = 'ВАШ_PIXABAY_API_KEY';
const BASE_URL = 'https://pixabay.com/api/';

export async function fetchImages(query) {
  const params = new URLSearchParams({
    key: API_KEY,
    q: query,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: 'true',
  });

  const response = await fetch(`${BASE_URL}?${params}`);
  if (!response.ok) {
    throw new Error('Failed to fetch images');
  }

  const data = await response.json();
  return data.hits;
}
