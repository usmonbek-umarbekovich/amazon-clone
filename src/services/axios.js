import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://us-central1-clone-1764d.cloudfunctions.net/api',
});

export default instance;
