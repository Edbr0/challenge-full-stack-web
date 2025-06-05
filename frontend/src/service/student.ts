import type { ResponseApi } from '@/types/response'
import type { Student, TCreateStudent } from '@/types/student'
import axios from 'axios'
import api from './api'

export async function getAllStudents () {
  try {
    const response = await api.get('/api/v1/student')
    return response.data as ResponseApi<Student[]>
  } catch (error) {
    let errorMessage = 'Erro ao fazer login'

    if (axios.isAxiosError(error)) {
      if (error.response?.data.errors) {
        errorMessage = error.response.data.errors[0].message || 'Erro ao listar alunos'
      } else if (error.response?.data?.message) {
        errorMessage = error.response.data.message || 'Erro ao listar alunos'
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

export async function createStudent (student: TCreateStudent) {
  try {
    const response = await api.post('/api/v1/student', student)
    return response.data as ResponseApi<Student>
  } catch (error) {
    let errorMessage = 'Erro ao criar aluno'

    if (axios.isAxiosError(error)) {
      if (error.response?.data.errors) {
        errorMessage = error.response.data.errors[0].message || 'Erro ao criar aluno'
      } else if (error.response?.data?.message) {
        errorMessage = error.response.data.message || 'Erro ao criar aluno'
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
