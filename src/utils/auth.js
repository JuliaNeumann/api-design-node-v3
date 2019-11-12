import config from '../config'
import { User } from '../resources/user/user.model'
import jwt from 'jsonwebtoken'
import { removeDotSegments } from 'uri-js'

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
    return res.status(400).send({ message: 'No email or password provided' })
  } else {
    try {
      const user = await User.create({
        password: req.body.password,
        email: req.body.email
      })
      const token = newToken(user)
      return res.status(201).send({ token })
    } catch (e) {
      console.error(e)
      return res.status(400).end()
    }
  }
}

export const signin = async (req, res) => {
  if (!req.body.email || !req.body.password) {
    return res.status(400).send({ message: 'No email or password provided' })
  } else {
    const user = await User.findOne({
      email: req.body.email
    }).exec()
    if (!user) {
      return res.status(401).send({ message: 'Invalid sign in data.' })
    }
    try {
      const match = await user.checkPassword(req.body.password)
      if (!match) {
        return res.status(401).send({ message: 'Invalid sign in data.' })
      }
      const token = newToken(user)
      return res.status(201).send({ token })
    } catch (e) {
      console.error(e)
      return res.status(400).end()
    }
  }
}

export const protect = async (req, res, next) => {
  next()
}
