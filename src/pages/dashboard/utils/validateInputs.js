import taskSchema from '../../../schemas/taskSchema'

//Validando os inputs
function validateInputs(title,description,status) {
  const result = taskSchema.safeParse({title,description,status})

  if (!result.success) {
    const errorMessage = result.error.errors[0]?.message
    return errorMessage
  }

  return;
}


export default validateInputs