import { type Post } from '../../types'

interface Props {
  post: Post
}

export const PostTable = ({ post }: Props): JSX.Element => {
  return (
    <table className='border w-full'>
      <thead>
        <tr className='border-b'>
          <th className='border-r'>Origen</th>
          <th className='border-r'>Destino</th>
          <th className='border-r'>Horario</th>
        </tr>
      </thead>

      <tbody>
        <tr>
          <td className='text-center border-r'>{post.origen}</td>
          <td className='text-center border-r'>{post.destino}</td>
          <td className='text-center'>{post.horario}</td>
        </tr>
      </tbody>
    </table>
  )
}
