import { User } from '../models/User.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

// POST /api/users/Register
export const createUser = (req, res) => {
  const { email, password } = req.body
  if (email === '' || password === '') {
    return res.status(400).send({
      message: 'Favor completar todos los campos'
    })
  }

  const bcryptSalt = parseInt(process.env.bcryptSalt)
  const hashPassword = bcrypt.hashSync(password, bcryptSalt)

  const user = new User({ ...req.body, password: hashPassword, isAdmin: false })

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

// GET /api/users/
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

// POST /api/users/login
export const logIn = (req, res) => {
  const { email, password } = req.body
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
            return res.status(500).json({
              message: 'Ocurrió un error al buscar al usuario'
            })
          } else if (result) {
            let accessToken = ''
            const name = user.name
            const lastName = user.lastName
            const phone = user.phone
            if (name === undefined || name === '' || lastName === undefined || lastName === '' || phone === undefined || phone === '') {
              accessToken = jwt.sign({ userId: user._id, isProfileCompleted: false, email }, process.env.JWT_SECRET)
            } else {
              accessToken = jwt.sign({ userId: user._id, isProfileCompleted: true, name, lastName, email, phone }, process.env.JWT_SECRET)
            }
            res.status(200).json({ accessToken })
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

// PACTH /api/users/
export const updateUser = (req, res) => {
  const userId = req.userId
  const password = req.body.password

  // Update password
  if (password !== undefined && password !== '') {
    User.findById(userId)
      .then((user) => {
        bcrypt.compare(password, user.password, (err, result) => {
          if (err) {
            return res.status(500).json({
              message: 'Ocurrión un error al comparar las contraseñas'
            })
          } else if (result) {
            const bcryptSalt = parseInt(process.env.bcryptSalt)
            const hashPassword = bcrypt.hashSync(password, bcryptSalt)
            User.findByIdAndUpdate(userId, { ...req.body, password: hashPassword }, { new: true })
              .then((user) => {
                res.status(200).json(user)
              })
              .catch((error) => {
                console.log(error)
                res.status(400)
              })
          } else {
            return res.status(401).json({
              message: 'Contraseña incorrecta'
            })
          }
        })
      })
  }

  // Update personal information
  User.findByIdAndUpdate(userId, req.body, { new: true })
    .then((user) => {
      const accessToken = jwt.sign({ userId: user._id, isProfileCompleted: true, name: user.name, lastName: user.lastName, email: user.email, phone: user.phone }, process.env.JWT_SECRET)

      res.status(200).json({ accessToken })
    })
    .catch((error) => {
      console.log(error)
      res.status(400)
    })
}
