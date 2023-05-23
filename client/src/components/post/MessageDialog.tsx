import { Link } from 'react-router-dom'
import { type messageType } from '../../types'
interface Props {
  message: messageType
}

export const MessageDialog = ({ message }: Props): JSX.Element => {
  return (
    <dialog className="absolute inset-0 h-full w-full z-50 overflow-auto bg-gray-500 bg-opacity-75 flex items-center justify-center">
      <div className="p-4 mx-5 flex justify-center items-center flex-col bg-gray-100 rounded-md shadow-lg max-w-lg outline-none focus:outline-none">
        <div className="text-2xl text-center font-semibold mb-2">{message.type}</div>
        <div className="mb-4 text-center">{message.mensaje}</div>
        <Link to={'/'}>
          <button className='bg-gradient-to-r from-blue-900 to-indigo-900 text-white pt-2 pb-2 p-7 pr-7 rounded-lg' type='button' autoFocus>
            Ir al inicio
          </button>
        </Link>
      </div>
    </dialog>
  )
}
