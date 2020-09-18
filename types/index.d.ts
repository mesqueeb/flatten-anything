/**
 * Flattens an object from `{a: {b: {c: 'd'}}}` to `{'a.b.c': 'd'}`
 *
 * @export
 * @param {Record<string, any>} object the object to flatten
 * @param {untilDepth} [number] how deep you want to flatten. 1 for flattening only the first nested prop, and keeping deeper objects as is.
 * @returns {Record<string, any>} the flattened object
 */
export declare function flattenObject(object: Record<string, any>, untilDepth?: number): Record<string, any>;
/**
 * Flattens an array from `[1, ['a', ['z']], 2]` to `[1, 'a', 'z', 2]`
 *
 * @export
 * @param {any[]} array the array to flatten
 * @returns {any[]} the flattened array
 */
export declare function flattenArray(array: any[]): any[];
/**
 * Flattens certain props of an object.
 *
 * @export
 * @param {Record<string, any>} object the object to flatten Eg. `{a: {subA: 1}, b: {subB: 1}}`
 * @param {string[]} [props=[]] the prop names you want to flatten. Eg. `['a']` will return `{'a.subA': 1, b: {subB: 1}}`
 * @returns {Record<string, any>} the flattened object
 */
export declare function flattenObjectProps(object: Record<string, any>, props?: string[]): Record<string, any>;
/**
 * Flattens an object or array.
 * Object example: `{a: {b: {c: 'd'}}}` to `{'a.b.c': 'd'}`
 * Array example: `[1, ['a', ['z']], 2]` to `[1, 'a', 'z', 2]`
 *
 * @export
 * @param {(Record<string, any> | any[])} objectOrArray the payload to flatten
 * @param {untilDepth} [number] how deep you want to flatten. (currently only works with objects) 1 for flattening only the first nested prop, and keeping deeper objects as is.
 * @returns {(Record<string, any> | any[])} the flattened result
 */
export declare function flatten(objectOrArray: Record<string, any> | any[], untilDepth?: number): Record<string, any> | any[];
