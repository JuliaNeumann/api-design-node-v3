import { Router } from 'express'

const router = Router()

router
  .route('/')
  .get((req, res) => {
    res.send({ message: 'get item' })
  })
  .post((req, res) => {
    res.send({ message: 'post item' })
  })

router
  .route('/:id')
  .get((req, res) => {
    res.send({ message: 'get item by id' })
  })
  .put((req, res) => {
    res.send({ message: 'put item' })
  })
  .delete((req, res) => {
    res.send({ message: 'delete item' })
  })

export default router
