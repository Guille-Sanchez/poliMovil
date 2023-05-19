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
    timeType = 'h.'
    timeValue = hoursAgo
  } else {
    timeType = 'min.'
    timeValue = minutesAgo
  }

  return (
    <p style={{ fontSize: 'clamp(0.75rem, 0.627rem + 0.525vw, 1.25rem)' }}>
      {created === updated ? `Publicado hace: ${timeValue} ${timeType}` : `Actualizado hace: ${timeValue} ${timeType}`}
    </p>
  )
}
