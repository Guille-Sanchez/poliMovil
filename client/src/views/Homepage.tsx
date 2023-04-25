import { PostTable } from '../components/PostsTable'

export const Homepage = (): JSX.Element => {
  return (
    <div className="bg-white grid place-items-center w-full h-full pt-5">
      <PostTable/>
    </div>
  )
}
