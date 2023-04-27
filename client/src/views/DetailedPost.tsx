import { useParams } from 'react-router-dom'
import type { RootState } from '../redux/store'
import { useSelector } from 'react-redux'
import { type Post } from '../types'
import { PostTable } from '../components/PostsTable'

export const DetailedPost = (): JSX.Element => {
  const posts = useSelector((state: RootState) => state.posts)
  const users = useSelector((state: RootState) => state.users)
  const { id } = useParams<{ id: string }>()

  // find the post with matching ID
  const detailedPost = posts.find((post: Post) => post.id === id)

  // get passenger IDs from the detailed post && find user info for each passenger
  const passengerIds = detailedPost?.travelId.passengerId ?? []
  const passengerInfoList = passengerIds.map((id) => users.find(user => user.id === id))

  return (
    <section className="bg-white pr-5 pl-5 w-full h-full pt-5">

      {(detailedPost != null) && <PostTable post={detailedPost} />}

      <div className='flex justify-evenly items-center w-full'>
        <button className='bg-gradient-to-r from-blue-900 to-indigo-900 text-white pt-2 pb-2 p-7 pr-7 rounded-lg'>
          Reservar
        </button>
      </div>

      <div>
        <p className='font-bold'>Pasajeros</p>
        {
          (passengerInfoList?.length !== 0 && passengerInfoList !== undefined)
            ? (
                passengerInfoList.map((user, index) => {
                  return (
                    <div key={user?.id}>
                      <p>{user?.name} {user?.lastName}</p>
                      <p>{user?.email}</p>
                      <p>{user?.phone}</p>
                      {(index < passengerInfoList.length - 1) && <hr className='w-full mt-4 mb-4'/>}
                    </div>
                  )
                })
              )
            : <p>Sin pasajeros</p>
        }
      </div>
    </section>
  )
}
