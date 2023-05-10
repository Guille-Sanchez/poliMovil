import type React from 'react'
import { addPost } from '../redux/postsSlice'
import { type messageType, type submittedValues } from '../types'
import { type AnyAction, type Dispatch } from '@reduxjs/toolkit'
import { createPostService } from '../services/posts/createPostService'

interface Props {
  submittedValues: submittedValues
  setOpenDialog: React.Dispatch<React.SetStateAction<boolean>>
  accessToken: string
  dispatch: Dispatch<AnyAction>
}

interface returnProps {
  message: messageType
}

export const handleCreatePost = async ({ submittedValues, setOpenDialog, accessToken, dispatch }: Props): Promise<returnProps> => {
  // TODO: send to api
  const { setNext, travelId, ...newPostInformation } = submittedValues
  const { message, response } = await createPostService({ accessToken, newPostInformation })

  setOpenDialog(() => true)

  if (message.type === '¡Exito!' && response !== undefined) {
    dispatch(addPost({ ...response }))
  }

  return ({ message })
}
