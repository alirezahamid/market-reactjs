import  axios  from 'axios';

const http = axios.create({
    baseURL: 'https://picsum.photos/v2/',
    timeout: 1000,
});
  
export default http