'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var isWhat = require('is-what');

function retrievePaths(object, path, result, untilDepth) {
    if (!isWhat.isPlainObject(object) ||
        !Object.keys(object).length ||
        object.methodName === 'FieldValue.serverTimestamp') {
        if (!path)
            return object;
        result[path] = object;
        return result;
    }
    if (isWhat.isNumber(untilDepth))
        untilDepth--;
    return Object.keys(object).reduce(function (carry, key) {
        var _a;
        var pathUntilNow = (path)
            ? path + '.'
            : '';
        var newPath = pathUntilNow + key;
        // last iteration or not
        var extra = (untilDepth === -1)
            ? (_a = {}, _a[newPath] = object[key], _a) : retrievePaths(object[key], newPath, result, untilDepth);
        return Object.assign(carry, extra);
    }, {});
}
/**
 * Flattens an object from `{a: {b: {c: 'd'}}}` to `{'a.b.c': 'd'}`
 *
 * @export
 * @param {object} object the object to flatten
 * @param {untilDepth} [number] how deep you want to flatten. 1 for flattening only the first nested prop, and keeping deeper objects as is.
 * @returns {AnyObject} the flattened object
 */
function flattenObject(object, untilDepth) {
    var result = {};
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
    return array.reduce(function (carry, item) {
        return isWhat.isArray(item)
            ? carry.concat(flattenArray(item)) : carry.concat([item]);
    }, []);
}
/**
 * Flattens certain props of an object.
 *
 * @export
 * @param {object} object the object to flatten Eg. `{a: {subA: 1}, b: {subB: 1}}`
 * @param {string[]} [props=[]] the prop names you want to flatten. Eg. `['a']` will return `{'a.subA': 1, b: {subB: 1}}`
 * @returns {AnyObject} the flattened object
 */
function flattenObjectProps(object, props) {
    if (props === void 0) { props = []; }
    return Object.entries(object).reduce(function (carry, _a) {
        var _b;
        var key = _a[0], value = _a[1];
        if (props.includes(key)) {
            var flatObject = flattenObject((_b = {}, _b[key] = value, _b));
            Object.assign(carry, flatObject);
        }
        else {
            carry[key] = value;
        }
        return carry;
    }, {});
}
/**
 * Flattens an object or array.
 * Object example: `{a: {b: {c: 'd'}}}` to `{'a.b.c': 'd'}`
 * Array example: `[1, ['a', ['z']], 2]` to `[1, 'a', 'z', 2]`
 *
 * @export
 * @param {(object | any[])} objectOrArray the payload to flatten
 * @param {untilDepth} [number] how deep you want to flatten. (currently only works with objects) 1 for flattening only the first nested prop, and keeping deeper objects as is.
 * @returns {(AnyObject | any[])} the flattened result
 */
function index (objectOrArray, untilDepth) {
    return isWhat.isArray(objectOrArray)
        ? flattenArray(objectOrArray)
        : flattenObject(objectOrArray, untilDepth);
}

exports.default = index;
exports.flattenArray = flattenArray;
exports.flattenObject = flattenObject;
exports.flattenObjectProps = flattenObjectProps;
