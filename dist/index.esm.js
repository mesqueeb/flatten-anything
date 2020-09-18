import { isArray, isPlainObject, isNumber } from 'is-what';
import { omit } from 'filter-anything';

/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
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
        var pathUntilNow = path ? path + '.' : '';
        var newPath = pathUntilNow + key;
        // last iteration or not
        var extra = untilDepth === -1
            ? (_a = {}, _a[newPath] = object[key], _a) : retrievePaths(object[key], newPath, result, untilDepth);
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
        return isArray(item) ? __spread(carry, flattenArray(item)) : __spread(carry, [item]);
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
function flattenObjectProps(object, props) {
    if (props === void 0) { props = []; }
    var flatObject = props.reduce(function (carry, propPath) {
        var _a;
        var firstPropKey = propPath.split('.')[0];
        var target = (_a = {}, _a[firstPropKey] = object[firstPropKey], _a);
        // calculate a certain depth to flatten or `null` to flatten everything
        var untilDepth = propPath.split('.').length - 1 || null;
        var flatPart = flattenObject(target, untilDepth);
        var flatPartFiltered = Object.entries(flatPart).reduce(function (carry, _a) {
            var _b = __read(_a, 2), key = _b[0], value = _b[1];
            if (!key.startsWith(propPath))
                return carry;
            carry[key] = value;
            return carry;
        }, {});
        return __assign(__assign({}, carry), flatPartFiltered);
    }, {});
    var omittedProps = props;
    var objectWithoutFlatProps = omit(object, omittedProps);
    return __assign(__assign({}, objectWithoutFlatProps), flatObject);
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
