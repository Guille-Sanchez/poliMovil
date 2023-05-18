import { useId } from 'react'

export const TermsOfService = (): JSX.Element => {
  const articleId = useId()
  const articleInfo = [{
    title: 'Sé respetuoso',
    content: 'La plataforma tiene una política de tolerancia cero hacia el acoso y la intimidación, incluyendo ataques personales, humillación, lenguaje abusivo y la revelación de información personal o sensible de otros usuarios.'
  }, {
    title: 'Presenta un perfil confiable',
    content: 'La plataforma requiere la utilización de tu verdadera identidad para el uso de esta aplicación. Es de primordial importancia la utilización del correo académico para verificar la pertenencia del usuario a la comunidad de la Facultad Politécnica.'
  }, {
    title: 'Comparte información real',
    content: 'La plataforma solicita proporcionar información real y precisa en el posteo de cada viaje. Tanto los conductores como los pasajeros se comprometen a mantenerse en contacto en caso de modificaciones o no poder cumplir con los viajes.'
  }]

  return (
    <section className="bg-white w-full h-full flex justify-center p-5">
      <div className="w-full h-full max-w-5xl flex flex-col gap-5">
        <article className="flex flex-col">
          <header>
            <h2 className="font-bold" style={{ fontSize: 'clamp(1.25rem, 0.889rem + 1.541vw, 1.875rem)' }}>Términos de servicio</h2>
          </header>
          <p style={{ fontSize: 'clamp(1rem, 0.711rem + 1.233vw, 1.5rem)' }}>
            Al ser parte de la comunidad universitaria de la Facultad Politécnica, deseamos que PoliMovil refleje la mejor versión de esta institución.
            Este es un espacio solidario de mutuo respeto y se ruega tener en cuenta lo siguiente.
          </p>
        </article>

        <ul className="flex flex-col gap-5 h-full">
          {
            articleInfo.map((article, index) => {
              return (
                <article key={`article-${index}-${articleId}`}>
                  <header>
                    <h3 className="font-bold" style={{ fontSize: 'clamp(1.25rem, 0.889rem + 1.541vw, 1.875rem)' }}>{article.title}</h3>
                  </header>
                  <p style={{ fontSize: 'clamp(1rem, 0.711rem + 1.233vw, 1.5rem)' }}>{article.content}</p>
                </article>
              )
            })
          }

        </ul>
      </div>
    </section>
  )
}
