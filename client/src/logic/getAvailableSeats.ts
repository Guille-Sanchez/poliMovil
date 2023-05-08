import { type Post } from '../types'

interface Props {
  post: Post
}

interface returnProps {
  asientosDisponibles: number
}

export const getAvailableSeats = ({ post }: Props): returnProps => {
  const numberOfPassengers = post.travelId.passengerId.filter(value => value !== '').length
  const asientosDisponibles = +post.asientosDisponibles - numberOfPassengers
  return ({ asientosDisponibles })
}
