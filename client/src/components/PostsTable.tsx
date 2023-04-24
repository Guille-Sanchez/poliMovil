import { useEffect, useState } from 'react'
import { type Users, type Posts } from '../types'

export const PostTable = (): JSX.Element => {
  const [posts, setPosts] = useState<Posts | null>(null)
  const [users, setUsers] = useState<Users | null>(null)

  useEffect(() => {
    let subscribed = true

    if (subscribed) {
      // Fetch Data From API
      fetch('http://localhost:3000/api/posts')
        .then(async (response) => await response.json())
        .then((data) => {
          setPosts(() => data)
        })
        .catch((error) => {
          console.log(error)
        })

      fetch('http://localhost:3000/api/users')
        .then(async (response) => await response.json())
        .then((data) => {
          setUsers(() => data)
        })
        .catch((error) => {
          console.log(error)
        })
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
                            return (user.id === post.userId)
                          })?.username
                        }
                      </p>
                      <p className='text-xs'>
                        {
                          users?.find((user) => {
                            return (user.id === post.userId)
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
                        post.asientosDisponibles - post.pasajeros.length
                      }
                    </p>
                    {
                      post.asientosDisponibles - post.pasajeros.length > 0 &&
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
