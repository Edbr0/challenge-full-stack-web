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
    let errorMessage = 'Erro ao fazer login'

    if (axios.isAxiosError(error)) {
      if (error.response?.data.errors) {
        errorMessage = error.response.data.errors[0].message || 'Erro ao fazer login'
      } else if (error.response?.data?.message) {
        errorMessage = error.response.data.message || 'Erro ao fazer login'
      }
      return {
        status: false,
        message: errorMessage,
        data: null,
        statusCode: error.response?.data.statusCode || 500,
      }
    }
  }
}
