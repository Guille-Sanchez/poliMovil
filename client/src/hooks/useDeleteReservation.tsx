import { useEffect, useState } from 'react'
import { MessageInitialState } from '../constants'
import { removePassenger } from '../services/posts/removePassenger'
import { type messageType, type Post } from '../types'
import { usePostsActions } from '../redux/hooks/usePostsActions'
import { useAppSelector } from '../redux/hooks/useStore'

interface Props {
  continueAction: boolean
  post: Post
  setLoading: React.Dispatch<React.SetStateAction<boolean>>
}

interface returnProps {
  message: messageType
  openDialog: boolean
}

export const useDeleteReservation = ({ continueAction, post, setLoading }: Props): returnProps => {
  const [openDialog, setOpenDialog] = useState(false)
  const [message, setMessage] = useState({ ...MessageInitialState })
  const { accessToken } = useAppSelector((state) => state.authentication)
  const { editPostInStore } = usePostsActions()

  useEffect(() => {
    let subscribed = true

    if (subscribed && continueAction) {
      removePassenger({ accessToken, post })
        .then((data) => {
          const { message, newPost } = data
          if (message.type === '¡Éxito!') {
            message.mensaje = 'Has cancelado correctamente tu reserva de asiento.'
            editPostInStore({ newPost })
          }
          setMessage(message)
          setOpenDialog(true)
        })
        .catch((err) => {
          console.log(err)
        })
        .finally(() => {
          setLoading(false)
        })
    }

    return () => {
      subscribed = false
    }
  }, [continueAction])

  return ({ message, openDialog })
}
