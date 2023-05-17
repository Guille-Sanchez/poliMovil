export const PriceSelector = (): JSX.Element => {
  return (
    <div className='flex flex-col gap-2 justify-between items-center h-min'>
      <label htmlFor='precio' className='w-full text-left'>
        Precio <span aria-required className='text-red-500'>*</span>
      </label>
      <select
        className="border border-gray-500 rounded-lg pl-5 w-full"
        name='precio'
        id='precio'
      >
        <option value="gratis">Gratis</option>
        <option value="2.300 Gs">2.300 Gs</option>
        <option value="A convenir" disabled>A convenir</option>
      </select>
    </div>
  )
}
