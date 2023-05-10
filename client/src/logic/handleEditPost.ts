import type React from 'react'
import { updatePost } from '../redux/postsSlice'
import { type messageType, type DataBasePost, type submittedValues } from '../types'
import { updatePostService } from '../services/posts/updatePostService'
import { type AnyAction, type Dispatch } from '@reduxjs/toolkit'

interface Props {
  submittedValues: submittedValues
  accessToken: string
  dispatch: Dispatch<AnyAction>
  setOpenDialog: React.Dispatch<React.SetStateAction<boolean>>
}

interface returnProps {
  message: messageType
}

interface updateDataBasePost extends DataBasePost {
  travelId: string
}

export const handleEditPost = async ({ submittedValues, accessToken, dispatch, setOpenDialog }: Props): Promise<returnProps> => {
  const { setNext, travelId, ...newPost } = submittedValues
  const updateOldPost: updateDataBasePost = {
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
