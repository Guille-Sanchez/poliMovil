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
            <div className='w-full' key={post.id}>
              <div className='grid w-full pb-3 pr-5 pl-5 gap-3' style={{ flexDirection: 'column' }}>
                  <div className='flex justify-between'>
                    <div className='flex flex-col'>
                      <p>
                        {
                          users?.find((user) => {
                            return (user.usuarioID === post.usuarioID)
                          })?.username
                        }
                      </p>
                      <p className='text-xs'>
                        {
                          users?.find((user) => {
                            return (user.usuarioID === post.usuarioID)
                          })?.email
                        }
                      </p>
                    </div>

                    <div className='flex flex-col'>
                      <p>Publicado hace:</p>
                    </div>

                  </div>

                  <table className='border '>
                    <thead>
                      <tr>
                        <th className='border-r'>Origen</th>
                        <th className='border-r'>Destino</th>
                        <th>Horario</th>
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

                  <div className='flex justify-between'>
                    <p>
                      Asientos Disponibles: {
                        post.numeroAsientos - post.pasajeros.length
                      }
                    </p>
                    {
                      post.numeroAsientos - post.pasajeros.length > 0 &&
                        <button>Reservar</button>
                    }
                  </div>
              </div>
              <hr className='w-full pb-3'/>
            </div>
          )
        })
      }
    </>
  )
}
