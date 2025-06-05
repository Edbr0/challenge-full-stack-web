import axios from 'axios'
import { useAuthStore } from '../store/index'
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Exemplo de interceptador (opcional)
api.interceptors.request.use(config => {
  const store = useAuthStore()
  const token = store.getToken ? store.getToken() : ''
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

export default api
