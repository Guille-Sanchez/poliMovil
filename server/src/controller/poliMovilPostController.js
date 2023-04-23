import { PoliMovilPost } from '../models/poliMovilPost.js'

export const createPost = (req, res) => {
  const usuarioId = req.params.id
  const { origen, destino, horario, numeroAsientos, detalles, pasajeros } = req.body

  if (origen === '' || destino === '' || horario === '' || numeroAsientos === '') {
    res.status(400).send('Faltan datos')
    return
  }

  const post = new PoliMovilPost({
    origen,
    destino,
    horario,
    numeroAsientos,
    detalles,
    usuarioId,
    pasajeros
  })

  post.save()
    .then((savedPost) => {
      res.status(201).json(savedPost)
    })
}

export const getPosts = (req, res) => {
  PoliMovilPost.find()
    .then((posts) => {
      res.status(200).json(posts)
    })
    .catch((error) => {
      res.status(400).send({
        message: error.message
      })
    })
}
