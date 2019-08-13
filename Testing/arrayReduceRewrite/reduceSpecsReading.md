Let's turn this summary into a list of features to be tested.

Now, `reduce` has two args, `callbackfn` and `initialValue`(optional).

para 1
- `callbackfn` has 4 args
- each element in the array will invoke the callback in ascending order

para 2: 4 args of callback (<span style="color:purple"><strong>Feature 1</strong></span>: from callback, four values/args can be accessible)
- callback arg1: `previousValue`
  - value from the previous call to `callbackfn` (the result of callback from previous iteration)
  - (I assume that the result from passing an element to  the callback will be used as `previousValue` passed to callback in another iteration )
- callback arg2: `currentValue`
- callback arg3: `currentIndex`
- callback arg4: the object being traversed

para 2: values for `previousValue` and `currentValue` (<span style="color:purple"><strong>Feature 2</strong></span>: if optional arg is given, previousValue and currentValue will be certain values; if not given, other values. It can be easily tested.)
- if `initialValue` is provided
  - `previousValue` === `initialValue`
  - `currentValue` === the first value in the array
- if no `initialValue` provided
  - `previousValue` === the first value in the array
  - `currentValue` === the second value in the array

para 2: TypeError (<span style="color:purple"><strong>Feature 3</strong></span>: empty array without optional arg will trigger type error. Easy test.)
- if the array has no elements and `initialValue` is not provided
- then throw a type error

para 3: mutate array
- `reduce` does not mutate the array directly
- but `callbackfn` may mutate the array

para 4

- the range (total number) of elements processed by `reduce` is set before the first call to `callbackfn`(<span style="color:purple"><strong>Feature 4</strong></span>: if elemented deleted or added during callback, the total iteration number won't be affected)
- elements that are appended to the array after the call to reduce begins will not be visited by `callbackfn`. (<span style="color:purple"><strong>Feature 5</strong></span>: the appended elements through callback won't invoke callback. But What about appended elements when existing element shifted???)
- if existing elemnts are changed, their value as passed to `callbackfn` will be the value at the time `reduce` visits them (<span style="color:purple"><strong>Feature 6</strong></span>: if next element's value changed now, in the next iteration the changed value will be passed to callback)
- elements that are deleted after the call to reduce begins and before being visited are not visited (<span style="color:purple"><strong>Feature 7</strong></span>: elements deleted by callback before being passed to callback will not be visited by callback.)

Notice: the description does not talk about what to return from `reduce`. Let's check with docs.

The `reduce()` method executes a reducer function (that you provide) on each element of the array, resulting in a single output value. (<span style="color:purple"><strong>Feature 0</strong></span>: test on the output, what if there is no return in callback design.) 

<image src="./reduce01.png">

Now, Let's read the pseudo source code.
1. turn this (array) into an object. We can try this...
2. get the length of the array. We can try 
3. make sure callbackfn is a function otherwise throw a TypeError. (be careful the simple typo error)
4. is easy, similar to the above line
5. assign 0 to `k` as index
6. create a variable named `accumulator` as `undefined`
7. if `initialValue` is present, set `accumulator` to the value of `initialValue` (accumulator === pre in my code)
8. else 
  a. var kPresent = false;
  b. while (kPresent === false && k < len) 
    i. var Pk = String(k);
    ii. kPresent = O.hasOwnProperty(Pk);
    iii. if kPresent === true
      1. accumulator = O[Pk]
    iv. k++;
  c. if kPresent === false, throw a type error (this is when array is empty and initialValue is not present, we have an error)
9. while (k < len)
  a. var Pk = String(k);
  b. var kPresent = O.hasOwnProperty(Pk);
  c. if (kPresent)
    i. var kValue = O[Pk];
    ii. accumulator = callbackfn.call(undefined, pre, kValue, k, O)
  d. k++
10. return accumulator
(This way of writing code seems unnecessarily complex )


  

  



<image src="./reduce02.png">


<image src="./reduce03.png">
