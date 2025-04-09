import axios from 'axios';

export const axiosClient = axios.create({
  baseURL: 'https://mypixe.io/435822/',
  responseType: 'json',
});
