export type User = {
  id: number
  name: string
  userName: string
  password?: string
  cpf: string
  isActive: boolean
  roleId: number
  createdAt: Date
  updatedAt: Date | null
  role?: {
    name: string
  }
}
