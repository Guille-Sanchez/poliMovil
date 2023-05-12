interface Props {
  setOpenConfirmation: React.Dispatch<React.SetStateAction<boolean>>
  setContinueAction: React.Dispatch<React.SetStateAction<boolean>>
}

export const ConfirmationDialog = ({ setOpenConfirmation, setContinueAction }: Props): JSX.Element => {
  return (
    <dialog className="absolute inset-0 h-full w-full z-50 overflow-auto bg-gray-500 bg-opacity-75 flex items-center justify-center">
      <div className="p-4 flex justify-center items-center flex-col gap-5 bg-white rounded-md shadow-lg w-3/4 outline-none focus:outline-none">
        <p className='text-center text-lg'>Estas seguro que quieres continuar con esta acción</p>
        <div className='flex gap-5'>
          <button
            className='bg-gradient-to-r from-blue-900 to-indigo-900 text-white px-5 py-2 rounded-lg'
            onClick={() => { setOpenConfirmation(false) }}>
            Atras
          </button>
          <button
            className='bg-[#990000] text-white px-5 py-2 rounded-lg'
            onClick={() => { setContinueAction(true) }}
          >
            continuar
          </button>
        </div>
      </div>
    </dialog>
  )
}
