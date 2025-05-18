import { z } from 'zod'

export const editProfileSchema = z.object({
  name: z.string().trim().min(3, 'O nome precisa ter pelo menos 3 caracteres.').optional(),
  email: z.string().trim().email('Formato de email inválido.').optional(),
  oldPassword: z.string().trim().min(6, 'A senha deve ter no mínimo 6 caracteres.').optional(),
  newPassword: z.string().trim().min(6, 'A senha deve ter no mínimo 6 caracteres.').optional(),
}).refine((data) => {
  const hasSomeField =
    data.name || data.email || data.oldPassword || data.newPassword
  return hasSomeField
}, {
  message: 'Pelo menos um dos campos precisa ser enviado.'
}).refine((data) => {

  if (data.oldPassword || data.newPassword) {
    return data.oldPassword && data.newPassword
  }
  return true
}, {
  message: 'Para trocar a senha, informe a senha atual e a nova senha.'
})