import { Post } from '../models/Post.js'

export const checkPostOwnershipMiddleware = (req, res, next) => {
  const postId = req.params.id
  const userId = req.userId

  Post.findById(postId).populate('travelId')
    .then((post) => {
      if (!post || post.travelId.driverId.toString() !== userId) {
        return res.status(403).send({
          message: 'No estás autorizado para modificar este post'
        })
      }
      next()
    })
    .catch((error) => {
      res.status(400).send({
        message: error.message
      })
    })
}
