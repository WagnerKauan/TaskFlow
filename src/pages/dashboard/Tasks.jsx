import { useEffect, useState } from "react";
import api from "../../services/api";
import TaskModal from "./TaskModal";
import { FaCheckCircle, FaEdit, FaTrash } from 'react-icons/fa';
import { motion } from "framer-motion";
import getStatusStyles from "./utils/statusStyles";
import formatDate from "./utils/formatDate";
import AlertMessage from "../../components/AlertMessages";
import validateInputs from './utils/validateInputs'

const Tasks = () => {
  const [tasks, setTasks] = useState([]);
  const [filteredTasks, setFilteredTasks] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState('pendente');
  const [isEditing, setIsEditing] = useState(false);
  const [taskIdEditing, setTaskIdEditing] = useState(null);
  const [filtroStatus, setFiltroStatus] = useState('todos');
  const [busca, setBusca] = useState('');
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [alertId, setAlertId] = useState(0)
  const token = localStorage.getItem('authToken');  




  // Função para buscar tarefas
  const fetchTasks = async () => {
    try {
      const res = await api.get('/tarefas', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTasks(res.data.tasks);
      setFilteredTasks(res.data.tasks);  // Inicializa com todas as tarefas
    } catch (e) {
      setError('Erro ao buscar tarefas.')
      console.log(e);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  // Função para criar ou editar uma tarefa
  const handleSave = async () => {
    setAlertId(prev => prev + 1)
    setError('')
    setSuccess('')

    const errorMessage = validateInputs(title, description, status)

    if (errorMessage) {
      setError(errorMessage)
      return
    }

    try {
      if (isEditing) {
        const response = await api.put(`/tarefas/${taskIdEditing}`, {
          title,
          description,
          status,
        }, {
          headers: { Authorization: `Bearer ${token}` },
        });

        setSuccess(response.data.message)
      } else {
        const response = await api.post('/tarefas', {
          title,
          description,
          status,
        }, {
          headers: { Authorization: `Bearer ${token}` },
        });

        setSuccess(response.data.message)
      }
      setModalOpen(false);
      setTitle('');
      setDescription('');
      setStatus('pendente');
      fetchTasks();
    } catch (e) {
      setModalOpen(false)
      const message = e.response?.data?.error || 'Erro inesperado. Tente novamente.'
      setError(message)
      console.log('Erro ao salvar tarefa.', e);
    }
  };

  //Funcao para deletar tarefa
  async function deleteTask(taskId) {

    try {
      const response = await api.patch(`/tarefas/soft-delete/${taskId}`, {}, {
        headers: { Authorization: `Bearer ${token}` }
      })
      setSuccess(response.data.message)
      fetchTasks()

    } catch (e) {
      const message = e.response?.data?.error || 'Erro inesperado. Tente novamente.'
      setError(message)
      console.log(e)
    }
  }

  //Funcao btn concluir
  const markAsCompleted = async (taskId) => {
    try {
      const response = await api.put(`/tarefas/${taskId}`, {
        status: 'concluída',
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });

      setSuccess(response.data.message)
      setAlertId(prev => prev + 1)
      fetchTasks();
    } catch (e) {
      const message = e.response?.data?.error || 'Erro ao concluir tarefa.'
      setError(message)
      setAlertId(prev => prev + 1)
    }
  };

  // Ajustando modal para EditTask
  const handleEdit = (task) => {
    setIsEditing(true);
    setTaskIdEditing(task.id);
    setTitle(task.title);
    setDescription(task.description);
    setStatus(task.status);
    setModalOpen(true);
    console.log(task)
  };

  // Ajustando modal para CreatTask
  function modalCreatTask() {
    setIsEditing(false);
    setTitle('');
    setDescription('');
    setStatus('pendente');
    setModalOpen(true);
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

        <h1 className="text-2xl font-bold mb-4">Suas tarefas</h1>
        {/* Botão para abrir o modal */}
        <button onClick={modalCreatTask} className="mb-6 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition cursor-pointer">+ Nova Tarefa</button>
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
          className="p-2 border rounded w-full md:w-1/4 cursor-pointer"
        >
          <option value="todos">Todas</option>
          <option value="pendente">Pendente</option>
          <option value="em andamento">Em andamento</option>
          <option value="concluída">Concluída</option>
        </select>
      </motion.div>

      <ul className="space-y-3">
        {filteredTasks.length === 0 ? (
          <p className="text-gray-500">Nenhuma tarefa encontrada.</p>
        ) : (
          filteredTasks.map((task, index) => (
            <motion.li
              initial={{ opacity: 0, }}
              animate={{ opacity: 1, }}
              transition={{ delay: index * 0.2, duration: 0.6 }}
              key={task.id}

              className={`p-4 md:p-5 rounded-xl shadow-md hover:shadow-lg transition-all ${getStatusStyles(task.status)}`}
            >
              <div className="flex flex-col md:flex-row justify-between md:items-center gap-2">
                <div className="flex-1">
                  <h3 className="text-lg md:text-xl font-semibold">
                    {task.title} {" "}
                    <small className="text-xs text-gray-500 block md:inline">{formatDate(task.createdAt)}
                    </small>
                  </h3>
                  <p className="text-sm md:text-base text-gray-600 mt-1">{task.description}</p>
                </div>

                <span className="text-xs font-medium capitalize md:ml-4 mt-2 md:mt-0">
                  {task.status}
                </span>
              </div>

              <div className="flex gap-4 text-sm mt-4 flex-wrap">
                {task.status !== 'concluída' && (
                  <button onClick={() => markAsCompleted(task.id)} className="flex items-center gap-1 text-green-600 hover:text-green-700 transition cursor-pointer">
                    <FaCheckCircle className="text-base" />
                    Concluir
                  </button>
                )}
                <button onClick={() => handleEdit(task)} className="flex items-center gap-1 text-yellow-600 hover:text-yellow-700 transition cursor-pointer">
                  <FaEdit className="text-base" />
                  Editar
                </button>
                <button onClick={() => (deleteTask(task.id))} className="flex items-center gap-1 text-red-600 hover:text-red-700 transition cursor-pointer">
                  <FaTrash className="text-base" />
                  Lixeira
                </button>
              </div>
            </motion.li>
          ))
        )}
      </ul>

      {/* Modal para criar ou editar tarefas */}
      <TaskModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        isEditing={isEditing}
        title={title}
        setTitle={setTitle}
        description={description}
        setDescription={setDescription}
        status={status}
        setStatus={setStatus}
        onSave={handleSave}
      />
    </div>
  );
};

export default Tasks;
