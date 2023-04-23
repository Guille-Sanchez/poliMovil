import { PoliMovilUser } from '../models/poliMovilUser.js'

export const createPoliMovilUser = (req, res) => {
  const { username, email, password } = req.body
  if (username === '' || email === '' || password === '') {
    res.status(400).send({
      message: 'Favor completar todos los campos'
    })
    return
  }

  const user = new PoliMovilUser({
    username,
    email,
    password
  })

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

export const getPoliMovilUsers = (req, res) => {
  PoliMovilUser.find()
    .then((users) => {
      res.status(200).json(users)
    })
    .catch((error) => {
      res.status(400).send({
        message: error.message
      })
    })
}
