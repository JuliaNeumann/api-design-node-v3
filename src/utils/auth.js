import config from '../config'
import { User } from '../resources/user/user.model'
import jwt from 'jsonwebtoken'

export const newToken = user => {
  return jwt.sign({ id: user.id }, config.secrets.jwt, {
    expiresIn: config.secrets.jwtExp
  })
}

export const verifyToken = token =>
  new Promise((resolve, reject) => {
    jwt.verify(token, config.secrets.jwt, (err, payload) => {
      if (err) return reject(err)
      resolve(payload)
    })
  })

export const signup = async (req, res) => {
  if (!req.body.email || !req.body.password) {
    res.status(400).send({ message: 'No email or password provided' })
  } else {
    const user = await User.create({
      password: req.body.password,
      email: req.body.email
    })
    const token = newToken(user)
    res.status(201).send({ token })
  }
}

export const signin = async (req, res) => { }

export const protect = async (req, res, next) => {
  next()
}
