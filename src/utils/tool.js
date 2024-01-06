import { isPlainObject } from 'lodash'

export const flattenObject = (obj) => {
  let ret = {}
  Object.keys(obj).forEach((key) => {
    if (isPlainObject(obj[key])) {
      ret = { ...ret, ...flattenObject(obj[key]) }
    } else {
      ret[key] = obj[key]
    }
  })
  return ret
}
