import { useEffect, useState } from "react"
import api from "../../services/api.js"
import { ZodError } from 'zod'
import { editProfileSchema } from '../../schemas/editProfileSchema.js'
import AlertMessage from "../../components/AlertMessages.jsx"
import { useUser } from "./utils/UserContext.jsx"
import { motion } from "framer-motion"
import { HiEye, HiEyeOff } from "react-icons/hi" // ← ícones de olho do react-icons

const Profile = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [oldPassword, setOldPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [userId, setUserId] = useState('')
  const { user, updateUser } = useUser()
  const [success, setSuccess] = useState('')
  const [error, setError] = useState('')
  const [alertId, setAlertId] = useState('')
  const [showOldPassword, setShowOldPassword] = useState(false)
  const [showNewPassword, setShowNewPassword] = useState(false)
  const token = localStorage.getItem('authToken')

  useEffect(() => {
    const fetchIdAndProfile = async () => {
      try {
        const res = await api.get('/tarefas', {
          headers: { Authorization: `Bearer ${token}` }
        })

        const id = res.data.userId
        setUserId(id)

        const profileRes = await api.get(`/profile/${id}`, {
          headers: { Authorization: `Bearer ${token}` }
        })

        setName(profileRes.data.user.name)
        setEmail(profileRes.data.user.email)

      } catch (e) {
        setAlertId(prev => prev + 1)
        setError('Erro ao buscar dados do perfil.')
        console.error(e)
      }
    }

    fetchIdAndProfile()
  }, [])

  async function handleSubmit(e) {
    e.preventDefault()
    setAlertId(prev => prev + 1)
    setSuccess('')
    setError('')

    const formData = {
      name: name.trim(),
      email: email.trim(),
      oldPassword: oldPassword.trim(),
      newPassword: newPassword.trim(),
    }

    const dataToSend = Object.fromEntries(
      Object.entries(formData).filter(([_, value]) => value !== '')
    )

    try {
      editProfileSchema.parse(dataToSend)

      const res = await api.put(`/profile/${userId}`, dataToSend, {
        headers: { Authorization: `Bearer ${token}` }
      })

      setError('')
      setSuccess(res.data.message)

      if (dataToSend.name) {
        localStorage.setItem('authToken', res.data.token)
        const capitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1)
        updateUser(capitalize(dataToSend.name))
      }

    } catch (e) {
      setSuccess('')

      if (e instanceof ZodError) {
        const errorMsgs = e.errors.map(error => error.message)
        setError(errorMsgs[0])
        return
      }

      const errorMsg = e.response?.data?.error || 'Erro inesperado'
      setError(errorMsg)
      console.log(e)
    }
  }

  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: (i = 1) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.1, duration: 0.5, ease: "easeOut" }
    })
  }

  return (
    <motion.div
      className="flex flex-col items-center"
      initial="hidden"
      animate="visible"
      variants={{
        hidden: {},
        visible: {
          transition: { staggerChildren: 0.1 }
        }
      }}
    >
      {/* Alertas */}
      <motion.div
        className="fixed top-4 left-1/2 transform -translate-x-1/2 z-100"
        variants={fadeInUp}
      >
        {error && <AlertMessage type="error" message={error} id={alertId} />}
        {success && <AlertMessage type="success" message={success} id={alertId} />}
      </motion.div>

      {/* Formulário */}
      <motion.form
        method="post"
        className="space-y-4 w-full p-2"
        onSubmit={handleSubmit}
        variants={fadeInUp}
        custom={1}
      >
        <motion.h1
          className="text-2xl font-bold mb-4 text-blue-600"
          variants={fadeInUp}
          custom={2}
        >
          Seu perfil
        </motion.h1>

        {/* Campos do formulário */}
        {[
          {
            id: "name",
            label: "Nome",
            value: name,
            onChange: setName,
            type: "text",
            custom: 3
          },
          {
            id: "email",
            label: "E-mail",
            value: email,
            onChange: setEmail,
            type: "email",
            custom: 4
          },
          {
            id: "oldPassword",
            label: "Senha atual",
            value: oldPassword,
            onChange: setOldPassword,
            type: showOldPassword ? 'text' : 'password',
            toggle: () => setShowOldPassword(prev => !prev),
            show: showOldPassword,
            custom: 5
          },
          {
            id: "newPassword",
            label: "Nova senha",
            value: newPassword,
            onChange: setNewPassword,
            type: showNewPassword ? "text" : "password",
            toggle: () => setShowNewPassword(prev => !prev),
            show: showNewPassword,
            custom: 6
          }
        ].map((field) => (
          <motion.div key={field.id} variants={fadeInUp} custom={field.custom}>
            <label
              className="block text-base font-medium text-gray-700 mb-1"
              htmlFor={field.id}
            >
              {field.label}
            </label>

            {/* Wrapper do input para posicionar o botão do olho */}
            <div className="relative">
              <input
                id={field.id}
                type={field.type}
                value={field.value}
                onChange={(e) => field.onChange(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 pr-10"
              />

              {/* Botão de mostrar/ocultar senha, só aparece nos campos de senha */}
              {field.id === "oldPassword" || field.id === "newPassword" ? (
                <button
                  type="button"
                  onClick={field.toggle}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-600 hover:text-gray-800"
                >
                  {field.show ? <HiEyeOff size={20} /> : <HiEye size={20} />}
                </button>
              ) : null}
            </div>
          </motion.div>
        ))}

        <motion.button
          type="submit"
          className="w-full md:w-38 cursor-pointer mt-2 bg-blue-600 text-white py-2 rounded-xl hover:bg-blue-700 transition"
          variants={fadeInUp}
          custom={7}
        >
          Salvar
        </motion.button>
      </motion.form>
    </motion.div>
  )
}

export default Profile
