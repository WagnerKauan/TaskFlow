import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, AlertTriangle, CheckCircle } from "lucide-react";

const variants = {
    initial: { opacity: 0, y: -10 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -10 },
}

const AlertMessage = ({ type = 'error', message, duration = 4000, id }) => {

    // Controla se o alerta está visível ou não
    const [show, setShow] = useState(!!message)

    // Efeito para mostrar o alerta quando a mensagem muda
    useEffect(() => {
        if (message) {
            setShow(true) // Mostra o alerta

            // Inicia o temporizador para esconder após "duration"
            const timer = setTimeout(() => setShow(false), duration)

            // Limpa o timer se o componente for desmontado ou mensagem mudar
            return () => clearTimeout(timer)
        }
    }, [message, duration, id]) // Roda sempre que algum desses valores mudar

    if (!show || !message) return null

    const baseStyles = 'relative flex items-center justify-between gap-2 px-4 py-2 rounded-lg text-sm mb-4 border'

    const styles = {
        success: `${baseStyles} bg-green-100 text-green-800 border-green-400`,
        error: `${baseStyles} bg-red-100 text-red-800 border-red-400`,
    }

    const icons = {
        success: <CheckCircle className="w-5 h-5 text-green-600" />,
        error: <AlertTriangle className="w-5 h-5 text-red-600" />
    }


    return (

        <AnimatePresence>
            {show && message && (
                <motion.div
                    initial="initial"
                    animate="animate"
                    exit="exit"
                    variants={variants}
                    className={styles[type]}
                >
                    <div className="flex items-center gap-2">
                        {icons[type]}
                        <span>{message}</span>
                    </div>

                    {/* Botão de fechar */}
                    <button
                        onClick={() => setShow(false)}
                        className="hover:bg-black/10 rounded-full p-1 transition"
                        aria-label="Fechar"
                    >
                        <X className="w-4 h-4" />
                    </button>

                    {/* 🔥 Nova barrinha de tempo adicionada aqui */}
                    <motion.div
                        initial={{ width: "100%" }} // Começa cheia
                        animate={{ width: 0 }}       // Vai diminuindo até 0
                        transition={{ duration: duration / 1000, ease: "linear" }} // Mesmo tempo do alerta
                        className={`absolute bottom-0 rounded-lg left-0 h-1 ${type === 'success' ? 'bg-green-500' : 'bg-red-500'}`}
                    />
                </motion.div>
            )}
        </AnimatePresence>
    )
}


export default AlertMessage