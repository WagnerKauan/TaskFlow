import { Link } from "react-router-dom"
import { useUser } from "../../contexts/UserContext"


export const NotFound = () => {
  const { user } = useUser()



  return (
    <section className="flex flex-col items-center justify-center min-h-screen px-4">
      <div className="container max-w-3xl text-center">
        <h1 className="text-6xl font-extrabold mb-4 text-blue-500">404</h1>
        <p className="text-2xl mb-6">
          Opa, essa página não foi encontrada!
        </p>
        <Link
          to={user ? '/dashboard' : "/"}
          className="inline-block px-6 py-3 text-blue-600 rounded-md"
        >
          Voltar para o início
        </Link>
      </div>
    </section>
  )
}
