export const UnAuthHeader = (): JSX.Element => {
  return (
    <header className="bg-gray-100 p-5 flex flex-col gap-3">
      <h1 className="text-center text-blue-900 text-5xl font-bold max-w-xl mx-auto" style={{ fontSize: 'clamp(3rem, 2.133rem + 3.698vw, 4.5rem)', lineHeight: '1' }}>
        PoliMovil
      </h1>

      <p className="text-center text-gray-500 max-w-xl mx-auto" style={{ fontSize: 'clamp(1.25rem, 0.687rem + 2.404vw, 2.225rem)' }}>
        Una comunidad de estudiantes de la Facultad Politécnica.
      </p>
    </header>
  )
}
