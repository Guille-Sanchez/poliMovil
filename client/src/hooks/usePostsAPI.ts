import { useEffect, useState } from 'react'
import { type Posts } from '../types'
import { formatPosts } from '../logic/formatPosts'

interface returnProps {
  posts: Posts | null
  setPosts: React.Dispatch<React.SetStateAction<Posts | null>>
}

export const usePostsAPI = (): returnProps => {
  const [posts, setPosts] = useState<Posts | null>(null)

  useEffect(() => {
    let subscribed = true

    if (subscribed) {
      fetch('http://localhost:3000/api/posts')
        .then(async (response) => await response.json())
        .then((data: Posts) => {
          setPosts(() => formatPosts(data))
        })
        .catch((error) => {
          console.log(error)
        })
    }

    return () => {
      subscribed = false
    }
  }, [])

  return ({ posts, setPosts })
}
