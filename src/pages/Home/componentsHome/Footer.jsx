import { FaFacebook, FaInstagram, FaLinkedin } from "react-icons/fa";
import { Link } from "react-router-dom";
import Logo from "../../../components/Logo";

const Footer = () => {

    return (
        <footer className="bg-gray-900 text-white py-10 px-6">
            <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-8 text-center">

                {/* LOGO */}
                <div className="flex items-center gap-4 flex-col">
                    <Logo />
                    <p className="text-gray-400">Organize sua vida com produtividade e simplicidade.</p>
                </div>

                {/* Links */}
                <div>
                    <h3 className="text-lg font-semibold mb-3">Links</h3>

                    <ul className="space-y-1 text-gray-300">
                        <li>
                            <Link to="/" className="hover:text-blue-500 transition" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>Início</Link> 
                        </li>
                        <li>
                            <Link to="/login" className="hover:text-blue-500 transition">Login</Link>
                        </li>
                        <li>
                            <Link to="/register" className="hover:text-blue-500 transition">Registrar</Link>
                        </li>
                    </ul>
                </div>

                {/* Redes sociais */}

                <div className="flex flex-col items-center gap-1">
                    <h3 className="text-lg font-semibold mb-2"> Siga-nos</h3>

                    <div className="flex justify-center sm:justify-start gap-4">
                        <a href="#" className="hover:text-blue-500"><FaFacebook /></a>
                        <a href="#" className="hover:text-blue-500"><FaInstagram /></a>
                        <a href="#" className="hover:text-blue-300"><FaLinkedin /></a>
                    </div>
                </div>  
            </div>

            {/* Copyright */}
            <div className="text-center text-gray-500 mt-10 text-sm">
                <span>&copy; {new Date().getFullYear()} TaskFlow. Todos os direitos reservados.</span>
            </div>
        </footer>
    )
}

export default Footer