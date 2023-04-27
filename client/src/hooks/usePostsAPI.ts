//  Custom hook that retrieves posts from an API and updates the state of posts in the Redux store

import { useEffect } from 'react'
import { type Posts } from '../types'
import { formatPosts } from '../logic/formatPosts'
import { useDispatch } from 'react-redux'
import { getPosts } from '../redux/postSlice'

export const usePostsAPI = (): void => {
  const dispatch = useDispatch()

  useEffect(() => {
    const controller = new AbortController()

    fetch('http://localhost:3000/api/posts', { signal: controller.signal })
      .then(async (response) => await response.json())
      .then((data: Posts) => {
        dispatch(getPosts(formatPosts(data)))
      })
      .catch((error) => {
        if (error.name === 'AbortError') {
          dispatch(getPosts([]))
          return
        }
        console.log(error)
      })

    return () => {
      controller.abort()
    }
  }, [])
}
