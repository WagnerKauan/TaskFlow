import { motion, AnimatePresence } from 'framer-motion';

const TaskModal = ({
  isOpen,
  onClose,
  isEditing,
  title,
  setTitle,
  description,
  setDescription,
  status,
  setStatus,
  onSave,
  load,
}) => {

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="bg-white p-6 rounded-2xl shadow-2xl w-[90%] max-w-md relative"
            initial={{ y: 50, opacity: 0, scale: 0.95 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 50, opacity: 0, scale: 0.95 }}
            transition={{ type: 'spring', damping: 20, stiffness: 300 }}
          >
            {/* Botão de fechar */}
            <button
              onClick={onClose}
              className="absolute top-3 right-3 text-gray-400 hover:text-gray-600 text-xl cursor-pointer"
            >
              &times;
            </button >

            <h2 className="text-2xl font-semibold text-gray-800 mb-6">
              {isEditing ? 'Editar tarefa' : 'Nova tarefa'}
            </h2>

            <div className="space-y-4">
              <input
                type="text"
                placeholder="Título"
                value={title}
                onChange={e => setTitle(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
              <textarea
                placeholder="Descrição"
                value={description}
                onChange={e => setDescription(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg resize-none h-24 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              ></textarea>
              <select
                value={status}
                onChange={e => setStatus(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
                required
              >
                <option value="pendente">Pendente</option>
                <option value="em andamento">Em andamento</option>
                <option value="concluída">Concluída</option>
              </select>
            </div>

            <div className="flex justify-end gap-3 mt-6">
              <button
                className="px-4 py-2 rounded-lg bg-gray-200 text-gray-700 hover:bg-gray-300 transition cursor-pointer"
                onClick={onClose}
              >
                Cancelar
              </button>
              <button
                className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition cursor-pointer disabled:cursor-not-allowed disabled::bg-blue-700"
                onClick={onSave}
                disabled={load}
              >
                {isEditing ? 'Salvar' : 'Criar'}
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default TaskModal;
