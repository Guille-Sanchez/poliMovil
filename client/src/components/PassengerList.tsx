import { useSelector } from 'react-redux'
import type { RootState } from '../redux/store'
import { type Post } from '../types'
import { IconCloseCircle } from '../assets/Icons'
import { useState } from 'react'
import { ConfirmationDialog } from './ConfirmationDialog'
import { useDeleteReservation } from '../hooks/useDeleteReservation'
import { MessageDialog } from './post/MessageDialog'
interface Props {
  post: Post
}

export const PassengerList = ({ post }: Props): JSX.Element => {
  const users = useSelector((state: RootState) => state.users)

  // Get passenger IDs from the detailed post && find user info for each passenger
  const passengerIds = post.travelId.passengerId
  const passengerInfoList = passengerIds.map((id) => users.find(user => user.id === id))

  // Get UserInformation to allow user to cancel trip
  const [continueAction, setContinueAction] = useState(false)
  const [openConfirmation, setOpenConfirmation] = useState(false)
  const { userId } = useSelector((state: RootState) => state.authentication.userInformation)

  const { message, openDialog } = useDeleteReservation({ continueAction, post })

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
                                    onClick={() => { setOpenConfirmation(true) }}
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

      {openConfirmation && <ConfirmationDialog setOpenConfirmation={setOpenConfirmation} setContinueAction={setContinueAction} />}

      {openDialog && <MessageDialog message={message}/>}
    </div>
  )
}
