import { useEffect, useState } from 'react'
import { MessageInitialState } from '../constants'
import { type RootState } from '../redux/store'
import { useDispatch, useSelector } from 'react-redux'
import { removePassenger } from '../services/removePassenger'
import { updatePost } from '../redux/postsSlice'
import { type messageType, type Post } from '../types'

interface Props {
  continueAction: boolean
  post: Post
}

interface returnProps {
  message: messageType
  openDialog: boolean
}

export const useDeleteReservation = ({ continueAction, post }: Props): returnProps => {
  const [openDialog, setOpenDialog] = useState(false)
  const [message, setMessage] = useState(MessageInitialState)
  const { accessToken } = useSelector((state: RootState) => state.authentication)
  const dispatch = useDispatch()

  useEffect(() => {
    let subscribed = true
    console.log(continueAction)

    if (subscribed && continueAction) {
      removePassenger({ accessToken, post })
        .then((data) => {
          const { message, updatedPost } = data
          if (message.type === '¡Exito!') {
            dispatch(updatePost(updatedPost))
          }
          setMessage(message)
          setOpenDialog(true)
        })
        .catch((err) => {
          console.log(err)
        })
    }

    return () => {
      subscribed = false
    }
  }, [continueAction])

  return ({ message, openDialog })
}
