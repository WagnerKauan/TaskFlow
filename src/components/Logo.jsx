import { MdChecklist } from "react-icons/md"

const Logo = () => {

    return (

        <div className="flex items-center gap-1 cursor-pointer">
            <span className="text-2xl font-bold text-blue-600">TaskFlow</span>
            <MdChecklist size={28} className="text-blue-600" />
        </div>
    )
}

export default Logo