import { z } from 'zod';

const schemaTask = z.object({
  title: z.string()
    .min(3, { message: 'O título deve ter no mínimo 3 caracteres.' })
    .max(80, { message: 'O título deve ter no máximo 80 caracteres.' })
    .trim()
    .regex(/^(?!.* {2,}).*$/, { message: 'O título não pode ter espaços consecutivos.' })
    .nonempty({ message: 'O título é obrigatório.' }),

  description: z.string()
    .min(10, { message: 'A descrição precisa ter no mínimo 10 caracteres.' })
    .max(500, { message: 'A descrição deve ter no máximo 500 caracteres.' })
    .trim()
    .regex(/^(?!.* {2,}).*$/, { message: 'O título não pode ter espaços consecutivos.' })
    .nonempty({ message: 'A descrição é obrigatória.' }),

  status: z.enum(['pendente', 'em andamento', 'concluída'], { 
    errorMap: (issue) => {
      if (issue.code === 'invalid_enum_value') {
        return { message: 'O status deve ser "pendente", "em andamento" ou "concluída".' };
      }
      return { message: 'O status é obrigatório.' };
    }
  }),
});

export default schemaTask