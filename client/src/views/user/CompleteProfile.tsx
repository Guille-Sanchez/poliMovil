import { UpdatePersonalInformationForm } from '../../components/UpdatePersonalInformationForm'

export const CompleteProfile = (): JSX.Element => {
  return (
    <section className="bg-white h-full w-full pt-5">
      <UpdatePersonalInformationForm formLegend={'Complete su perfil'}/>
    </section>
  )
}
