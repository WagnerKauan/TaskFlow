import { z } from "zod"

const loginSchema = z.object({
  email: z.string().min(1, 'E-mail é obrigatório.').email('E-mail inválido.'),
  password: z.string().min(6, 'Senha deve ter pelo menos 6 caracteres.')
})

export default loginSchema