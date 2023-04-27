import { IconAddR, IconCarSide, IconHome } from '../assets/Icons'
import { Link } from 'react-router-dom'

export const Footer = (): JSX.Element => {
  return (
    <footer className='sticky bottom-0 bg-gradient-to-r from-blue-900 to-indigo-900 flex justify-between pt-2 pr-5 pl-5 pb-2' >
      <div>
        <Link to={'/'} title='Ir a Inicio'>
          <button className='flex flex-col items-center'>
            <IconHome width={'2em'} height={'2em'} color='whiteSmoke'/>
            <p className='text-slate-200'>Inicio</p>
          </button>
        </Link>
      </div>

      <div>
        <Link to={'/posts'} title='Publicar Viaje'>
          <button className='flex flex-col items-center'>
            <IconAddR width={'2em'} height={'2em'} viewBox='0 0 25 25' color='whiteSmoke'/>
            <p className='text-slate-200'>Publicar Viaje</p>
          </button>
        </Link>
      </div>

      <div>
        <Link to={'/'} title='Mis Viajes'>
          <button className='flex flex-col items-center'>
            <IconCarSide width={'2em'} height={'2em'} color='whiteSmoke'/>
            <p className='text-slate-200'>Mis Viajes</p>
          </button>
        </Link>
      </div>

    </footer>
  )
}
