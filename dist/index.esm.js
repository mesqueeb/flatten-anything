import { isArray, isPlainObject, isNumber } from 'is-what';

/*! *****************************************************************************
Copyright (c) Microsoft Corporation. All rights reserved.
Licensed under the Apache License, Version 2.0 (the "License"); you may not use
this file except in compliance with the License. You may obtain a copy of the
License at http://www.apache.org/licenses/LICENSE-2.0

THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
MERCHANTABLITY OR NON-INFRINGEMENT.

See the Apache Version 2.0 License for specific language governing permissions
and limitations under the License.
***************************************************************************** */

var __assign = function() {
    __assign = Object.assign || function __assign(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};

function __read(o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
}

function __spread() {
    for (var ar = [], i = 0; i < arguments.length; i++)
        ar = ar.concat(__read(arguments[i]));
    return ar;
}

// import filter from 'filter-anything'
var filter = require('filter-anything');
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
        return isArray(item)
            ? __spread(carry, flattenArray(item)) : __spread(carry, [item]);
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
    var flatObject = props.reduce(function (carry, propPath) {
        var _a;
        var firstPropKey = propPath.split('.')[0];
        var target = (_a = {}, _a[firstPropKey] = object[firstPropKey], _a);
        // calculate a certain depth to flatten or `null` to flatten everything
        var untilDepth = propPath.split('.').length - 1 || null;
        var flatPart = flattenObject(target, untilDepth);
        var flatPartFiltered = Object.entries(flatPart)
            .reduce(function (carry, _a) {
            var _b = __read(_a, 2), key = _b[0], value = _b[1];
            if (!key.startsWith(propPath))
                return carry;
            carry[key] = value;
            return carry;
        }, {});
        return __assign({}, carry, flatPartFiltered);
    }, {});
    var guard = props;
    var objectWithoutFlatProps = filter(object, [], guard);
    return __assign({}, objectWithoutFlatProps, flatObject);
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
    return isArray(objectOrArray)
        ? flattenArray(objectOrArray)
        : flattenObject(objectOrArray, untilDepth);
}

export default index;
export { flattenArray, flattenObject, flattenObjectProps };
