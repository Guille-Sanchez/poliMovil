import { type NavigateFunction } from 'react-router-dom'

interface Props {
  navigate: NavigateFunction
  e: React.ChangeEvent<HTMLSelectElement>
  postId: string
}

export const handleOptionSelected = ({ e, navigate, postId }: Props): void => {
  const option = e.target.value

  switch (option) {
    case 'ver-mas':
      navigate(`/posts/${postId}`)
      break
    case 'editar':
      navigate(`/posts/editar/${postId}`)
      break
    case 'eliminar':
      navigate(`/posts/${postId}`)
      break
    default:
      break
  }
}
