import { useEffect, useState } from "react"
import api from "../../services/api"
import { motion } from "framer-motion"
import AlertMessage from "../../components/AlertMessages"
import formatDate from "./utils/formatDate";
import ConfirmModal from "../../components/ConfirmModal";

const Trash = () => {
  const [tasks, setTasks] = useState([])
  const [filteredTasks, setFilteredTasks] = useState([])
  const [success, setSuccess] = useState('')
  const [error, setError] = useState('')
  const [filtroStatus, setFiltroStatus] = useState('todos')
  const [busca, setBusca] = useState('')
  const [alertId, setAlertId] = useState(0)
  const [confirmOpen, setConfirmOpen] = useState(false)
  const [taskToDelete, setTaskToDelete] = useState(null)
  const [loading, setLoading] = useState(false)
  const token = localStorage.getItem('authToken');

  //Funcao para buscar tarefas deletadas
  const fetchTasks = async () => {
    try {
      const res = await api.get('/tarefas-deletadas', {
        headers: { Authorization: `Bearer ${token}` }
      })

      setTasks(res.data.tasks)
      setFilteredTasks(res.data.tasks)

    } catch (e) {
      setError('Erro ao buscar tarefas.')
      console.log(e)
    }

  }

  useEffect(() => {
    fetchTasks()
  }, [])


  //Funcao para restaurar tarefa
  async function restoreTask(id) {
    setError('')
    setSuccess('')
    setLoading(true)

    try {
      const res = await api.patch(`/tarefas/restaurar/${id}`, {}, {
        headers: { Authorization: `Bearer ${token}` }
      })

      setSuccess(res.data.message)
      fetchTasks()
      setAlertId(prev => prev + 1)
      setLoading(false)
    } catch (e) {
      console.log(e)
      const message = e.response?.data?.error || 'Erro ao restaurar tarefa.'
      setError(message)
      setLoading(false)
      setAlertId(prev => prev + 1)
    }

  }

  //Funcao para excluir DEFINITIVO uma mensagem
  async function deleteTask(id) {
    setAlertId(prev => prev + 1)
    setError('')
    setSuccess('')
    setLoading(true)
    
    try {
      
      const res = await api.delete(`/tarefas/deletar/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      })
      
      setSuccess(res.data.message)
      fetchTasks()
      setLoading(false)
    } catch (e) {
      console.log(e)
      const message = e.response?.data?.error || 'Erro ao excluir tarefa.'
      setError(message)
      setLoading(false)
      setAlertId(prev => prev + 1)
    }
  }


  //Funcao confirmacao modal 
  async function confirmDelete() {
    if (!taskToDelete) return

    await deleteTask(taskToDelete)
    setTaskToDelete(null)
    setConfirmOpen(false)
  }


  // Função de filtro
  const handleFilter = () => {
    const tarefasFiltradas = tasks.filter((task) => {
      const statusMatch = filtroStatus === 'todos' || task.status === filtroStatus;
      const buscaMatch =
        task.title.toLowerCase().includes(busca.toLowerCase()) ||
        task.description.toLowerCase().includes(busca.toLowerCase());
      return statusMatch && buscaMatch;
    });
    setFilteredTasks(tarefasFiltradas);
  };

  useEffect(() => {
    handleFilter();  // Executa o filtro sempre que filtroStatus ou busca mudarem
  }, [filtroStatus, busca]);

  return (
    <div className="p-6">
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.2 }}

      >

        {/* ALERTAS */}
        <div className='fixed top-4 left-1/2 transform -translate-x-1/2 z-100'>
          {error && <AlertMessage type='error' message={error} id={alertId} />}
          {success && <AlertMessage type='success' message={success} id={alertId} />}
        </div>

        <h1 className="text-2xl font-bold mb-4">Tarefas Excluídas</h1>
      </motion.div>

      {/* Filtros de busca e status */}
      <motion.div className="mb-6 flex gap-4"

        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <input
          type="text"
          placeholder="Buscar tarefa..."
          value={busca}
          onChange={(e) => setBusca(e.target.value)}
          className="p-2 border rounded w-full md:w-1/2"
        />
        <select
          value={filtroStatus}
          onChange={(e) => setFiltroStatus(e.target.value)}
          className="p-2 border rounded w-full md:w-1/4"
        >
          <option value="todos">Todas</option>
          <option value="pendente">Pendente</option>
          <option value="em andamento">Em andamento</option>
          <option value="concluída">Concluída</option>
        </select>
      </motion.div>

      <ul className="space-y-3">
        {filteredTasks.length === 0 ? (
          <p className="text-gray-500">Procurando tarefas...</p>
        ) : (
          filteredTasks.map((task, index) => (
            <motion.li
              initial={{ opacity: 0, }}
              animate={{ opacity: 1, }}
              transition={{ delay: index * 0.2, duration: 0.6 }}
              key={task.id}

              className={`p-4 md:p-5 rounded-xl shadow-md hover:shadow-lg transition-all border-l-4 border-gray-500 bg-gray-300 `}
            >
              <div className="flex flex-col md:flex-row justify-between md:items-center gap-2">
                <div className="flex-1">
                  <h3 className="text-lg md:text-xl font-semibold">
                    {task.title} {" "}
                    <small className="text-xs text-gray-500 block md:inline">{formatDate(task.deletedAt)}
                    </small>
                  </h3>
                  <p className="text-sm md:text-base text-gray-600 mt-1">{task.description}</p>
                </div>

                <span className="text-xs font-medium capitalize md:ml-4 mt-2 md:mt-0">
                  {task.status}
                </span>
              </div>

              <div className="flex gap-4 text-sm mt-4 flex-wrap">
                <button
                  onClick={() => {
                    setTaskToDelete(task.id)
                    setConfirmOpen(true)
                  }}
                  className="flex items-center gap-1 text-red-600 hover:text-red-700 transition cursor-pointer">

                  Excluir
                </button>

                <button onClick={() => (restoreTask(task.id))} className="flex cursor-pointer items-center gap-1 text-blue-600 hover:text-blue-800 transition">
                  Restaurar
                </button>
              </div>
            </motion.li>
          ))
        )}
      </ul>

      <ConfirmModal
        isOpen={confirmOpen}
        onClose={() => setConfirmOpen(false)}
        onConfirm={confirmDelete}
        message="Tem certeza que deseja excluir esta tarefa de forma definitiva?"
        load={loading}
      />
    </div>
  )
}


export default Trash