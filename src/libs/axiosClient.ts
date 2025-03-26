import axios from 'axios';

export const axiosClient = axios.create({
  baseURL: 'https://mypixe.ru/435822/',
  responseType: 'json',
});
