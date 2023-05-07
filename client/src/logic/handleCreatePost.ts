import type React from 'react'
import { addPost } from '../redux/postsSlice'
import { PostInitialState } from '../constants'
import { type submittedValues } from '../types'
import { type AnyAction, type Dispatch } from '@reduxjs/toolkit'

interface Props {
  submittedValues: submittedValues
  setSubmittedValues: React.Dispatch<React.SetStateAction<submittedValues>>
  accessToken: string
  dispatch: Dispatch<AnyAction>
  e: React.MouseEvent<HTMLButtonElement, MouseEvent>
}

export const handleCreatePost = async ({ e, submittedValues, setSubmittedValues, accessToken, dispatch }: Props): Promise<void> => {
  e.preventDefault()
  // TODO: send to api
  const { setNext, travelId, ...newPost } = submittedValues
  fetch('http://localhost:3000/api/posts', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(newPost)
  }).then(async res => await res.json())
    .then(res => { console.log(res) })
    .catch(err => { console.log(err) })

  dispatch(addPost({ ...newPost, travelId })) // Guardar id de post from API
  setSubmittedValues({ ...PostInitialState, setNext: false })
}
