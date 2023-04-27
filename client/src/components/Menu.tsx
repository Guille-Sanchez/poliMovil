export const Menu = (): JSX.Element => {
  const links = ['Mi perfil', 'Acerca de', 'Cerrar Sesión']

  return (
    <nav className="absolute z-10 inset-0 top-[72px] bg-black bg-opacity-50">
      <ul className="bg-white absolute flex flex-col items-center gap-4 p-5 rounded-lg text-black text-xl font-semibold" style={{ inset: '0 20px auto' }}>
        {
          links.map((link) => {
            return (
              <li key={link}>{link}</li>
            )
          })
        }
      </ul>
    </nav>
  )
}
