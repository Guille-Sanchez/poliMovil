//  Custom hook that retrieves posts from an API and updates the state of posts in the Redux store

import { useEffect } from 'react'
import { getPostService } from '../services/posts/getPostService'
import { usePostsActions } from '../redux/hooks/usePostsActions'
import { useAppSelector } from '../redux/hooks/useStore'

interface Props {
  setArePostsLoading: React.Dispatch<React.SetStateAction<boolean>>
}

export const usePostsAPI = ({ setArePostsLoading }: Props): void => {
  // Get access token to update posts information in case the user is a driver/passenger in a post
  const { accessToken } = useAppSelector(state => state.authentication)
  const { savePostsInStore } = usePostsActions()

  useEffect(() => {
    setArePostsLoading(true)
    const controller = new AbortController()
    const signal = controller.signal
    getPostService({ signal })
      .then((res) => {
        const { message, posts } = res
        if (message.type === '¡Éxito!') {
          savePostsInStore({ posts })
        }
      })
      .catch((err) => {
        console.log(err)
      })
      .finally(() => {
        setArePostsLoading(false)
      })

    return () => {
      controller.abort()
    }
  }, [accessToken])
}
