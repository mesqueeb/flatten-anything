'use strict';

const isWhat = require('is-what');
const filterAnything = require('filter-anything');

function retrievePaths(object, path, result, untilDepth) {
  if (!isWhat.isPlainObject(object) || !Object.keys(object).length || object.methodName === "FieldValue.serverTimestamp") {
    if (!path)
      return object;
    result[path] = object;
    return result;
  }
  if (isWhat.isNumber(untilDepth))
    untilDepth--;
  return Object.keys(object).reduce((carry, key) => {
    const pathUntilNow = path ? path + "." : "";
    const newPath = pathUntilNow + key;
    const extra = untilDepth === -1 ? { [newPath]: object[key] } : retrievePaths(object[key], newPath, result, untilDepth);
    return Object.assign(carry, extra);
  }, {});
}
function flattenObject(object, untilDepth) {
  const result = {};
  return retrievePaths(object, null, result, untilDepth);
}
function flattenArray(array) {
  return array.reduce((carry, item) => {
    return isWhat.isArray(item) ? [...carry, ...flattenArray(item)] : [...carry, item];
  }, []);
}
function flattenObjectProps(object, props = []) {
  const flatObject = props.reduce((carry, propPath) => {
    const firstPropKey = propPath.split(".")[0];
    const target = { [firstPropKey]: object[firstPropKey] };
    const untilDepth = propPath.split(".").length - 1 || void 0;
    const flatPart = flattenObject(target, untilDepth);
    const flatPartFiltered = Object.entries(flatPart).reduce((carry2, [key, value]) => {
      if (!key.startsWith(propPath))
        return carry2;
      carry2[key] = value;
      return carry2;
    }, {});
    return { ...carry, ...flatPartFiltered };
  }, {});
  const omittedProps = props;
  const objectWithoutFlatProps = filterAnything.omit(object, omittedProps);
  return { ...objectWithoutFlatProps, ...flatObject };
}
function flatten(objectOrArray, untilDepth) {
  return isWhat.isArray(objectOrArray) ? flattenArray(objectOrArray) : flattenObject(objectOrArray, untilDepth);
}

exports.flatten = flatten;
exports.flattenArray = flattenArray;
exports.flattenObject = flattenObject;
exports.flattenObjectProps = flattenObjectProps;
