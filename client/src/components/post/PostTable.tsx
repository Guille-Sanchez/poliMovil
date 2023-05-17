import { type Post } from '../../types'

interface Props {
  post: Post
}

export const PostTable = ({ post }: Props): JSX.Element => {
  return (
    <table className='border w-full text-center'>
      <caption className='hidden'>Detalles del viaje</caption>
      <thead>
        <tr className='border-b'>
          <th className='border-r'>Origen</th>
          <th className='border-r'>Destino</th>
          <th className='border-r'>Horario</th>
        </tr>
      </thead>

      <tbody>
        <tr>
          <td className='border-r'>{post.origen}</td>
          <td className='border-r'>{post.destino}</td>
          <td>{post.horario}</td>
        </tr>
      </tbody>
    </table>
  )
}
