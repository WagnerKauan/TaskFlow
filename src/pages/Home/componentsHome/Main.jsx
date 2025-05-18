import { Link } from 'react-router-dom'
import { Bell, CalendarDays, CheckCircle, ClipboardList, Cloud, Lock } from 'lucide-react'
import Card from '../../../components/cards'
import { motion } from 'framer-motion'

const features = [
    {
        Icon: CheckCircle,
        title: 'Gerencie tarefas',
        description: 'Adicione, edite e exclua tarefas com facilidade.',
    },
    {
        Icon: Lock,
        title: 'Autenticação Segura',
        description: 'Seus dados protegidos com JWT e hash de senhas.',
    },
    {
        Icon: ClipboardList,
        title: 'Salve suas Tarefas',
        description: 'Tarefas armazenadas com segurança local ou no servidor.',
    },
    {
        Icon: CalendarDays,
        title: 'Organize por Data',
        description: 'Programe prazos e visualize tarefas por dia ou semana.'
    },
    {
        Icon: Bell,
        title: 'Lembretes inteligentes.',
        description: 'Receba notificações e mantenha sua produtividade em dia.',
    },
    {
        Icon: Cloud,
        title: 'Sincronize seus dados.',
        description: 'Acesse suas tarefas de qualquer lugar, a qualquer hora.'
    },
]

const Main = () => {

    return (
        <main className='flex flex-col items-center text-center px-4 py-16 my-13'>

            <motion.h2
                className='text-4xl font-bold mb-4'
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
            >
                Bem-vindo ao TaskFlow
            </motion.h2>

            <motion.p
                className='text-lg mb-8 max-w-xl'
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.6 }}
            >

                Organize sua rotina, aumente sua produtividade e nunca mais esqueça uma tarefa.
            </motion.p>

            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.4, duration: 0.5 }}
            >
                <Link to="/register" className='bg-blue-600 text-white px-6 py-3 rounded-lg text-lg hover:bg-blue-700 transition'>
                    Comece agora
                </Link>
            </motion.div>

            {/* Funcionalidades */}

            <div className='mt-16 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 max-w-4xl'>

                {features.map((feature, index) => (

                    <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.2, duration: 0.6 }}
                        viewport={{ once: true, amount: 0.3 }}
                    >
                        <Card
                            Icon={feature.Icon}
                            title={feature.title}
                            description={feature.description}
                        />
                    </motion.div>
                ))}

            </div>
        </main>
    )
}

export default Main