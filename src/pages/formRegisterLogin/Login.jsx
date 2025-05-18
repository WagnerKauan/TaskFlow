import imgLogin from '../../assets/img/Login.svg'
import { motion } from 'framer-motion'
import Logo from '../../components/Logo'    
import { Link } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import { useState } from 'react'
import loginSchema from '../../schemas/loginSchema.js'
import api from '../../services/api.js'
import AlertMessage from '../../components/AlertMessages.jsx'
import { useNavigate } from 'react-router-dom'

const Login = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const [success, setSuccess] = useState('')
    const [alertId, setAlertId] = useState(0)
    const navigate = useNavigate()

    function validateInputs() {
        setAlertId(prev => prev + 1)

        const result = loginSchema.safeParse({ email, password })

        if (!result.success) {
            const errorMessage = result.error.errors[0]?.message
            return errorMessage
        }

        return;
    }


    async function handleSubmit(e) {
        e.preventDefault()
        setError('')
        setSuccess('')

        const errorMessage = validateInputs()

        if(errorMessage){
            setError(errorMessage)
            return;
        }

        try{
            const response = await api.post('/login', {
                email,
                password,
            })
            
            const token = response.data.token
            
            localStorage.setItem('authToken',token)

            setAlertId(prev => prev + 1)
            setSuccess(response.data.message)
            navigate('/dashboard')
            setEmail('')
            setPassword('')

        }catch (e) {
            setAlertId(prev => prev + 1)
            const message = e.response?.data?.error || 'Erro inesperado. Tente novamente.'
            setError(message)
            console.log(e)
        }

    }


    return (
        <section className="min-h-screen flex items-center justify-center bg-gray-100 px-4">

            <div className="flex flex-col md:flex-row bg-white rounded-2xl shadow-lg overflow-hidden max-w-6xl w-full">

                {/* IMAGEM */}
                <div className="w-full md:w-1/2 hidden md:flex items-center justify-center bg-blue-600">
                    <img className="w-full" src={imgLogin} alt="Usuário logando na plataforma." />
                </div>

                {/* FORMULÁRIO DE LOGIN */}
                <div className='w-full md:w-2xl p-8 bg-white'>

                    <div className='mb-10 flex items-center justify-between'>
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.3, duration: 0.4 }}
                        >
                            <Logo />
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.3, duration: 0.4 }}
                        >
                            <Link to="/" className='text-lg text-blue-600 hover:underline flex items-center'>
                                <ArrowLeft className='w-4 h-4' />
                                Home
                            </Link>
                        </motion.div>
                    </div>

                    <motion.h2 className='text-2xl font-semibold text-center text-gray-800 mb-6'
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, ease: 'easeOut' }}
                    >
                        Entrar na sua conta
                    </motion.h2>

                    {/* ALERTAS */}
                    <div className='fixed top-4 left-1/2 transform -translate-x-1/2 z-50'>
                        {error && <AlertMessage type='error' message={error} id={alertId} />}
                        {success && <AlertMessage type='success' message={success} id={alertId} />}
                    </div>

                    <motion.form method='post' className='space-y-4' onSubmit={handleSubmit}
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, ease: 'easeOut' }}
                    >

                        <div>
                            <label htmlFor="email" className='block text-sm font-medium text-gray-700 mb-1'>E-mail</label>
                            <input
                                type="email"
                                id="email"
                                placeholder='seu@email.com'
                                value={email}
                                onChange={e => setEmail(e.target.value)}
                                className='w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500'
                            />
                        </div>

                        <div>
                            <label htmlFor="password" className='block text-sm font-medium text-gray-700 mb-1'>Senha</label>
                            <input
                                type="password"
                                id='password'
                                placeholder='••••••••'
                                value={password}
                                onChange={e => setPassword(e.target.value)}
                                className='w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500'
                            />
                        </div>

                        <button type='submit' className='w-full cursor-pointer mt-2 bg-blue-600 text-white py-2 rounded-xl hover:bg-blue-700 transition'>
                            Acessar minha conta
                        </button>

                        <p className='text-sm text-gray-600 mt-3 text-center'>
                            Não tem uma conta? <Link to="/Register" className='text-blue-600 font-semibold hover:underline' >Registrar</Link>
                        </p>
                    </motion.form>
                </div>
            </div>

        </section>
    )
}

export default Login