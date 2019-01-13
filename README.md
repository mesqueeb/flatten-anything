# Flatten anything 🏏

```
npm i flatten-anything
```

Flatten objects and replace nested props with 'prop.subprop'. A simple and small integration.

I was looking for:

- A simple solution to flatten objects
- Only flatten plain objects and **not special class instances**!

This last one is crucial! So many libraries use custom classes that create objects with special prototypes, and such objects all break when trying to flatten them. So we gotta be careful!

flatten-anything will flatten objects and their nested properties, but only as long as they're "plain objects". As soon as a sub-prop is not a "plain object" and has a special prototype, it will stop flattening there and reference that instance "as is". ♻️

Very usable for creating a payload for **Firebase Firestore** `update` function, which only accepts flat objects! With Firestore for example `Firebase.firestore.FieldValue.delete()` does not break.

## Meet the family

- [flatten-anything 🏏](https://github.com/mesqueeb/flatten-anything)
- [merge-anything 🥡](https://github.com/mesqueeb/merge-anything)
- [filter-anything ⚔️](https://github.com/mesqueeb/filter-anything)
- [find-and-replace-anything 🎣](https://github.com/mesqueeb/find-and-replace-anything)
- [compare-anything 🛰](https://github.com/mesqueeb/compare-anything)
- [copy-anything 🎭](https://github.com/mesqueeb/copy-anything)
- [is-what 🙉](https://github.com/mesqueeb/is-what)

## Usage

```js
import flatten from 'flatten-anything'

const target = {name: 'Ho-oh', types: {fire: true, flying: true}}
flatten(target)
// returns {
//   name: 'Ho-oh',
//   types.fire: true,
//   types.flying: true
// }
```

### Example for Firestore

```js
const pokemon = {
  name: 'Charizard',
  types: {dark: true, fire: true, flying: true}
}
// we want to delete the `dark` type from this Pokemon

const payload = flatten({
  types: {dark: Firebase.firestore.FieldValue.delete()}
})
Firebase.firestore().doc('pokemon/charizard').update(payload)
```
