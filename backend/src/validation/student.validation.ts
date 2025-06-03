import z from "zod";

export const studentSchema = z.object({
    name: z.string().min(1, 'Campo nome é obrigatório'),
    email: z.string().email('E-mail inválido'),
    ra: z.string().min(1, 'Campo RA é obrigatório'),
    cpf: z.string().min(1, 'Campo CPF é obrigatório'),
});