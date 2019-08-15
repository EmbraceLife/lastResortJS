Return ::: value of the first element in the array that satisfy the test provided in callback ::: otherwise, return undefined

Feature ::: callback should be a func to return a bool 

Feature ::: if callback does not return a bool or anything at all, find should return undefined.

similar methods ::: `findIndex()`, `indexOf()`, `includes()` (their details later)

syntax ::: `arr.find(callback(element[, index[, array]])[, thisArg])`

Feature ::: `find` stops passing element to callback when the first item is found 

Feature ::: and then immediate return the found value of the element

Feature ::: if none is found, return `undefined`

Feature ::: `find` will not filter out the elements with missing values

Feature ::: 3Args ::: el, idx, arr

Feature ::: thisArg ::: `this` inside callback will refer to the provided object or just `undefined`

Feature ::: the num of iterations is fixed as the length of original array ::: consequence 1 : appended element won't invoke callback; consequence 2 : existing, unvisited value changed will invoke callback; 

Note ::: find does not mutate the array does not mean callback can't

Note ::: "Elements that are deleted are still visited." is confusing. 



```Javascript
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/find#Polyfill
if (!Array.prototype.find) {
  Object.defineProperty(Array.prototype, 'find', {
    value: function(predicate) {
     // 1. Let O be ? ToObject(this value).
      if (this == null) {
        throw new TypeError('"this" is null or not defined');
      }

      var o = Object(this);

      // 2. Let len be ? ToLength(? Get(O, "length")).
      var len = o.length >>> 0;

      // 3. If IsCallable(predicate) is false, throw a TypeError exception.
      if (typeof predicate !== 'function') {
        throw new TypeError('predicate must be a function');
      }

      // 4. If thisArg was supplied, let T be thisArg; else let T be undefined.
      var thisArg = arguments[1];

      // 5. Let k be 0.
      var k = 0;

      // 6. Repeat, while k < len
      while (k < len) {
        // a. Let Pk be ! ToString(k).
        // b. Let kValue be ? Get(O, Pk).
        // c. Let testResult be ToBoolean(? Call(predicate, T, « kValue, k, O »)).
        // d. If testResult is true, return kValue.
        var kValue = o[k];
        if (predicate.call(thisArg, kValue, k, o)) {
          return kValue;
        }
        // e. Increase k by 1.
        k++;
      }

      // 7. Return undefined.
      return undefined;
    },
    configurable: true,
    writable: true
  });
}

```

https://tc39.es/ecma262/#sec-array.prototype.find
