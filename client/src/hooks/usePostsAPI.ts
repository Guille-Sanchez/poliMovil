//  Custom hook that retrieves posts from an API and updates the state of posts in the Redux store

import { useEffect } from 'react'
import { getPostService } from '../services/posts/getPostService'
import { usePostsActions } from '../redux/hooks/usePostsActions'

export const usePostsAPI = (): void => {
  const { savePostsInStore } = usePostsActions()

  useEffect(() => {
    let subscribed = true

    if (subscribed) {
      getPostService()
        .then((res) => {
          const { message, posts } = res
          if (message.type === '¡Exito!') {
            savePostsInStore({ posts })
          }
        })
        .catch((err) => {
          console.log(err)
        })
    }

    return () => {
      subscribed = false
    }
  }, [])
}
