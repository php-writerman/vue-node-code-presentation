// see: https://medium.com/javascript-scene/reduce-composing-software-fe22f0c39a1d
export const pipe = (...fns) => x => fns.reduce((v, f) => f(v), x)

const reduceObject = (cb, obj) => Object.entries(obj).reduce(cb, {})
const allMapper = x => x
const eachMapper = (key, val) => ([key, val])

const indexAttrs = attrs => attrs.reduce((acc, cur) => ({ ...acc, [cur]: cur }), {})

const baseTransformer = filtrator => (...attributes) => data => {
  if (Array.isArray(attributes[0])) {
    attributes = attributes[0]
  }
  const indexedAttrs = indexAttrs(attributes)

  return reduceObject((acc, [field, value]) => {
    return filtrator(indexedAttrs, field)
      ? { ...acc, [field]: value }
      : acc
  }, data)
}

export const combine = pipe

export const only = baseTransformer((attributes, field) => attributes[field])
export const except = baseTransformer((attributes, field) => !attributes[field])

export const mergeWith = (mapper = allMapper) => data => (
  ({ ...data, ...mapper(data) })
)

export const mapEach = (mapper = eachMapper) => data => (
  reduceObject((acc, [field, value]) => mapper(field, value), data)
)

export const eachExcept = (...attributes) => data => data.map(except(attributes))
export const eachOnly = (...attributes) => data => data.map(only(attributes))

export const seqToObj = data => data.get()

export default {
  only,
  except,
  combine,
  mergeWith,
  mapEach,
  seqToObj
}
