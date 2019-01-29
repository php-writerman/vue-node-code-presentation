const updateOrCreate = async (modelClass, whereCond, data) => {
  const model = await modelClass.findOne({
    where: whereCond
  })
  if (model) {
    return model.update(data)
  }
  return modelClass.create(data)
}

const createIfNotExists = async (modelClass, data, uniqueField) => {
  if (!uniqueField) {
    throw new Error('You need to specify \'uniqueField\'')
  }
  const model = await modelClass.findOne({
    where: {
      [uniqueField]: data[uniqueField],
    },
  })
  if (model) {
    return model
  }
  return modelClass.create(data)
}

export default {
  updateOrCreate,
  createIfNotExists,
}
