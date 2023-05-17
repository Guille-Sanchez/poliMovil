interface Props {
  created: string
  updated: string
}

export const PostHour = ({ created, updated }: Props): JSX.Element => {
  const postedDate = created === updated ? new Date(created) : new Date(updated)
  const currentDate = new Date()
  const timeDifference = currentDate.getTime() - postedDate.getTime()
  const minutesAgo = Math.floor(timeDifference / (1000 * 60))
  const hoursAgo = Math.floor(timeDifference / (1000 * 60 * 60))

  let timeType = ''
  let timeValue = 0

  if (hoursAgo > 0) {
    timeType = hoursAgo === 1 ? 'hora' : 'horas'
    timeValue = hoursAgo
  } else {
    timeType = minutesAgo === 1 ? 'minuto' : 'minutos'
    timeValue = minutesAgo
  }

  return (
    <p className="text-sm">{created === updated ? `Publicado hace: ${timeValue} ${timeType}` : `Actualizado hace: ${timeValue} ${timeType}`}</p>
  )
}
