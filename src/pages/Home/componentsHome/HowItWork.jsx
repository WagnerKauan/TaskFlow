import taskImg from '../../../assets/img/taskImg.svg'
import { motion } from 'framer-motion'

const HowItWork = () => {


    return (
        <section className="py-16 bg-gray-50">
            {/* Como Funciona */}
            <div className="max-w-4xl mx-auto px-4 text-center">
                <h2 className="text-3xl font-bold text-gray-800 mb-10">Como funciona?</h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                    {/* ETAPAS */}
                    <div className="space-y-6 text-left">
                        {[
                            { step: "1. Cadastre-se", desc: "Crie sua conta de forma rápida e segura." },
                            { step: "2. Crie tarefas", desc: "Adicione e edite tarefas com poucos cliques." },
                            { step: "3. Acompanhe", desc: "Veja seu progresso e mantenha o foco." },
                        ].map(({ step, desc }, index) => (
                            <motion.div
                                key={step}
                                initial={{ opacity: 0}}
                                whileInView={{ opacity: 1}}
                                transition={{ duration: 0.5, delay: index * 0.2 }}
                                viewport={{ once: true, amount: 0.3 }}
                                className="bg-white rounded-2xl shadow hover:shadow-blue-300 transition p-6 text-center"
                            >
                                <h3 className="text-xl font-semibold text-blue-600 mb-2">{step}</h3>
                                <p className="text-gray-600">{desc}</p>
                            </motion.div>
                        ))}
                    </div>

                    {/* IMAGEM animada */}
                    <motion.img
                        src={taskImg}
                        alt="Ilustração do app"
                        className="w-full max-w-sm md:max-w-md lg:max-w-lg m-auto"
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.7, delay: 0.4 }}
                        viewport={{ once: true, amount: 0.3 }}
                    />
                </div>
            </div>
        </section>
    )
}


export default HowItWork