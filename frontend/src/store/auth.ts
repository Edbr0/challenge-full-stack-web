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

      const response = await service.login(userName, password)

      this.token = response?.data?.token || null
      this.user = response?.data?.user || null

      sessionStorage.setItem('token', this.token || '')
      return response
    },
    logout () {
      this.token = null
      sessionStorage.removeItem('token')
    },
  },
})
