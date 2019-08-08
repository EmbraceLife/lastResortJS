Now, Let's see whether we can turn the summary of spec reading into features of `map`

Para1: Core features
1. `callbackfn` like that in `forEach` and `filter` has 3 args ( <a style="color: purple"><strong>feature 1</strong></a> );
2. each items in the array will invoke the callback, except for elements with missing values;  ( <a style="color: purple"><strong>feature, No.? </strong></a> )
3. must return a new array ( <a style="color: purple"><strong>feature 2</strong></a> ) from the result produced by callback invoked by elements.

Para2: thisArg
1. `thisArg` either refers to an object provided by the user, otherwise assigned as `undefined`.  ( <a style="color: purple"><strong>feature 3</strong></a> )

Para3: callback args ( <a style="color: purple"><strong>feature 1</strong></a> )
1. first arg of callback: value of the element (currentValue);
2. index of the element;
3. the object (array) traversed

para4: mutation
1. map does not mutate object/array directly;
2. but the callback can; ( <a style="color: purple"><strong>feature No? needs specificity</strong></a> )

para5: edge
1. the range of elements are fixed before first call to callback; ( <a style="color: purple"><strong>feature 4</strong></a> )
2. therefore, after the range is fixed, any appended element will not invoke callback; ( <a style="color: purple"><strong>feature 5</strong></a> )
3. if existing elements of the array are changed, their value as passed to callback will be the value at the time map visits them (in other words, existing elements' changed value may invoke callback if visited by map); ( <a style="color: purple"><strong>feature 6</strong></a> )
4. elements that are deleted after the call to map begins and before being visited are not visited (in other words, if elements deleted after array passed to `map`, but before they invoke callback, then they will not invoke callback.) ( <a style="color: purple"><strong>feature 7</strong></a> )


<image src="./description.png">

<image src="./ps.png">