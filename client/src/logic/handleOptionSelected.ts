import { type Dispatch } from 'react'
import { type NavigateFunction } from 'react-router-dom'
import { deletePost } from '../redux/postsSlice'
import { type AnyAction } from '@reduxjs/toolkit'

interface Props {
  navigate: NavigateFunction
  e: React.ChangeEvent<HTMLSelectElement>
  dispatch: Dispatch<AnyAction>
  postId: string
}

export const handleOptionSelected = ({ e, navigate, dispatch, postId }: Props): void => {
  const option = e.target.value
  // TODO: Handle options
  switch (option) {
    case 'ver-mas':
      navigate(`/posts/${postId}`)
      break
    case 'editar':
      // TODO: editar post from API
      navigate(`/posts/editar/${postId}`)
      break
    case 'eliminar':
      // TODO: eliminar post from API
      dispatch(deletePost(postId))
      navigate('/success', { state: { message: 'Post eliminado correctamente' } })
      break
    default:
      break
  }
}
