import axios from 'axios';

// Пока не используется. Оставляем точку подключения будущего backend REST API.
export const http = axios.create({
  baseURL: import.meta.env.VITE_API_URL ?? 'http://localhost:3001/api',
  timeout: 10_000,
});
