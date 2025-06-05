import type { Student, TCreateStudent } from '@/types/student'
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

    async createStudent (student: TCreateStudent) {
      const response = await service.createStudent(student)

      if (response?.status !== false) {
        await this.getAllStudents()
      }
      return response
    },
  },
})
