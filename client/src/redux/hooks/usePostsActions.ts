import { useDispatch } from 'react-redux'
import { formatPosts } from '../../logic/formatPosts'
import { addPost, deletePost, getPosts, updatePost } from '../postsSlice'
import { type Post, type Posts } from '../../types'

interface returnProps {
  savePostsInStore: ({ posts }: { posts: Posts }) => void
  addNewPostInStore: ({ post }: { post: Post }) => void
  editPostInStore: ({ newPost }: { newPost: Post }) => void
  deletePostInStore: ({ id }: { id: string }) => void
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

  const deletePostInStore = ({ id }: { id: string }): void => {
    dispatch(deletePost(id ?? ''))
  }
  return { savePostsInStore, addNewPostInStore, editPostInStore, deletePostInStore }
}
