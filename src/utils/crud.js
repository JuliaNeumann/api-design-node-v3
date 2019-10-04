export const getOne = model => async (req, res) => {
  return model
    .findOne({ _id: req.params.id, createdBy: req.user._id })
    .then(doc => {
      if (doc) {
        res.status(200)
        res.json({ data: doc })
      } else {
        res.status(400)
        res.end()
      }
    })
}

export const getMany = model => async (req, res) => {
  return model.find({ createdBy: req.user._id }).then(docs => {
    if (docs) {
      res.status(200)
      res.json({ data: docs })
    } else {
      res.status(400)
      res.end()
    }
  })
}

export const createOne = model => async (req, res) => {
  return model.create({ createdBy: req.user._id, ...req.body }).then(doc => {
    if (doc) {
      res.status(201)
      res.json({ data: doc })
    }
  })
}

export const updateOne = model => async (req, res) => {
  return model
    .findOneAndUpdate(
      { _id: req.params.id, createdBy: req.user._id },
      req.body,
      { new: true }
    )
    .then(doc => {
      if (doc) {
        res.status(200)
        res.json({ data: doc })
      } else {
        res.status(400)
        res.end()
      }
    })
}

export const removeOne = model => async (req, res) => {
  return model
    .findOneAndRemove({ _id: req.params.id, createdBy: req.user._id }, req.body)
    .then(doc => {
      if (doc) {
        res.status(200)
        res.json({ data: doc })
      } else {
        res.status(400)
        res.end()
      }
    })
}

export const crudControllers = model => ({
  removeOne: removeOne(model),
  updateOne: updateOne(model),
  getMany: getMany(model),
  getOne: getOne(model),
  createOne: createOne(model)
})
