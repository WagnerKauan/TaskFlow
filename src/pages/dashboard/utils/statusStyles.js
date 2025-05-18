// Função para estilizar os status
function getStatusStyles(status) {
  switch (status) {
    case 'pendente':
      return 'border-l-4 border-yellow-500 bg-yellow-50 text-yellow-700';
    case 'em andamento':
      return 'border-l-4 border-blue-500 bg-blue-50 text-blue-700';
    case 'concluída':
      return 'border-l-4 border-green-500 bg-green-50 text-green-700';
    default:
      return 'border-l-4 border-gray-300 bg-gray-50 text-gray-700';
  }
}

export default getStatusStyles