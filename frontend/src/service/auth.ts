import type { User } from '@/types'
import type { ResponseApi } from '@/types/response'
import axios from 'axios'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
})

export async function login (userName: string, password: string) {
  try {
    type LoginResponseData = {
      user: User
      token: string
    }
    const response = await api.post('/api/v1/auth', { userName, password })
    return response.data as ResponseApi<LoginResponseData>
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message || 'Erro ao fazer login')
    }
    throw new Error('Erro ao fazer login')
  }
}
