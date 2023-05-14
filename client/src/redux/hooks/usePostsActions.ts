import { useDispatch } from 'react-redux'
import { formatPosts } from '../../logic/formatPosts'
import { addPost, getPosts, updatePost } from '../postsSlice'
import { type Post, type Posts } from '../../types'

interface returnProps {
  savePostsInStore: ({ posts }: { posts: Posts }) => void
  addNewPostInStore: ({ post }: { post: Post }) => void
  editPostInStore: ({ newPost }: { newPost: Post }) => void
}

export const usePostsActions = (): returnProps => {
  const dispatch = useDispatch()

  const savePostsInStore = ({ posts }: { posts: Posts }): void => {
    dispatch(getPosts(formatPosts(posts)))
  }

  const addNewPostInStore = ({ post }: { post: Post }): void => {
    dispatch(addPost(post))
  }

  const editPostInStore = ({ newPost }: { newPost: Post }): void => {
    dispatch(updatePost(newPost))
  }

  return { savePostsInStore, addNewPostInStore, editPostInStore }
}
