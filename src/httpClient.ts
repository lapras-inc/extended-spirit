import axios, { AxiosInstance } from 'axios';

export const getHolaspiritHttpClient = (accessToken?: string): AxiosInstance =>
  axios.create({
    baseURL: 'https://app.holaspirit.com',
    headers: {
      'Content-Type': 'application/json',
      authorization: `Bearer ${accessToken}`,
    },
    responseType: 'json',
  });
