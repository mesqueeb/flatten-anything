import { isPlainObject, isArray } from 'is-what'

type AnyObject = {[key: string]: any}

function retrievePaths (object: object, path: string, result: object): object {
  if (
    !isPlainObject(object) ||
    !Object.keys(object).length ||
    object.methodName === 'FieldValue.serverTimestamp'
  ) {
    if (!path) return object
    result[path] = object
    return result
  }
  return Object.keys(object).reduce((carry, key) => {
    const pathUntilNow = (path)
      ? path + '.'
      : ''
    const newPath = pathUntilNow + key
    const extra = retrievePaths(object[key], newPath, result)
    return Object.assign(carry, extra)
  }, {})
}

/**
 * Flattens an object from `{a: {b: {c: 'd'}}}` to `{'a.b.c': 'd'}`
 *
 * @export
 * @param {object} object the object to flatten
 * @returns {AnyObject} the flattened object
 */
export function flattenObject (object: object): AnyObject {
  const result = {}
  return retrievePaths(object, null, result)
}

/**
 * Flattens an array from `[1, ['a', ['z']], 2]` to `[1, 'a', 'z', 2]`
 *
 * @export
 * @param {any[]} array the array to flatten
 * @returns {any[]} the flattened array
 */
export function flattenArray (array: any[]): any[] {
  return array.reduce((carry, item) => {
    return isArray(item)
      ? [...carry, ...flattenArray(item)]
      : [...carry, item]
  }, [])
}

/**
 * Flattens an object or array.
 * Object example: `{a: {b: {c: 'd'}}}` to `{'a.b.c': 'd'}`
 * Array example: `[1, ['a', ['z']], 2]` to `[1, 'a', 'z', 2]`
 *
 * @export
 * @param {(object | any[])} objectOrArray the payload to flatten
 * @returns {(AnyObject | any[])} the flattened result
 */
export default function (objectOrArray: object | any[]): AnyObject | any[] {
  return isArray(objectOrArray)
    ? flattenArray(objectOrArray)
    : flattenObject(objectOrArray)
}
