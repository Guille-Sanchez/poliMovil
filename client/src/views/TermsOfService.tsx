export const TermsOfService = (): JSX.Element => {
  return (
    <section className="bg-white h-full w-full flex flex-col gap-5">
      <article className="flex flex-col pl-5 pr-5">
        <header>
          <h2 className="font-bold text-xl">Términos de servicio</h2>
        </header>
        <p>
          Al ser parte de la comunidad universitaria de la Facultad Politécnica, deseamos que PoliMovil refleje la mejor versión de esta institución.
          Este es un espacio solidario de mutuo respeto y se ruega tener en cuenta lo siguiente.
        </p>
      </article>

      <div className="flex flex-col gap-5 pl-5 pr-5">
        <article>
          <header>
            <h3 className="font-bold text-xl">Se respetuoso</h3>
          </header>
          <p>
            La plataforma tiene una política de tolerancia cero hacia el acoso y la intimidación, incluyendo ataques personales,
            humillación, lenguaje abusivo y la revelación de información personal o sensible de otros usuarios.
          </p>
        </article>

        <article>
          <header>
            <h3 className="font-bold text-xl">Presenta un perfil confiable</h3>
          </header>
          <p>
            La plataforma requiere de la utilización de tu verdadera identidad para la utilización de esta aplicación.
            Es de primordial importancia la utilización del correo académico para verificar la pertenencia a la comunidad de la Facultad Politécnica.
          </p>
        </article>

        <article>
          <header>
            <h3 className="font-bold text-xl">Comparte información real</h3>
          </header>
          <p>
            La plataforma solicita proporcionar información real y precisa en el posteo de cada viaje.
            Tanto los conductores como los pasajeros se comprometen a estar en contacto en caso de modificaciones o no poder cumplir con los viajes.
          </p>
        </article>
      </div>
    </section>
  )
}
