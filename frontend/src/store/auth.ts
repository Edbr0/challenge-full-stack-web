import type { User } from '../types/index'
import { defineStore } from 'pinia'
import * as service from '../service/index'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    token: sessionStorage.getItem('token') || null,
    user: null as User | null,
    error: null,
  }),
  actions: {
    async login (userName: string, password: string) {
      this.error = null
      try {
        const response = await service.login(userName, password)
        this.token = response.data.token
        this.user = response.data.user
        sessionStorage.setItem('token', this.token)
        console.log('Login successful:', response.data)
        return response
      } catch (error) {
        this.error = error.response?.data?.message || 'Erro ao fazer login'
        throw error
      }
    },
    logout () {
      this.token = null
      sessionStorage.removeItem('token')
    },
  },
})
