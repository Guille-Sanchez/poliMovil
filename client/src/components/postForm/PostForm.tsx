export const PostForm = (): JSX.Element => {
  return (
    <form>
      <div>
        <label htmlFor='origen'>Origen <span aria-required className='required'>*</span></label>
        <input type="text" name='origen' id='origen' required/>
      </div>

      <div>
          <label htmlFor="destino">Destino <span aria-required className='required'>*</span></label>
          <input type="text" name='destino' id='destino' required/>
      </div>

      <div>
          <label htmlFor="horario">Horario <span aria-required className='required'>*</span></label>
          <input type="text" name='horario' id='horario'/>
      </div>

      <div>
        <label htmlFor="numeroAsientos">N&#176; de Asientos <span aria-required className='required'>*</span></label>
        <input type="number" name='numeroAsientos' id='numeroAsientos'/>
      </div>

      <div>
        <label htmlFor="details">Detalles</label>
        <input type="text" name='details' id='details'/>
      </div>

      <div>
        <button>Cancelar</button>
        <button>Enviar</button>
      </div>
    </form>
  )
}
