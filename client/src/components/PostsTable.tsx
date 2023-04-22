import { useEffect, useState } from 'react'
import { type Users, type Posts } from '../types'
import mockupPosts from '../mockups/mockupPosts.json'
import mockupUsers from '../mockups/mockupUsers.json'

export const PostTable = (): JSX.Element => {
  const [posts, setPosts] = useState<Posts | null>(null)
  const [users, setUsers] = useState<Users | null>(null)

  useEffect(() => {
    let subscribed = true

    if (subscribed) {
      // Fetch Data From API
      setPosts(() => mockupPosts.posts)
      setUsers(() => mockupUsers.users)
    }

    return () => {
      subscribed = false
    }
  }, [])

  return (
    <>
      {
        posts?.map((post) => {
          return (
            <div className='grid' key={post.id} style={{ flexDirection: 'column' }}>
                <div className='flex justify-between'>
                  <p>
                    Usuario: {
                      users?.find((user) => {
                        return (user.usuarioID === post.usuarioID)
                      })?.username
                    }
                  </p>
                  <div className='flex justify-between'>
                    <p>
                      Asientos Disponibles: {
                        post.numeroAsientos - post.pasajeros.length
                      }
                    </p>
                    <p>Publicado hace:</p>
                  </div>
                </div>

                <table>
                  <thead>
                    <tr>
                      <th>Origen</th>
                      <th>Destino</th>
                      <th>Horario</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>{post.origen}</td>
                      <td>{post.destino}</td>
                      <td>{post.horario}</td>
                    </tr>
                  </tbody>
                </table>

                <div className='flex justify-between'>
                  {
                    post.numeroAsientos - post.pasajeros.length > 0
                      ? <button>Reservar</button>
                      : <p>No hay asientos disponibles</p>
                  }
                </div>
                <hr />
            </div>
          )
        })
      }
    </>
  )
}
