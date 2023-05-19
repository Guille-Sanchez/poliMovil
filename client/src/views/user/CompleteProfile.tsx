import { UpdatePersonalInformationForm } from '../../components/UpdatePersonalInformationForm'

export const CompleteProfile = (): JSX.Element => {
  return (
    <section
      className="flex-shrink-0 w-full max-w-4xl min-h-full py-5"
      style={{ fontSize: 'clamp(1rem, 0.711rem + 1.233vw, 1.5rem)' }}
      >
      <UpdatePersonalInformationForm formLegend={'Complete su perfil'}/>
    </section>
  )
}
