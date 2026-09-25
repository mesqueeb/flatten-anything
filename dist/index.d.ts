/**
 * Flattens an object from `{a: {b: {c: 'd'}}}` to `{'a.b.c': 'd'}`
 *
 * @param object The object to flatten
 * @param [number] How deep you want to flatten. 1 for flattening only the first nested prop, and
 *   keeping deeper objects as is.
 * @returns The flattened object
 * @export
 */
export declare function flattenObject(object: {
    [key in string]: any;
}, untilDepth?: number): {
    [key in string]: any;
};
/**
 * Flattens an array from `[1, ['a', ['z']], 2]` to `[1, 'a', 'z', 2]`
 *
 * @param array The array to flatten
 * @returns The flattened array
 * @export
 */
export declare function flattenArray(array: any[]): any[];
/**
 * Flattens certain props of an object.
 *
 * @param object The object to flatten Eg. `{a: {subA: 1}, b: {subB: 1}}`
 * @param [props=[]] The prop names you want to flatten. Eg. `['a']` will return `{'a.subA': 1, b:
 *   {subB: 1}}`. Default is `[]`
 * @returns The flattened object
 * @export
 */
export declare function flattenObjectProps(object: {
    [key in string]: any;
}, props?: string[]): {
    [key in string]: any;
};
/**
 * Flattens an object or array. Object example: `{a: {b: {c: 'd'}}}` to `{'a.b.c': 'd'}` Array
 * example: `[1, ['a', ['z']], 2]` to `[1, 'a', 'z', 2]`
 *
 * @param objectOrArray The payload to flatten
 * @param [number] How deep you want to flatten. (currently only works with objects) 1 for
 *   flattening only the first nested prop, and keeping deeper objects as is.
 * @returns The flattened result
 * @export
 */
export declare function flatten(objectOrArray: {
    [key in string]: any;
} | any[], untilDepth?: number): {
    [key in string]: any;
} | any[];
