// Custom hook that retrieves posts from an API and updates the state of posts in the Redux store

import { useEffect, useState } from 'react'
import { getPostService } from '../services/posts/getPostService'
import { usePostsActions } from '../redux/hooks/usePostsActions'
import { useAppSelector } from '../redux/hooks/useStore'
import { type messageType } from '../types'
import { MessageInitialState } from '../constants'

interface Props {
  isAuthenticated: boolean
  setArePostsLoading: React.Dispatch<React.SetStateAction<boolean>>
}

interface returnProps {
  message: messageType
}

export const usePostsAPI = ({ setArePostsLoading, isAuthenticated }: Props): returnProps => {
  // Get access token to update posts information in case the user is a driver/passenger in a post
  const { accessToken } = useAppSelector((state) => state.authentication)
  const { savePostsInStore } = usePostsActions()
  const [message, setMessage] = useState({ ...MessageInitialState })

  useEffect(() => {
    const controller = new AbortController()
    const signal = controller.signal

    if (isAuthenticated) {
      setArePostsLoading(true)
      getPostService({ controller, signal })
        .then((res) => {
          const { message, posts } = res
          if (message.type === '¡Éxito!') {
            savePostsInStore({ posts })
          }
          setMessage({ ...message })
        })
        .catch((err) => {
          console.log(err)
        })
        .finally(() => {
          setArePostsLoading(false)
        })
    }

    return () => {
      controller.abort()
    }
  }, [accessToken])

  return { message }
}
