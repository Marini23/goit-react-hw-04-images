import axios from 'axios';
const API_KEY = `38416277-2f3b74029dfd524974848f805`;

export const fetchImages = async (valueInput, page) => {
  const resp = axios.get(
    `https://pixabay.com/api/?q=${valueInput}&page=${page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`
  );

  return resp;
};
