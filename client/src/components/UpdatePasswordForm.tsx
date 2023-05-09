import { InputPasswordType } from './InputPasswordType'

export const UpdatePasswordForm = (): JSX.Element => {
  const handleOnSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    const { name, lastName, email, phone, password, confirmPassword } = Object.fromEntries(new FormData(e.currentTarget).entries())

    console.log(name, lastName, email, phone, password, confirmPassword)
  }

  return (
    <form className='pl-5 pr-5 grid gap-6 w-full' onSubmit={(e) => { handleOnSubmit(e) }}>
      <fieldset className='grid gap-3 w-full'>
        <legend className='text-xl font-semibold text-left w-full pb-3'>Actualizar Contraseña</legend>
        <InputPasswordType htmlFor='oldPassword' />
        <InputPasswordType htmlFor='newPassword' />
        <InputPasswordType htmlFor='confirmPassword' />
      </fieldset>

      <button className='bg-gradient-to-r from-blue-900 to-indigo-900 text-white pt-2 pb-2 p-7 pr-7 rounded-lg' type="submit">
        Actualizar
      </button>
    </form>
  )
}
