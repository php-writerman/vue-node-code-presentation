/**
 * Transforms every object [key: value] by cb function
 */
export const mapObject = (cb, obj) => Object.entries(obj).reduce((acc, [key, value]) => ({
  ...acc, [key]: cb(value, key)
}), {})
