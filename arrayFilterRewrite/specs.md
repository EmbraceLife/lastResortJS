<image src="./ECMAS2020.0.png" width=500>

In this video, I want to make sense of the source code provided by the specs. 

for now, I can write up an equivalent function by building it up from simple case to more complex case. 

However, it does not mean I understand the function as a whole, I don't think I have a holistic view of the function design logic.

I will try to explore it in this video by reading the pseudo code line by line. 

1. Now, reading the first line, the `this` refers to the array I know now, and ToObject(this value) makes sure turn `this` into an Array object, and assign it to `O`; (I assume all the functions used here are not written in JS)(In this example, I think there is no need for `ToObject` in JS right?)
2. Now, reading line 2, `LengthOfArrayLike(O)` takes an Array object and returns its length, and assigns it to `len` variable; (`Array.length` is the JS equivalence)(<a style="color: purple">**Purpose**</a>: make sure array's length is fixed no matter how it mutate afterwards)
3. Now, reading line 3: `IsCallable(callbackfn)` checks whether the callback is a function or callable or not. If it is not callable, it will throw a TypeError. (There is JS equivalence here, I will learn it later.)(<a style="color: purple">**Purpose**</a>: make sure user use callback as a function)
4. Now, reading line 4: if `thisArg` is present (meaning `Boolean(thisArg)` is true ), then assign `thisArg` to variable `T`, otherwise, assign `undefined` to `T`. (<a style="color: purple">**Purpose**</a>: prepare to use `thisArg` in both cases)
5. using `ArraySpeciesCreate ( originalArray, length )` to create a new array based on `O` but length is 0, and assign such an empty new array to `A`. (<a style="color: purple">**Purpose**</a>: prepare for the new array to be returned)
6. assing 0 to a new variable `k` (<a style="color: purple">**Purpose**</a>: k is index for the while loop below)
7. assign 0 to a new variable `to` (<a style="color: purple">**Purpose**</a>: not sure yet)
8. starting a while loop, the iteration number is `len` (<a style="color: purple">**Purpose**</a>: total iterations will be `len` times)
    - a. make index `k` a string and assign to `Pk` (<a style="color: purple">**Purpose**</a>: prepare as input for `HasProperty(O, Pk` method)
    - b. get a boolean from `HasProperty(O, Pk)` to see whether `O[Pk]` has a value or just missing, and assign the bool to `kPresent` (<a style="color: purple">**Purpose**</a>:true, means there is value at index `Pk`; false, means at index `Pk`, value is missing)
    - c. if the current element has a value (not missing), 
      - i. get the value assigned to `kPresent` using `HasProperty(O, Pk)` (JS can use `O[Pk]`)
      - ii. `Call(callbackfn, T, <3 args of callback>)` and get the returned bool assigned to `selected`
      - iii. if `selected` is true, 
        - 1. guess by the function name is to get `kValue` into empty array `A` on index `to`
        - 2. increment `to` by 1
    - d. increment `k` by 1
  9. return array `A`

<image src="./ECMAS2020.1.png">
https://tc39.es/ecma262/#sec-array.prototype.filter

Note: in filter, the line `kValue = O[k]` is a must to ensure the newArray get the same value even when callback mutates the array