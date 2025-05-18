import { z } from "zod";

const userSchema = z.object({
    name: z.string().min(3, 'O nome precisa ter pelo menos 3 caracteres.'),
    email: z.string().min(1, 'E-mail é obrigatório.').email('E-mail inválido.'),
    password: z.string().min(6, 'Senha deve ter pelo menos 6 caracteres.')
})


export default userSchema