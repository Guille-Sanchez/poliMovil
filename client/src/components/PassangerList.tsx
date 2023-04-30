import { useSelector } from 'react-redux'
import type { RootState } from '../redux/store'
import { type Post } from '../types'

interface Props {
  detailedPost?: Post
}

export const PassangerList = ({ detailedPost }: Props): JSX.Element => {
  const users = useSelector((state: RootState) => state.users)

  // get passenger IDs from the detailed post && find user info for each passenger
  const passengerIds = detailedPost?.travelId.passengerId ?? []
  const passengerInfoList = passengerIds.map((id) => users.find(user => user.id === id))

  return (
    <div>
      <p className='font-bold'>Pasajeros</p>
      {
        (passengerInfoList?.length !== 0 && passengerInfoList !== undefined)
          ? (
              <ul>
                {
                  passengerInfoList.map((user, index) => {
                    return (
                      <li key={user?.id}>
                        <p>{user?.name} {user?.lastName}</p>
                        <p>{user?.email}</p>
                        <p>{user?.phone}</p>
                        {(index < passengerInfoList.length - 1) && <hr className='w-full mt-4 mb-4'/>}
                      </li>
                    )
                  })
                }
              </ul>
            )
          : <p>Sin pasajeros</p>
        }
    </div>
  )
}
