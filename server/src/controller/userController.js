import { User } from '../models/User.js'
import bcrypt from 'bcrypt'

export const createUser = (req, res) => {
  const { username, email, password } = req.body
  if (username === '' || email === '' || password === '') {
    res.status(400).send({
      message: 'Favor completar todos los campos'
    })
    return
  }

  const hashPassword = bcrypt.hashSync(password, process.env.bcryptSalt)

  const user = new User({ ...req.body, password: hashPassword })

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

export const logIn = (req, res) => {
  const { email, password } = req.body
  console.log({ email, password })
  if (email === '' || password === '') {
    return res.status(400).json({
      message: 'Favor completar todos los campos'
    })
  }

  User.findOne({ email })
    .then((user) => {
      if (!user) {
        return res.status(401).json({
          message: 'Usuario o contraseña incorrectos'
        })
      } else {
        bcrypt.compare(password, user.password, (err, result) => {
          if (err) {
            console.log(err)
            return res.status(500).json({
              message: 'Ocurrió un error al comparar las contraseñas'
            })
          } else if (result) {
            return res.status(200).json(user)
          } else {
            return res.status(401).json({
              message: 'Usuario o contraseña incorrectos'
            })
          }
        })
      }
    })
    .catch((err) => {
      console.log(err)
      return res.status(500).json({
        message: 'Ocurrió un error al buscar al usuario'
      })
    })
}
