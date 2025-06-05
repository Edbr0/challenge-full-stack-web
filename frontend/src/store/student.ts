import type { Student } from '@/types/student'
import { defineStore } from 'pinia'
import * as service from '../service/index'

export const useStudentStore = defineStore('student', {
  state: () => ({
    students: null as Student[] | null,
  }),
  actions: {
    async getAllStudents () {
      const response = await service.getAllStudents()

      this.students = response?.data || null

      return response
    },
  },
})
