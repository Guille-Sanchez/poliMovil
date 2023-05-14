import { useEffect, useState } from 'react'
import { MessageInitialState } from '../constants'
import { type RootState } from '../redux/store'
import { useSelector } from 'react-redux'
import { removePassenger } from '../services/removePassenger'
import { type messageType, type Post } from '../types'
import { usePostsActions } from '../redux/hooks/usePostsActions'

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
  const { editPostInStore } = usePostsActions()

  useEffect(() => {
    let subscribed = true

    if (subscribed && continueAction) {
      removePassenger({ accessToken, post })
        .then((data) => {
          const { message, newPost } = data
          if (message.type === '¡Exito!') {
            editPostInStore({ newPost })
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
