import React from "react";
import { motion } from "framer-motion";

const ConfirmModal = ({isOpen, onClose, onConfirm, message}) => {

  if(!isOpen) return null

  return (
    <div className="fixed inset-0  backdrop-blur-sm bg-black/30 bg-opacity-40 flex items-center justify-center z-50">
      
      <motion.div
        initial={{scale: 0.8, opacity: 0}}
        animate={{scale: 1, opacity: 1}}
        exit={{scale: 0.8, opacity: 0}}
        className="bg-white p-6 rounded-xl shadow-xl w-[90%] max-w-sm"
      >

        <h2 className="text-lg font-semibold mb-4">Confirmação</h2>
        <p className="text-gray-700 mb-6">{message || 'Tem certeza que deseja continuar?'}</p>
        
        <div className="flex justify-end gap-3">
          <button onClick={onClose} className="px-4 py-2 text-sm rounded bg-gray-200 hover:bg-gray-300 cursor-pointer">
            Cancelar
          </button>

          <button onClick={onConfirm} className="px-4 py-2 text-sm rounded bg-red-600 text-white hover:bg-red-700 cursor-pointer">
            Confirmar
          </button>
        </div>
      </motion.div>
    </div>
  )
}

export default ConfirmModal