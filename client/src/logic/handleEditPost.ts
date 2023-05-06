import type React from 'react'
import { updatePost } from '../redux/postsSlice'
import { PostInitialState } from '../constants'
import { type DataBasePost, type submittedValues } from '../types'
import { updatePostService } from '../services/updatePostService'
import { type NavigateFunction } from 'react-router-dom'
import { type AnyAction, type Dispatch } from '@reduxjs/toolkit'

interface Props {
  submittedValues: submittedValues
  setSubmittedValues: React.Dispatch<React.SetStateAction<submittedValues>>
  accessToken: string
  navigate: NavigateFunction
  dispatch: Dispatch<AnyAction>
  e: React.MouseEvent<HTMLButtonElement, MouseEvent>
}

export const handleEditPost = async ({ e, submittedValues, setSubmittedValues, accessToken, navigate, dispatch }: Props): Promise<void> => {
  e.preventDefault()

  const { setNext, travelId, ...newPost } = submittedValues
  const updateOldPost: DataBasePost = {
    ...newPost,
    travelId: travelId.id
  }

  const { message } = await updatePostService({ updateOldPost, accessToken })

  if (message.type === 'error') {
    setSubmittedValues({ ...PostInitialState, setNext: false })
    navigate('/error', { state: { message: message.mensaje, type: message.type } })
  } else if (message.type === 'success') {
    navigate('/success', { state: { message: message.mensaje, type: message.type } })
    dispatch(updatePost({ ...newPost, travelId }))
  }

  setSubmittedValues({ ...PostInitialState, setNext: false })
}
