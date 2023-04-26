import { Post } from '../models/Post.js'
import { Travel } from '../models/Travels.js'
import { User } from '../models/User.js'

export const createPost = async (req, res) => {
  const userId = req.params.id
  const { origen, destino, horario, asientosDisponibles } = req.body

  if (origen === '' || destino === '' || horario === '' || asientosDisponibles === '') {
    return res.status(400).send('Faltan datos')
  }

  const post = new Post({ ...req.body })
  await post.save()

  const travel = new Travel({
    driverId: userId,
    postId: post._id
  })

  await travel.save()

  await Post.findByIdAndUpdate(post._id, { travelId: travel._id })
  await User.findByIdAndUpdate(userId, { $push: { travels: travel._id } })

  res.status(201).json(post)
}

export const getPosts = (req, res) => {
  Post.find().populate('travelId')
    .then((posts) => {
      res.status(200).json(posts)
    })
    .catch((error) => {
      res.status(400).send({
        message: error.message
      })
    })
}
