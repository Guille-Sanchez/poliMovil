import { useState } from 'react'
import { Link } from 'react-router-dom'
import { InputPasswordType } from '../components/InputPasswordType'
import { createUser } from '../services/users/createUser'
import { MessageDialog } from '../components/post/MessageDialog'
import { MessageInitialState } from '../constants'
import { useDispatch } from 'react-redux'
import { addNewUser } from '../redux/usersSlice'

export const SignUp = (): JSX.Element => {
  const [error, setError] = useState<string | null>(null)
  const [openDialog, setOpenDialog] = useState(false)
  const [message, setMessage] = useState(MessageInitialState)
  const dispatch = useDispatch()

  const handleOnSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault()

    const emailRegex = /^[^@]+@fpuna\.edu\.py$/
    setError(null)
    const { email, password, confirmPassword } = Object.fromEntries(new FormData(e.currentTarget).entries())

    if (email === '' || password === '' || confirmPassword === '') {
      setError('Por favor llene todos los campos')
      return
    } else if (!emailRegex.test(email as string)) {
      setError('El email debe tener dominio @fpuna.edu.py')
      return
    } else if (password !== confirmPassword) {
      setError('Las contraseñas no coinciden')
      return
    }

    const postData = {
      email: email as string,
      password: password as string
    }

    createUser({ postData })
      .then((res) => {
        dispatch(addNewUser(res.newUser))
        setMessage(() => { return { ...res.message } })
        setOpenDialog(true)
      })
      .catch((err) => {
        console.log(err)
      })
  }

  return (
    <section className="bg-white p-5 flex flex-col gap-6 h-full w-full">
      <form className='bg-white flex flex-col gap-6 h-full w-full' onSubmit={(e) => { handleOnSubmit(e) }}>
        <div className="flex flex-col gap-2 justify-between items-center h-min">
          <label htmlFor="email" className='w-full text-left'>Email</label>
          <input autoComplete="off" autoFocus={true} type="text" className="border border-gray-500 rounded-lg pl-5 w-full" placeholder="poligata@fpuna.edu.py" id="email" name="email"/>
        </div>

        <InputPasswordType htmlFor={'password'} />

        <InputPasswordType htmlFor={'confirmPassword'} />

        {error !== null && <p className='text-red-900 text-center'>{error}</p>}

        <div className='flex w-full gap-5 justify-center'>
          <Link to={'/'}>
            <button className='border border-blue-900 text-blue-900 pt-2 pb-2 p-7 pr-7 rounded-lg' type='button'>
              Atras
            </button>
          </Link>

          <button className='bg-gradient-to-r from-blue-900 to-indigo-900 text-white pt-2 pb-2 p-7 pr-7 rounded-lg' type="submit">
            Crear cuenta
          </button>
        </div>
      </form>

      {openDialog && <MessageDialog message={message}/>}
    </section>
  )
}
