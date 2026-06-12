import axios from 'axios';

const API_KEY = '56278021-ab7f277f3df1159beba4baceb';
const API_URL = 'https://pixabay.com/api/';

export const RECORDS_PER_PAGE = 15;

export async function getImagesByQuery(query, page) {
  const response = await axios.get(API_URL, {
    params: {
      key: API_KEY,
      q: query,
      image_type: 'photo',
      orientation: 'horizontal',
      safesearch: true,
      page,
      per_page: RECORDS_PER_PAGE,
    },
  });
  return response.data;
}
