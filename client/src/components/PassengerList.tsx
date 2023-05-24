import { type Post } from '../types'
import { IconCloseCircle } from '../assets/Icons'
import { useState } from 'react'
import { ConfirmationDialog } from './ConfirmationDialog'
import { useDeleteReservation } from '../hooks/useDeleteReservation'
import { MessageDialog } from './post/MessageDialog'
import { useAppSelector } from '../redux/hooks/useStore'
import { LoadingSpinner } from './LoadingSpinner'

interface Props {
  post: Post
}

export const PassengerList = ({ post }: Props): JSX.Element => {
  const { authentication } = useAppSelector((state) => state)
  const { userId } = authentication.userInformation

  const passengerInfoList = post.travelId.passengerId
  const hasPassengers = passengerInfoList.length > 0

  // Get UserInformation to allow user to cancel trip
  const [continueAction, setContinueAction] = useState(false)
  const [openConfirmation, setOpenConfirmation] = useState(false)
  const [loading, setLoading] = useState(false)
  const { message, openDialog } = useDeleteReservation({ continueAction, post, setLoading })
  const messageConfirmation = {
    title: '¿Está seguro que desea eliminar su reserva de viaje?',
    buttonAction: 'Eliminar'
  }

  const handleConfirmationClose = (): void => {
    setOpenConfirmation(false)
  }

  const handleConfirmationConfirm = (): void => {
    setLoading(true)
    setContinueAction(true)
  }

  return (
    <div className='flex flex-col gap-5 justify-center px-5 '>
      <p
        className='font-bold text-xl'
        style={{ fontSize: 'clamp(1.5rem, 1.193rem + 1.311vw, 2.75rem)', padding: 'clamp(0rem, -0.307rem + 1.311vw, 1.25rem) 0' }}
      >
        Pasajeros
      </p>
      {
        (hasPassengers)
          ? (
              <ul className='flex flex-col gap-3'>
                {
                  passengerInfoList.map((user, index) => {
                    return (
                      <li key={user.id}
                        className='bg-white border p-2 rounded-lg'
                        style={{
                          boxShadow: '0px 4px 18px 3px rgba(0,0,0,0.25)',
                          WebkitBoxShadow: '0px 4px 18px 3px rgba(0,0,0,0.25)',
                          MozBoxShadow: ' 0px 4px 18px 3px rgba(0,0,0,0.25)'
                        }}
                      >
                        <div className='flex gap-2 items-center relative'>
                          <p className='font-bold text-xl'>{index + 1}- </p>

                          <div className='flex w-3/4 flex-col gap-2'>
                            <p className='truncate'>Usuario: {user?.name} {user?.lastName}</p>
                            <p>Celular: {user?.phone}</p>

                            <div className='flex flex-col gap-1'>
                              <div className='flex gap-2'>
                                {
                                  userId === user.id &&
                                  <button className='absolute -right-4 -top-4'
                                    onClick={() => { setOpenConfirmation(true) }}
                                  >
                                    <IconCloseCircle fill={'#990000'} height={'2rem'} width={'2rem'}/>
                                  </button>
                                }
                              </div>
                            </div>
                          </div>
                        </div>
                      </li>
                    )
                  })
                }
              </ul>
            )
          : <p
              className='pl-5'
              style={{ fontSize: 'clamp(1rem, 0.711rem + 1.233vw, 1.5rem)' }}
              >
              Sin pasajeros
            </p>
      }

      {openConfirmation && (
        <ConfirmationDialog
          onClose={handleConfirmationClose}
          onConfirm={handleConfirmationConfirm}
          messageConfirmation={messageConfirmation}
        />
      )}

      {loading && <LoadingSpinner />}
      {openDialog && <MessageDialog message={message}/>}
    </div>
  )
}
