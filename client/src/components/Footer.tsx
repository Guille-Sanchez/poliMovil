import { IconAddR, IconCarSide, IconHome } from '../assets/Icons'
import { Link } from 'react-router-dom'

export const Footer = (): JSX.Element => {
  return (
    <footer className='sticky bottom-0 bg-gradient-to-r from-blue-900 to-indigo-900 flex justify-between pt-2 pr-5 pl-5 pb-2' >
      <div className='flex flex-col items-center'>
        <button>
          <Link to={'/'}>
            <IconHome width={'2em'} height={'2em'} color='whiteSmoke'/>
          </Link>
        </button>
        <p className='text-slate-200'>Inicio</p>
      </div>

      <div className='flex flex-col items-center'>
        <button className='flex flex-col'>
          <Link to={'/posts'}>
            <IconAddR width={'2em'} height={'2em'} viewBox='0 0 25 25' color='whiteSmoke'/>
          </Link>
        </button>
        <p className='text-slate-200'>Publicar Viaje</p>
      </div>

      <div className='flex flex-col items-center'>
        <button>
          <Link to={'/'}>
            <IconCarSide width={'2em'} height={'2em'} color='whiteSmoke'/>
          </Link>
        </button>
        <p className='text-slate-200'>Mis Viajes</p>
      </div>

    </footer>
  )
}
