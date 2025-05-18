import { useState, useEffect, useRef } from "react"
import api from '../../services/api'
import { Link, Outlet, useNavigate } from "react-router-dom"
import { ArrowUp, Menu, X } from "lucide-react"
import Logo from '../../components/Logo'
import { motion } from "framer-motion"
import { useUser } from "./utils/UserContext"


const Dashboard = () => {
 const {user, updateUser} = useUser()
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const navigate = useNavigate()
  const [showScroll, setShowScroll] = useState(false)
  const token = localStorage.getItem('authToken')

  const mainRef = useRef(null)

  useEffect(() => {
    const fetchData = async () => {

      try {
        const res = await api.get('/tarefas', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })

        const capitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1)
        updateUser(capitalize(res.data.userName))

      } catch (e) {
        console.log(e)
      }
    }

    fetchData()
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      if (mainRef.current) {
        setShowScroll(mainRef.current.scrollTop > 300)
      }
    }

    const mainEl = mainRef.current
    if (mainEl) {
      mainEl.addEventListener("scroll", handleScroll)
    }

    return () => {
      if (mainEl) {
        mainEl.removeEventListener("scroll", handleScroll)
      }
    }
  }, [])


  function logout() {
    localStorage.removeItem('authToken')
    navigate('/')
  }

  function scrollToTop() {
    if (mainRef.current) {
      mainRef.current.scrollTo({ top: 0, behavior: "smooth" })
    }
  }

  return (

    <div className="h-screen grid grid-cols-1 md:grid-cols-[250px_1fr] grid-rows-[auto_1fr]">

      {/* Header */}
      <header className="col-span-1 md:col-span-2 bg-white shadow-md p-4 flex justify-between items-center z-10">

        <div className="flex items-center gap-4">

          {/* Botão menu mobile */}
          <motion.button className="md:hidden cursor-pointer" onClick={() => setSidebarOpen(true)}

            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Menu />
          </motion.button>

          <motion.span className="text-xl font-semibold"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            Bem-vindo, {user}</motion.span>
        </div>

        <motion.button onClick={logout} className="text-lg text-blue-500 cursor-pointer mx-4 my-1 hover:underline"
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
        >
          Sair
        </motion.button>
      </header>

      {/* Overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 backdrop-blur-sm bg-white/10 z-30 md:hidden" onClick={() => setSidebarOpen(false)}>
        </div>
      )}

      {/* Sidebar mobile animada */}
      <div className={`fixed top-0 left-0 h-full w-64 bg-gray-800 text-white p-4 z-40 transform transition duration-300 md:hidden ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}`}>

        <div className="flex flex-col justify-between h-full">
          <div>
            <div className="flex justify-between  items-center mb-6">
              <h2 className="text-2xl font-bold">Painel</h2>
              <button className="cursor-pointer" onClick={() => setSidebarOpen(false)}><X /> </button>
            </div>
            <nav className="space-y-4">
              <Link to="/dashboard" className="block hover:underline" onClick={() => setSidebarOpen(false)}>Home</Link>
              <Link to="/dashboard/profile" className="block hover:underline" onClick={() => setSidebarOpen(false)}>Perfil</Link>
              <Link to="/dashboard/trash" className="block hover:underline" onClick={() => setSidebarOpen(false)}>Lixeira</Link>
            </nav>
          </div>

          <div className="mb-4">
            <Logo />
          </div>
        </div>
      </div>

      {/* Sidebar desktop */}
      <aside className="hidden md:block bg-gray-800 text-white p-4 h-full">
        <div className="flex flex-col justify-between h-full">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <h2 className="text-2xl font-bold mb-6">Painel</h2>
            <nav className="space-y-4">
              <Link to="/dashboard" className="block hover:underline">Home</Link>
              <Link to="/dashboard/profile" className="block hover:underline">Perfil</Link>
              <Link to="/dashboard/trash" className="block hover:underline">Lixeira</Link>
            </nav>
          </motion.div>

          <motion.div className="mb-4"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Logo />
          </motion.div>
        </div>
      </aside>

      {/* Main */}
      <main ref={mainRef} className="p-6 bg-gray-50 border overflow-y-auto">
        <Outlet />
      </main>

      {/* Botão voltar ao topo */}
      {showScroll && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 p-3 rounded-full bg-blue-600 text-white shadow-md hover:bg-blue-700 transition z-50"
        >
          <ArrowUp size={20} />
        </button>
      )}
    </div>
  )
}

export default Dashboard