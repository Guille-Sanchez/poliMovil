import { useSelector } from 'react-redux'
import type { RootState } from '../redux/store'
import { type Post } from '../types'

interface Props {
  post?: Post
}

export const PassengerList = ({ post }: Props): JSX.Element => {
  const users = useSelector((state: RootState) => state.users)

  // get passenger IDs from the detailed post && find user info for each passenger
  const passengerIds = post?.travelId.passengerId ?? []
  const passengerInfoList = passengerIds.map((id) => users.find(user => user.id === id))

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
                      <li key={user?.id}>
                        <div className='flex gap-2 pr-5 pl-5 items-center'>
                          <p className='font-bold text-xl'>{index + 1}- </p>
                          <div className='flex gap-2'>
                            <div className='flex flex-col gap-2 w-max'>
                              <span>Usuario:</span>
                              <span>Email:</span>
                              <span>Celular:</span>
                            </div>
                            <div className='flex flex-col gap-2 w-max'>
                              <p>{user?.name} {user?.lastName}</p>
                              <p>{user?.email}</p>
                              <p>{user?.phone}</p>
                            </div>
                          </div>
                        </div>
                        {(index < passengerInfoList.length - 1) && <hr className='w-full mt-4 mb-4'/>}
                      </li>
                    )
                  })
                }
              </ul>
            )
          : <p className='pl-5'>Sin pasajeros</p>
        }
    </div>
  )
}
