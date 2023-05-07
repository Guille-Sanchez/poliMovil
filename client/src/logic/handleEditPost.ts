import type React from 'react'
import { updatePost } from '../redux/postsSlice'
import { type messageType, type DataBasePost, type submittedValues } from '../types'
import { updatePostService } from '../services/updatePostService'
import { type AnyAction, type Dispatch } from '@reduxjs/toolkit'

interface Props {
  submittedValues: submittedValues
  accessToken: string
  dispatch: Dispatch<AnyAction>
  e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  setOpenDialog: React.Dispatch<React.SetStateAction<boolean>>
}

interface returnProps {
  message: messageType
}

export const handleEditPost = async ({ e, submittedValues, accessToken, dispatch, setOpenDialog }: Props): Promise<returnProps> => {
  e.preventDefault()

  const { setNext, travelId, ...newPost } = submittedValues
  const updateOldPost: DataBasePost = {
    ...newPost,
    travelId: travelId.id
  }

  const { message } = await updatePostService({ updateOldPost, accessToken })
  setOpenDialog(() => true)

  if (message.type === '¡Exito!') {
    dispatch(updatePost({ ...newPost, travelId }))
  }

  return ({ message })
}
