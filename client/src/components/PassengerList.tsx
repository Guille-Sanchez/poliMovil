import { useDispatch, useSelector } from 'react-redux'
import type { RootState } from '../redux/store'
import { type Post } from '../types'
import { IconCloseCircle } from '../assets/Icons'
import { useState } from 'react'
import { updatePost } from '../redux/postsSlice'
import { removePassenger } from '../services/removePassenger'
import { MessageDialog } from './post/MessageDialog'
import { MessageInitialState } from '../constants'
interface Props {
  post: Post
}

export const PassengerList = ({ post }: Props): JSX.Element => {
  const users = useSelector((state: RootState) => state.users)

  // Get passenger IDs from the detailed post && find user info for each passenger
  const passengerIds = post.travelId.passengerId
  const passengerInfoList = passengerIds.map((id) => users.find(user => user.id === id))

  // Get UserInformation to allow user to cancel trip
  const [openDialog, setOpenDialog] = useState(false)
  const [openConfirmation, setOpenConfirmation] = useState(false)
  const [message, setMessage] = useState(MessageInitialState)
  const { accessToken } = useSelector((state: RootState) => state.authentication)
  const dispatch = useDispatch()
  const { userId } = useSelector((state: RootState) => state.authentication.userInformation)

  const handleOnClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>): void => {
    e.preventDefault()
    setOpenConfirmation(true)
  }

  const handleOnRemovePassenger = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>): void => {
    e.preventDefault()
    removePassenger({ accessToken, post })
      .then((data) => {
        const { message, updatedPost } = data
        if (message.type === '¡Exito!') {
          dispatch(updatePost(updatedPost))
        }
        setMessage(message)
        setOpenDialog(true)
      })
      .catch((err) => {
        console.log(err)
      })
  }

  return (
    <div>
      <p className='font-bold text-xl pr-5 pl-5 pb-2'>Pasajeros</p>
      {
        (passengerInfoList?.length !== 0 && passengerInfoList !== undefined)
          ? (
              <ul>
                {
                  passengerInfoList.map((user, index) => {
                    return (
                      <li key={user?.id} className='border mr-5 ml-5 mb-5 p-1'>
                        <div className='flex gap-2 pr-5 pl-5 items-center relative'>
                          <p className='font-bold text-xl'>{index + 1}- </p>

                          <div className='flex gap-2'>
                            <div className='flex flex-col gap-1 w-max'>
                              <span>Usuario:</span>
                              <span>Email:</span>
                              <span>Celular:</span>
                            </div>
                            <div className='flex flex-col gap-1 w-max'>
                              <div className='flex gap-2'>
                                <p>{user?.name} {user?.lastName}</p>
                                {
                                  userId === user?.id &&
                                  <button className='absolute -right-4 -top-4'
                                    onClick={(e) => {
                                      handleOnClick(e)
                                    }}
                                  >
                                    <IconCloseCircle fill={'#990000'} height={'2rem'} width={'2rem'}/>
                                  </button>
                                }
                              </div>
                              <p>{user?.email}</p>
                              <p>{user?.phone}</p>
                            </div>
                          </div>
                        </div>
                      </li>
                    )
                  })
                }
              </ul>
            )
          : <p className='pl-5'>Sin pasajeros</p>
      }

      {
        openConfirmation &&
        <dialog className="absolute inset-0 h-full w-full z-50 overflow-auto bg-gray-500 bg-opacity-75 flex items-center justify-center">
          <div className="p-4 flex justify-center items-center flex-col gap-5 bg-white rounded-md shadow-lg w-3/4 outline-none focus:outline-none">
            <p className='text-center text-lg'>Estas seguro que quieres eliminar tu reserva</p>
            <div className='flex gap-5'>
              <button
                className='bg-gradient-to-r from-blue-900 to-indigo-900 text-white px-5 py-2 rounded-lg'
                onClick={() => { setOpenConfirmation(false) }}>
                Atras
              </button>
              <button
                className='bg-[#990000] text-white px-5 py-2 rounded-lg'
                onClick={(e) => { handleOnRemovePassenger(e) }}
              >
                Eliminar
              </button>
            </div>
          </div>
        </dialog>
      }
      {openDialog && <MessageDialog message={message} />}
    </div>
  )
}
