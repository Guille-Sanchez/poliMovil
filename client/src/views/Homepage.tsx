import { PostTable } from '../components/PostsTable'
import { Link } from 'react-router-dom'

export const Homepage = (): JSX.Element => {
  return (
    <div className="bg-white grid place-items-center w-full h-full pt-5">
      <PostTable/>
      <div className='h-full w-full flex justify-end pr-5'>
        <Link to={'/post'}>
          <button
            className='bg-gradient-to-r from-blue-900 to-indigo-900 text-white text-xl rounded-full h-10 w-10'
          >
            +
          </button>
        </Link>
      </div>
    </div>
  )
}
