'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var isWhat = require('is-what');

function retrievePaths(object, path, result) {
    if (!isWhat.isPlainObject(object) ||
        !Object.keys(object).length ||
        object.methodName === 'FieldValue.serverTimestamp') {
        if (!path)
            return object;
        result[path] = object;
        return result;
    }
    return Object.keys(object).reduce(function (carry, key) {
        var pathUntilNow = (path)
            ? path + '.'
            : '';
        var newPath = pathUntilNow + key;
        var extra = retrievePaths(object[key], newPath, result);
        return Object.assign(carry, extra);
    }, {});
}
/**
 * Flattens an object from `{a: {b: {c: 'd'}}}` to `{'a.b.c': 'd'}`
 *
 * @export
 * @param {object} object the object to flatten
 * @returns {AnyObject} the flattened object
 */
function flattenObject(object) {
    var result = {};
    return retrievePaths(object, null, result);
}
/**
 * Flattens an array from `[1, ['a', ['z']], 2]` to `[1, 'a', 'z', 2]`
 *
 * @export
 * @param {any[]} array the array to flatten
 * @returns {any[]} the flattened array
 */
function flattenArray(array) {
    return array.reduce(function (carry, item) {
        return isWhat.isArray(item)
            ? carry.concat(flattenArray(item)) : carry.concat([item]);
    }, []);
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
function index (objectOrArray) {
    return isWhat.isArray(objectOrArray)
        ? flattenArray(objectOrArray)
        : flattenObject(objectOrArray);
}

exports.default = index;
exports.flattenArray = flattenArray;
exports.flattenObject = flattenObject;
