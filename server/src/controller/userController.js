import { User } from '../models/User.js'

export const createUser = (req, res) => {
  const { username, email, password } = req.body
  if (username === '' || email === '' || password === '') {
    res.status(400).send({
      message: 'Favor completar todos los campos'
    })
    return
  }

  const user = new User({ ...req.body })

  user.save()
    .then((savedUser) => {
      res.status(201).json(savedUser)
    })
    .catch((error) => {
      res.status(400).send({
        message: error.message
      })
    })
}

export const getUsers = (req, res) => {
  User.find()
    .then((users) => {
      res.status(200).json(users)
    })
    .catch((error) => {
      res.status(400).send({
        message: error.message
      })
    })
}
