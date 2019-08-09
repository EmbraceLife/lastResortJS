Now, `reduce` has two args, `callbackfn` and `initialValue`. (start to differ from forEach and filter, map a lot)

para 1
- `callbackfn` has 4 args
- each element in the array will invoke the callback in ascending order

para 2: 4 args of callback
- callback arg1: `previousValue`
  - value from the previous call to `callbackfn`
- callback arg2: `currentValue`
- callback arg3: `currentIndex`
- callback arg4: the object being traversed

para 2: values for `previousValue` and `currentValue`
- if `initialValue` is provided
  - `previousValue` === `initialValue`
  - `currentValue` === the first value in the array
- if no `initialValue` provided
  - `previousValue` === the first value in the array
  - `currentValue` === the second value in the array

para 2: TypeError
- if the array has no elements and `initialValue` is not provided
- then throw a type error

<image src="./reduce01.png">


<image src="./reduce02.png">


<image src="./reduce03.png">
