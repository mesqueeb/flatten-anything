declare type AnyObject = {
    [key: string]: any;
};
/**
 * Flattens an object from {a: {b: {c: 'd'}}} to {'a.b.c': 'd'}
 *
 * @export
 * @param {object} object the object to flatten
 * @returns {AnyObject} the flattened object
 */
export default function (object: object): AnyObject;
export {};
