//Formatar a data e hora
function formatDate(taskDate){
  const date = new Date(taskDate)
  const formattedDate = date.toLocaleDateString('pt-BR')
  const formattedHours = date.toLocaleTimeString('pt-BR', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  })
  return `${formattedDate} às ${formattedHours}`
}


export default formatDate