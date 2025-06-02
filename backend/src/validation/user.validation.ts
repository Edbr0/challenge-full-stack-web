import z from "zod";

export const userSchema = z.object({
    name: z.string().min(1, 'Campo nome é obrigatório'),
    userName: z.string().min(1, 'Campo nome de usuário é obrigatório'),
    password: z.string().min(6, 'Campo senha deve ter no minúmo 6 caracters'),
    cpf: z.string().min(11, 'Campo CPF deve ter no mínimo 11 caracteres'),
    roleId: z.number().int().positive('Campo perfil é obrigatório')
})