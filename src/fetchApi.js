import axios from 'axios';
export const API_KEY = '37038896-cc3b3bcf0d11f1385e2f4c3a2';
const BASE_URL = 'https://pixabay.com/api/';


async function fetchGallery(numberPage, inputValue) {
    const parameters = new URLSearchParams({
      key: API_KEY,
      q: inputValue,
      image_type: 'photo',
      orientation: 'horizontal',
      safesearch: 'true',
      page: numberPage,
      per_page: 40,
    });
    const response = await axios.get(`${BASE_URL}?${parameters}`);
  
    return response;
  }
  export { fetchGallery };