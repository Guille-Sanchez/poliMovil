//  Custom hook that retrieves posts from an API and updates the state of posts in the Redux store

import { useEffect } from 'react'
import { getPostService } from '../services/posts/getPostService'
import { usePostsActions } from '../redux/hooks/usePostsActions'

interface Props {
  setAreLoadingPosts: React.Dispatch<React.SetStateAction<boolean>>
}

export const usePostsAPI = ({ setAreLoadingPosts }: Props): void => {
  const { savePostsInStore } = usePostsActions()

  useEffect(() => {
    const controller = new AbortController()
    const signal = controller.signal

    getPostService({ signal })
      .then((res) => {
        const { message, posts } = res
        if (message.type === '¡Exito!') {
          savePostsInStore({ posts })
        }
      })
      .catch((err) => {
        console.log(err)
      })
      .finally(() => {
        setAreLoadingPosts(false)
      })

    return () => {
      controller.abort()
    }
  }, [])
}
