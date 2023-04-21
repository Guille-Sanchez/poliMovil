import { useEffect, useState } from 'react'
import './homepage.css'
import { type Users, type Posts } from '../../types'
import mockupPosts from '../../mockups/mockupPosts.json'
import mockupUsers from '../../mockups/mockupUsers.json'

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
            <div key={post.id} style={{ flexDirection: 'column' }}>
                <div>
                  <p>
                    Usuario: {
                      users?.find((user) => {
                        return (user.usuarioID === post.usuarioID)
                      })?.username
                    }
                  </p>
                  <div>
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
                      <th>{post.origen}</th>
                      <th>{post.destino}</th>
                      <th>{post.horario}</th>
                    </tr>
                  </tbody>
                </table>

                <div>
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
