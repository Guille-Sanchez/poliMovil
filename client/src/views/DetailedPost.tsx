import type { RootState } from '../redux/store'
import { useSelector } from 'react-redux'

export const DetailedPost = (): JSX.Element => {
  const posts = useSelector((state: RootState) => state.posts)

  return (
    <section className="bg-white pr-5 pl-5 w-full h-full pt-5">
      DetailedPost
      <div>
          <table className='border'>
            <thead>
              <tr className='border-b'>
                <th className='border-r'>Origen</th>
                <th className='border-r'>Destino</th>
                <th className='border-r'>Horario</th>
              </tr>
            </thead>

            <tbody>
              <tr>
                <td className='text-center border-r'>{posts[0].origen}</td>
                <td className='text-center border-r'>{posts[0].destino}</td>
                <td className='text-center'>{posts[0].horario}</td>
              </tr>
            </tbody>
          </table>
      </div>
    </section>
  )
}
