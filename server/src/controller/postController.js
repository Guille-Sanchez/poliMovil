import { Post } from '../models/Post.js'

export const createPost = (req, res) => {
  const userId = req.params.id
  const { origen, destino, horario, asientosDisponibles } = req.body

  if (origen === '' || destino === '' || horario === '' || asientosDisponibles === '') {
    res.status(400).send('Faltan datos')
    return
  }

  const post = new Post({ ...req.body, userId })

  post.save()
    .then((savedPost) => {
      res.status(201).json(savedPost)
    })
}

export const getPosts = (req, res) => {
  Post.find()
    .then((posts) => {
      res.status(200).json(posts)
    })
    .catch((error) => {
      res.status(400).send({
        message: error.message
      })
    })
}
