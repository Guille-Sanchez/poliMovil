import { PostTable } from '../components/PostsTable'

export const Homepage = (): JSX.Element => {
  return (
    <section className="bg-white pr-5 pl-5 w-full h-full pt-5">
      <PostTable/>
    </section>
  )
}
