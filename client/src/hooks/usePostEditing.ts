import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { type RootState } from '../redux/store'
import { useParams } from 'react-router-dom'
import { type Post } from '../types'

interface submittedValues extends Post {
  setNext: boolean
}

interface Props {
  setSubmittedValues: React.Dispatch<React.SetStateAction<submittedValues>>
  setLoading: React.Dispatch<React.SetStateAction<boolean>>
}

export const usePostEditing = ({ setSubmittedValues, setLoading }: Props): void => {
  const posts = useSelector((state: RootState) => state.posts)
  const { id } = useParams()

  useEffect(() => {
    let subscribed = true
    if (subscribed) {
      if (id !== undefined) {
        const post = posts.find(post => post.id === id)
        if (post !== undefined) {
          setSubmittedValues({ ...post, setNext: false })
        }
      }
      setLoading(false)
    }

    return () => {
      subscribed = false
    }
  }, [])
}
