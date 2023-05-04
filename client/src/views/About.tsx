export const About = (): JSX.Element => {
  return (
    <section className="bg-white w-full h-full p-5 flex flex-col gap-2">
      <header>
        <h2 className="font-bold text-2xl">Creacion</h2>
      </header>

      <article className="flex flex-col gap-5">
        <p>
          Este proyecto fue creado con la intension de brindar una alternativa solidaria de transporte a
          la comunidad de estudiantes pertenecientes de la Facultad Politecnica con sede en la ciudad San Lorenzo.
        </p>

        <p>
          A forma de validar que los usuarios de esta aplicacion pertenezcan a esta comunidad se exije la utilizacion
          del correo academico con dominio  <span className="font-bold">@fpuna.edu.py</span>.
        </p>

        <p>
          Para colaborar o adquirir mayor informacion de este proyecto consulte el repositorio en
          &nbsp;<a href="https://github.com/Guille-Sanchez/poliMovil" className="underline text-indigo-900 italic">Github</a>.
        </p>
      </article>
    </section>
  )
}
