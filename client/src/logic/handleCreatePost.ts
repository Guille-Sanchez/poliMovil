import type React from 'react'
import { addPost } from '../redux/postsSlice'
import { PostInitialState } from '../constants'
import { type submittedValues } from '../types'
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

export const handleCreatePost = async ({ e, submittedValues, setSubmittedValues, accessToken, navigate, dispatch }: Props): Promise<void> => {
  e.preventDefault()
  // TODO: send to api
  console.log(accessToken)
  if (submittedValues.id === '') {
    dispatch(addPost(submittedValues)) // Guardar id de post from API
    navigate('/success', { state: { message: 'Post creado correctamente', type: 'success' } })
  }
  setSubmittedValues({ ...PostInitialState, setNext: false })
}
