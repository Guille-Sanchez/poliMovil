export const PostForm = (): JSX.Element => {
  return (
    <form className='pt-4 pl-5 pr-5 grid gap-4 w-full'>
      <div className='flex justify-between'>
        <label htmlFor='origen'>Origen <span aria-required className='text-red-500'>*</span></label>
        <input type="text" name='origen' id='origen' required/>
      </div>

      <div className='flex justify-between'>
          <label htmlFor="destino">Destino <span aria-required className='text-red-500'>*</span></label>
          <input type="text" name='destino' id='destino' required/>
      </div>

      <div className='flex justify-between'>
          <label htmlFor="horario">Horario <span aria-required className='text-red-500'>*</span></label>
          <input type="text" name='horario' id='horario'/>
      </div>

      <div className='flex justify-between'>
        <label htmlFor="numeroAsientos">N&#176; de Asientos <span aria-required className='text-red-500'>*</span></label>
        <input type="number" name='numeroAsientos' id='numeroAsientos'/>
      </div>

      <div className='flex justify-between'>
        <label htmlFor="details">Detalles</label>
        <input type="text" name='details' id='details'/>
      </div>

      <div className='flex justify-between'>
        <button>Cancelar</button>
        <button>Enviar</button>
      </div>
    </form>
  )
}
