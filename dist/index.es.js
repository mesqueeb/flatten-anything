import { isArray, isPlainObject, isNumber } from 'is-what';
import { omit } from 'filter-anything';

function retrievePaths(object, path, result, untilDepth) {
    if (!isPlainObject(object) ||
        !Object.keys(object).length ||
        object.methodName === 'FieldValue.serverTimestamp') {
        if (!path)
            return object;
        result[path] = object;
        return result;
    }
    if (isNumber(untilDepth))
        untilDepth--;
    return Object.keys(object).reduce((carry, key) => {
        const pathUntilNow = path ? path + '.' : '';
        const newPath = pathUntilNow + key;
        // last iteration or not
        const extra = untilDepth === -1
            ? { [newPath]: object[key] }
            : retrievePaths(object[key], newPath, result, untilDepth);
        return Object.assign(carry, extra);
    }, {});
}
/**
 * Flattens an object from `{a: {b: {c: 'd'}}}` to `{'a.b.c': 'd'}`
 *
 * @export
 * @param {Record<string, any>} object the object to flatten
 * @param {untilDepth} [number] how deep you want to flatten. 1 for flattening only the first nested prop, and keeping deeper objects as is.
 * @returns {Record<string, any>} the flattened object
 */
function flattenObject(object, untilDepth) {
    const result = {};
    return retrievePaths(object, null, result, untilDepth);
}
/**
 * Flattens an array from `[1, ['a', ['z']], 2]` to `[1, 'a', 'z', 2]`
 *
 * @export
 * @param {any[]} array the array to flatten
 * @returns {any[]} the flattened array
 */
function flattenArray(array) {
    return array.reduce((carry, item) => {
        return isArray(item) ? [...carry, ...flattenArray(item)] : [...carry, item];
    }, []);
}
/**
 * Flattens certain props of an object.
 *
 * @export
 * @param {Record<string, any>} object the object to flatten Eg. `{a: {subA: 1}, b: {subB: 1}}`
 * @param {string[]} [props=[]] the prop names you want to flatten. Eg. `['a']` will return `{'a.subA': 1, b: {subB: 1}}`
 * @returns {Record<string, any>} the flattened object
 */
function flattenObjectProps(object, props = []) {
    const flatObject = props.reduce((carry, propPath) => {
        const firstPropKey = propPath.split('.')[0];
        const target = { [firstPropKey]: object[firstPropKey] };
        // calculate a certain depth to flatten or `null` to flatten everything
        const untilDepth = propPath.split('.').length - 1 || undefined;
        const flatPart = flattenObject(target, untilDepth);
        const flatPartFiltered = Object.entries(flatPart).reduce((carry, [key, value]) => {
            if (!key.startsWith(propPath))
                return carry;
            carry[key] = value;
            return carry;
        }, {});
        return { ...carry, ...flatPartFiltered };
    }, {});
    const omittedProps = props;
    const objectWithoutFlatProps = omit(object, omittedProps);
    return { ...objectWithoutFlatProps, ...flatObject };
}
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
function flatten(objectOrArray, untilDepth) {
    return isArray(objectOrArray)
        ? flattenArray(objectOrArray)
        : flattenObject(objectOrArray, untilDepth);
}

export { flatten, flattenArray, flattenObject, flattenObjectProps };
