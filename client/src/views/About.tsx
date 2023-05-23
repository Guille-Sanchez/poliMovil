export const About = (): JSX.Element => {
  return (
    <section className="bg-gray-100 w-full h-full flex justify-center p-5">
      <div className="w-full max-w-5xl flex flex-col gap-2">
        <header>
          <h2 className="font-bold" style={{ fontSize: 'clamp(1.25rem, 0.889rem + 1.541vw, 1.875rem)' }}>Creación</h2>
        </header>

        <article className="flex flex-col gap-5" style={{ fontSize: 'clamp(1rem, 0.711rem + 1.233vw, 1.5rem)' }}>
          <p>
            Este proyecto fue creado con la intención de brindar una alternativa solidaria de transporte a la comunidad de estudiantes pertenecientes a la Facultad Politécnica con sede en la ciudad de San Lorenzo.
          </p>

          <p>
            A fin de validar que los usuarios de esta aplicación pertenezcan a esta comunidad, se exige la utilización del correo académico con dominio <span className="font-bold">@fpuna.edu.py</span>.
          </p>

          <p>
            Para colaborar o obtener mayor información sobre este proyecto, consulte el repositorio en&nbsp;
            <a href="https://github.com/Guille-Sanchez/poliMovil" className="underline text-indigo-900 italic">GitHub</a>.
          </p>
        </article>
      </div>
    </section>
  )
}
