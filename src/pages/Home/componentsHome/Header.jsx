import { Link } from "react-router-dom"
import { FiLogIn } from "react-icons/fi"
import { FaUserPlus } from "react-icons/fa"
import Logo from "../../../components/Logo"
import { motion } from "framer-motion"

const Header = () => {


    return (
        <header className="bg-white shadow-md py-4 px-6 flex flex-col md:flex-row justify-between items-center">

            {/* LOGO */}
            <motion.div
                initial={{opacity: 0, x: -20}}
                animate={{opacity: 1, x: 0}}
                transition={{delay: 0.3, duration: 0.4}}
            >
                <Logo/>
            </motion.div>

            <div className="flex gap-4 items-center mt-9 md:mt-0">

                <motion.div
                    initial={{opacity: 0}}
                    animate={{opacity: 1}}
                    transition={{delay: 0.3, duration: 0.5}}
                >
                    <Link to="/login" className="flex items-center gap-1 text-blue-600 font-medium hover:underline">
                        <FiLogIn size={18} />
                        Login
                    </Link>
                </motion.div>


                <motion.div
                
                    initial={{opacity: 0 ,scale: 0.9}}
                    animate={{opacity: 1, scale: 1}}
                    transition={{daley: 0.5, duration: 0.5}}
                >
                    <Link to="/register" className="flex items-center gap-1 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition">
                        <FaUserPlus size={18} />
                        Registrar
                    </Link>
                </motion.div>
            </div>
        </header>
    )
}

export default Header