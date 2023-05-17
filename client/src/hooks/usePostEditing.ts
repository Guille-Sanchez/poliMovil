import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { type submittedValues } from '../types'
import { useAppSelector } from '../redux/hooks/useStore'

interface Props {
  setSubmittedValues: React.Dispatch<React.SetStateAction<submittedValues>>
  setLoading: React.Dispatch<React.SetStateAction<boolean>>
}

export const usePostEditing = ({ setSubmittedValues, setLoading }: Props): void => {
  const posts = useAppSelector((state) => state.posts)
  const { id } = useParams()

  useEffect(() => {
    let subscribed = true
    if (subscribed) {
      if (id !== undefined) {
        const post = posts.find(post => post.id === id)
        if (post !== undefined) {
          const updated = new Date().toISOString()
          setSubmittedValues({ newPost: { ...post, updated }, setNext: false })
        }
      }
      setLoading(false)
    }

    return () => {
      subscribed = false
    }
  }, [])
}
