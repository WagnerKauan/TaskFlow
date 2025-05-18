import organizationTask from '../../../assets/img/OrganizationTaskImg.svg'
import {motion } from 'framer-motion'
import { Link } from 'react-router-dom'


const Cta = () => {

    return (
        <section className="py-16 bg-blue-600 text-white text-center">
            {/* CTA Final */}
            <motion.div 
                className="max-w-xl mx-auto px-4"
                initial={{opacity: 0, y: -30}}
                whileInView={{opacity: 1, y: 0}}
                transition={{duration: 0.6}}
                viewport={{once: true, amount: 0.5}}
            >
                <h2 className="text-3xl font-bold mb-4">Pronto para organizar sua rotina?</h2>
                <p className="mb-6">Crie sua conta gratuitamente e nunca mais perca uma tarefa.</p>
                <Link
                    to="/register"
                    className="bg-white text-blue-600 font-semibold py-3 px-6 rounded-xl hover:bg-gray-100 transition"
                >
                    Comece agora
                </Link>
            </motion.div>

            
            <motion.img className='max-w-lg m-auto mt-5' src={organizationTask} alt="Organizando tarefas no site." 
                initial={{opacity: 0, scale: 0.9}}
                whileInView={{opacity: 1, scale: 1}}
                transition={{duration: 0.6, delay: 0.3}}
                viewport={{once: true, amount: 0.5}}
            
            />
        </section>
    )
}

export default Cta