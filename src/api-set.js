import axios from 'axios';

const per_page = 40;
let totalPages = 0;

async function getGallery(query, page) {
  const API_KEY = '37038896-cc3b3bcf0d11f1385e2f4c3a2';
  const params = new URLSearchParams({
    key: API_KEY,
    q: query,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
    per_page: per_page,
    page: page,
  });

  const response = await axios.get(`https://pixabay.com/api/?${params}`);
  totalPages = response.data.totalHits / per_page;
  return response;
}

export { getGallery, totalPages };