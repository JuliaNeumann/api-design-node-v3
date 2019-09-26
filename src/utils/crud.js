export const getOne = model => async (req, res) => {
  return model.findOne({_id: req.params.id, createdBy: req.user._id})
    .then((doc) => {
      if (doc) {
        res.status(200);
        res.json({data: doc});
      } else {
        res.status(400);
        res.end();
      }
    });
}

export const getMany = model => async (req, res) => {}

export const createOne = model => async (req, res) => {}

export const updateOne = model => async (req, res) => {}

export const removeOne = model => async (req, res) => {}

export const crudControllers = model => ({
  removeOne: removeOne(model),
  updateOne: updateOne(model),
  getMany: getMany(model),
  getOne: getOne(model),
  createOne: createOne(model)
})
