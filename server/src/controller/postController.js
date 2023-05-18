import { Post } from '../models/Post.js'
import { Travel } from '../models/Travel.js'
import { User } from '../models/User.js'
import moment from 'moment-timezone'

export const createPost = async (req, res) => {
  const userId = req.userId
  const { origen, destino, horario, asientosDisponibles } = req.body

  if (origen === '' || destino === '' || horario === '' || asientosDisponibles === '') {
    return res.status(400).send('Faltan datos')
  }

  const created = moment().tz('America/Asuncion').format('YYYY-MM-DDTHH:mm:ss.SSSZ')
  const updated = created

  const post = new Post({ ...req.body, created, updated })
  await post.save()

  const travel = new Travel({
    driverId: userId,
    postId: post._id
  })

  await travel.save()
  await User.findByIdAndUpdate(userId, { $push: { travels: travel._id } })

  Post.findByIdAndUpdate(post._id, { travelId: travel._id }, { new: true }).populate({
    path: 'travelId',
    populate: {
      path: 'driverId passengerId',
      model: 'User',
      select: '-password -isAdmin -travels'
    }
  })
    .then((post) => {
      res.status(201).json(post)
    })
}

export const getPosts = (req, res) => {
  Post.find()
    .populate({
      path: 'travelId',
      populate: {
        path: 'driverId passengerId',
        model: 'User',
        select: '-password -isAdmin -travels'
      }
    }).then((posts) => {
      res.status(200).json(posts)
    })
    .catch((error) => {
      res.status(400).send({
        message: error.message
      })
    })
}

export const getPost = (req, res) => {
  const postId = req.params.id
  Post.findById(postId).populate('travelId')
    .then((post) => {
      res.status(200).json(post)
    })
    .catch((error) => {
      res.status(400).send({
        message: error.message
      })
    })
}

export const updatePost = (req, res) => {
  const postId = req.params.id
  const updated = moment().tz('America/Asuncion').format('YYYY-MM-DDTHH:mm:ss.SSSZ')

  Post.findByIdAndUpdate(postId, { ...req.body, updated }, { new: true })
    .populate({
      path: 'travelId',
      populate: {
        path: 'driverId passengerId',
        model: 'User',
        select: '-password -isAdmin -travels'
      }
    })
    .then((post) => {
      if (!post) {
        return res.status(400).send({
          message: 'El post buscado no existe'
        })
      }
      console.log({ post })
      res.status(200).json(post)
    })
    .catch((error) => {
      res.status(400).send({
        message: error.message
      })
    })
}

export const deletePost = async (req, res) => {
  try {
    const postId = req.params.id

    // Find and delete the post
    const post = await Post.findByIdAndDelete(postId)
    if (!post) {
      return res.status(404).send({ message: 'Post not found' })
    }

    // Delte travelId from User model
    await User.findByIdAndUpdate(post.driverId, { $pull: { travels: post.travelId } })
    const passangers = await User.find({ travels: post.travelId })
    if (passangers.length > 0) {
      await User.updateMany({ travels: post.travelId }, { $pull: { travels: post.travelId } })
    }

    // Delete the associated travel
    const travel = await Travel.findByIdAndDelete(post.travelId)
    if (!travel) {
      return res.status(404).send({ message: 'Travel not found' })
    }

    // Return a success message
    return res.status(200).send({ message: 'Post and travel deleted successfully' })
  } catch (error) {
    return res.status(500).send({ message: 'An error occurred while deleting the post and travel' })
  }
}
