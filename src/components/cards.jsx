
const Card = ({Icon, title, description}) => {


    return (
        <div className='bg-white p-6 rounded-lg shadow-md hover:shadow-blue-300 transition'>
           {Icon && <Icon className='w-8 h-8 text-blue-600 mb-2 mx-auto' />}
            <h3 className='text-xl font-semibold'>{title}</h3>
            <p className='text-gray-600'>{description}</p>
        </div>
    )
}

export default Card