# PJS by Watch and Code

<details><summary>Most used links</summary>

- [course notes github](https://github.com/EmbraceLife/learn-with-WatchAndCode#pjs-by-watch-and-code)
- [slack channel](https://app.slack.com/client/T1FH6NQ2W/C2856JSFM/user_profile/ULLTGR9MW)
- [facebook group](https://www.facebook.com/groups/514043678767094/events/)

</details>


<details><summary>Intro Section</summary>


## Daily Reminder

<details><summary>Good Question Asker</summary>

### Extremely Important Career Skill!

- How-to Ask Good Questions [goto](https://medium.com/@gordon_zhu/how-to-be-great-at-asking-questions-e37be04d0603)
- Ask with a template [goto](https://github.com/gordonmzhu/questions/issues/new?template=Custom.md)

</details>

<details><summary>PJS video links</summary>

### PJS videos

- PJS [v1](https://watchandcode.com/courses/60264/lectures/1056227) and PJS [v2](https://watchandcode.com/courses/rough-drafts/lectures/6183526)

</details>

## How to make the most out of it?

<details><summary>how-to</summary>

- Watch more than once
- Dissection of a complex app into multiple versions 
- Dissect each version into multiple steps
- Rebuild each step, each version myself
- Note down my improvements

</details>



## Coding towards a complex and fancy App

<details><summary>TodoList: Base of All Apps</summary>

### why TodoList is the core of all fancy Apps in the world?

- think of twitter, facebook, slack, gmail, medium, ....
- think of games, an actor, appearance, action ...
- the essence is the same
  - create an object to store data or info
  - do something with the object
  - display the changes
- the difference is how fancy or complex each part can be for different usages

</details>


<details><summary>App demythified</summary>

### what is an App?

- a very complex object

</details>

<details><summary>Object demythified</summary>


### what is an object?

- a combination of primitives, array, functions

</details>

<details><summary>How-to dissect TodoList app</summary>

### how to build your App (TodoList) from zero?

- build 11 (Gordon demonstrated) or even more versions from zero toward fancy
- versions level up as skills and features increase

</details>
</details> 

<!-- Intro Section end  ---------------------------------------------------------->

# Why Version Evolution Super Important?

<details><summary>Version Important Section</summary>

<details><summary>Why more versions the merrier</summary>

## Why more versions the merrier

Why so many versions? why necessary?
- Break a complex app into manageable blocks of pieces 
- Let requirements evolve gradually
- Let skills progress step by step
- complexity builds up as version levels up

</details>


<details><summary>Essence of App</summary>

## The essence of an app (any version)
- App should have a place to **store** data
- App should be able to **act** on the data
- App should be able to **display** the changes of data

</details>


<details><summary>Essence of TodoList</summary>

## The essence of a TodoList app (any version)

### Store
- app should have a place to store all todos
### Act
- app should be able to add todos
- app should be able to edit/change todos
- app should be able to remove todos
### Display
- app should be able to display todos

</details>


<details><summary>Control Fancy-Urge</summary>

## Control the urge to be fancy

- fancy, can be unnecessarily time consuming and burdensome to the spirit at early stage
- later versions can help you go as fancy as your imagination
- version goal => precise goal description, manageable, tight and clean

</details>

</details>
<!-- Version Important Section end ------------------------------------------------------->

# Constructing Version 1

<details><summary>Version 1 Construction</summary>

<details><summary>Version 1 Strategy</summary>

## What is the approach in version 1?

### Storing data
- use an `array` of `primitive` (`string`, `number`, ...) to store

### Acting on data
- use `built-in` functions to act on data
- use `array.push` to add
- use `=` assign to edit
- use `array.splice` to delete

### Displaying data
- use `console.log` to display data

</details>


<details><summary>Coding Steps</summary>

## coding steps

- step 1: to be able to store todos (text/`string`) [goto](./todos-v1/reqmt1.html)
- step 2: to be able to display todos (`console`) [goto](./todos-v1/reqmt1.html)
- step 3: to be able to add a todo (`array.push`) [goto](./todos-v1/reqmt3.html)
- step 4: to be able to edit a todo (`assign = `) [goto](./todos-v1/reqmt4.html)
- step 5: to be able to add a remove (`array.splice`) [goto](./todos-v1/reqmt5.html)

</details>
</details>
<!-- Version 1 Construction end ---------------------------------------------------- -->

# Constructing Version 2

<details><summary>Version 2 Construction</summary>

<details><summary>Version 2 Strategy</summary>

## How to progress on version 2

<details><summary>Problem: human unfriendly</summary>


### Problem: human unfriendly
Not even programmer friendly
- It feels Version 1 is directly speaking to machine alone
- and many low level details to remember

Examples to illustrate
- `todos = ['item1', 'item2', 'item3]` => creating and holding data
- `array.push(todo)` => add data
- `array.splice(position)` => delete data
- `todos[position] = 'changeItem'` => edit data
- `console.log(todo)` => to display

</details>

<details><summary>Solution: Function</summary>


### Solution: Function

How to make code into **more readable and usable commands**

- hide low level codes under the command name
- preset low level arguments to free you programmer from remembering all of them
- preset function internal comment or output display to enhance memory of what this func suppose to do

Introduction of functions

- think of a readable command name, `displayTodos()`
- whether user inputs are required, `addTodos(todoText)`
- wrap low level codes inside function body `{}`

Applying `function` to version 2

- It's easier to use a command `displayTodos()` to display todos
- It's easier to use a command `addTodos()` to add todos
- It's easier to use a command `editTodos()` to edit todos
- It's easier to use a command `deleteTodos()` to delete todos

</details>
</details>
<!-- Version 2 Strategy end --------------------------------- -->


<details><summary>Coding steps</summary>

## Coding steps

- step 1: use `todos` array to store many todos
- step 2: use `displayTodos()` to wrap codes like `console.log` [goto](./todos-v2/reqmt1.html)
- step 3: use `addTodos(todoText)` to wrap codes like `array.push(todoText)`  [goto](./todos-v2/reqmt2.html)
- step 4: use `editTodos(position, todoText)` to wrap codes for editting [goto](./todos-v2/reqmt3.html)
- step 5: use `deleteTodos(position)` to wrap codes for removing a todo [goto](./todos-v2/reqmt4.html)
- interlude: scoping effect on variable inside and outside functions [goto](./todos-v2/interlude-scope-func-var.html)

</details>
</details>
<!-- Version 2 Construction end---------------------------------------------------- -->

# Constructing Version 3

<details><summary>Version 3 Construction</summary>

<details><summary>Version 3: (Object) build a local, organised world</summary>

## Version 3: (Object) build a local, organised world

<details><summary>Problem: global Universe is a mess</summary>


### Problem: global Universe is a mess

Everything is scattered around, lives equally in global scope! 

- data array `todos` => global
- `displayTodos` => global
- `addTodo` => global
- `changeTodo` => global
- `deleteTod` => global

Everything is unorganized, and hard to find
- global scope is the universe
- todoList app's data and functions are buried among everything else
- hard to search/find app's data/funcs from the global universe

</details>

<details><summary>Solution: Object</summary>


### Solution: Object

Object => Store app's data/funcs into its own/local world

- we call app's local world name `todoList` to access everything inside the app world
- you can access app's data with `todoList.todos`
- you can access app's funcs with `todoList.displayTodos`, etc.

How to build an object/local world?

- think of a readable world name, `todoList`
- store app data inside `todoList`
- store app functions inside `todoList`
- example:
```javascript 
let todoList = {
  data: ['todo1'], 
  func1: function(){ // anoynomous func
    console.log(this.data) // this => todoList
  } 
}
```

</details>
</details>
<!-- Version 2 Strategy end --------------------------------- -->


<details><summary>Coding steps</summary>

## Coding steps

- how to create an object `todoList` with data `todos`[goto](./todos-v3/reqmt1.html)
- how to add func/method `displayTodos` to `todoList`[goto](./todos-v3/reqmt2.html) 
- how to add func/method `addTodos` to `todoList` [goto](./todos-v3/reqmt3.html)
- how to add func/method `editTodos` to `todoList` [goto](./todos-v3/reqmt4.html)
- how to add func/method `deleteTodos` to `todoList` [goto]()


</details>
</details>
<!-- Version 2 Construction end---------------------------------------------------- -->


# Constructing Version 4

<details><summary>Version 4 Construction</summary>

<details><summary>Version 4: Make each todo as a complex object</summary>

## Version 4: make each todo as a complex object

<details><summary>Problem: data is too simple to be realistic</summary>


### Problem: data is usually complext object too

- So far `todos` is an array of strings, too simple and limited
- we want each `todo` to be more dynamic/realistic: string, number, **boolean** ...
- so we want `todos` to be an array of todos/objects
- **Practically**, we don't provide `todos` beforehand, we add todo along the way
  - it means at first `todos` is empty array `[]`, then `addTodo` add object `todo` onto it
- Therefore, functions/methods need to adjust to the changes above
- Additionally, in the real world, **a toggle button** is often present and necessary

</details>

<details><summary>Solution: todos as array of objects</summary>


### Solution: todos as array of objects

- make each `todo` an object
- besides `string`, `true/false` is usually present in the real world

```Javascript
let todo1 = {
  todoText: "todo1",
  completed: false
}
```

- adjust methods accordingly, see coding steps
- a toggle method should be added where possible


</details>
</details>
<!-- Version 2 Strategy end --------------------------------- -->


<details><summary>Coding steps</summary>

## Coding steps

- how to make `todoList.todos` an empty array of objects. [goto](./todos-v4/reqmt1.html)
- how to adjust func/method `addTodo` add a todo object onto `todoList` array [goto](./todos-v4/reqmt2.html) 
- how to adjust func/method `changeTodos` to change a todo's `todoText` property [goto](./todos-v4/reqmt3.html)
- how to use `toggleCompleted` to flip a todo's `completed` property [goto](./todos-v4/reqmt4.html)



</details>
</details>
<!-- Version 4 Construction end---------------------------------------------------- -->



# Constructing Version 5

<details><summary>Version 5 Construction</summary>

<details><summary>Version 5: (for-loop & if-else) Examine array of complex objects and act accordingly</summary>

## Version 5: (for-loop & if-else) Examine complex array of objects and act accordingly

<details><summary>Problem: how to display an array of complex objects</summary>


### Problem: how to display an array of complex objects

- data or `todos` is array of multiple objects
- we often need to loop through and check on each one of them
- and then act differently accroding to different situations


</details>

<details><summary>Solution: for loop and if else</summary>


### Solution: todos as array of objects

- use `for` loop to go through every todo
- use `if else` to act on different conditions

```Javascript
for (i = 0; i < todos.length; i++) {

}

if (condition) {

} else if () {

} else {

}
```

</details>
</details>
<!-- Version 5 Strategy end --------------------------------- -->


<details><summary>Coding steps</summary>

## Coding steps

- how to display a message if no todo exist in the array [goto](./todos-v5/reqmt1.html) 
- how to display each todo's `todoText` [goto](./todos-v5/reqmt2.html)
- how to display each todo's `completed` along with `todoText` [goto](./todos-v4/reqmt3.html)

</details>
</details>
<!-- Version 5 Construction end---------------------------------------------------- -->


# Constructing Version 6

<details><summary>Version 6 Construction</summary>

<details><summary>Version 6: Design a complex feature</summary>

## Version 6: How to think when design a complex feature

<details><summary>Problem: how to think and tackle a complex feature</summary>


### Problem: how to think and tackle a complex feature: `toggleAll`

What is `toggleAll` feature?
- if all todos are false, toggle them all true
- if all todos are true, toggle them all false
- if some are false/true, toggle them all true

How to design the code more efficiently to achieve this feature?

</details>

<details><summary>Solution: conditions optimization </summary>


### Solution: optimize 3 conditions into 2 conditions

Design code more efficiently to achieve this feature
- if all todos are true, toggle them all false
- otherwise, toggle them all true (covering two conditions automatically)
  - if all todos are false, toggle them all true
  - if some of todos are false/true, toggle them all true
- two steps/conditions here are better than three steps/conditions above


</details>
</details>
<!-- Version 6 Strategy end --------------------------------- -->


<details><summary>Coding steps</summary>

## Coding steps

- find out how many todos are completed [goto](./todos-v6/reqmt1.html)
- when all todos are true, turn them all false [goto](./todos-v6/reqmt2.html) 
- otherwise, turn them all true [goto](./todos-v6/reqmt3.html)

</details>
</details>
<!-- Version 6 Construction end---------------------------------------------------- -->


# Comparison between primitives and object 

<details><summary>Object comparison</summary>

<details><summary>Problem: confusion on object comparison</summary>

## Why objects with same properties aren't equal?

```Javascript
{} === {}; 
[1,2,3] === [1,2,3]
```

</details>


<details><summary>Compare Primitives</summary>

## Why Primitives can be compared?

- compare values of primitives
- primitive variables store values of primitives
- primitives or variables of primitives can be compared naturally

</details>

<details><summary>Compare Objects</summary>

## Why objects can't be compared directly?

- compare memory addresses of objects
- regardless whether their contents on the address are the same or not
- object variables store addresses rather than object properties/values
- objects or variables of objects can't be compared naturally 
  - naturally we humans are comparing primitive values or property values
  - but objects comparison compares addresses

**when we compare objects, we actually need to compare their property values**

</details>
</details>
<!-- end of comparison between primitives and objects -->


# Constructing Version 7

<details><summary>Version 7 Construction</summary>

<details><summary>Version 7: leave console to UI</summary>

## Version 7: How to make the first step leaving console to UI

<details><summary>Problem: normal users won't use console for app</summary>


### Problem: normal users won't use console for app

How to move app from console to UI(webpage)?
- we want to see the display of todos on webpage rather than console
- we want to click a button to run any of the methods 

</details>

<details><summary>Solution: DOM</summary>


### Solution: DOM

- DOM: Document Object Model
- Browser turn HTML into object tree
- each tag in the html is a node/object on the tree to be manipulated


</details>
</details>
<!-- Version 6 Strategy end --------------------------------- -->


<details><summary>Coding steps</summary>

## Coding steps

- Create two buttons: displayTodos and toggleAll [goto](./todos-v7/reqmt1.html)
- when click displayTodosButton and run `todoList.displayTodos()` ( by default in the console) [goto](./todos-v7/reqmt2.html) 
- otherwise, turn them all true [goto](./todos-v6/reqmt3.html)

Note: the aware the order between javascript code and html code!

</details>
</details>
<!-- Version 6 Construction end---------------------------------------------------- -->


# Constructing Version 8

<details><summary>Version 8 Construction</summary>

<details><summary>Version 8: refactory</summary>

## Version 8: moving all but displayTodos to UI while refactory

<details><summary>Problem: how to move all methods onto UI and keep code clean and readable</summary>


### Problem: how to move all methods onto UI and keep code clean and readable

Which option is more appropriate and make code readable and clean?
- `<button onclick=""></button>` vs `button.addEventListener("click", function(){})`
- according to the specific usage and needs at the time


How to add user input through webpage instead from console?
- `<input id="" type="text">`

Why create a new object `handlers`?
- why not just use `todoList` methods directly?
- nice organization and make code clean, appropriately separated and readable
- make sure no codes left in the messy universe

Why to group tag objects on webpage?
- for nice orgnaization
- using `div`

</details>
</details>
<!-- Version 6 Strategy end --------------------------------- -->


<details><summary>Coding steps</summary>

## Coding steps

- refactor `displayTodosButton` and `toggleAllbutton` with `onclick` and `handlers` [goto](./todos-v8/reqmt1.html)
- add input tag and addTodo button to the webpage [goto](./todos-v8/reqmt2.html) 
- add changeTodo button and bind the method [goto](./todos-v8/reqmt3.html)
- add deleteTodo button and bind the method [goto](./todos-v8/reqmt4.html)
- add toggleCompleted button and bind the method [goto](./todos-v8/reqmt5.html)

</details>
</details>
<!-- Version 6 Construction end---------------------------------------------------- -->


# Constructing Version 9

<details><summary>Version 9 Construction</summary>

<details><summary>Version 9: insert tags from Javascript into webpage</summary>

## Version 9: allow JS to dynamically change webpage skeleton

how to move `displayTodos()` entirely from console to webpage

<details><summary>Problem: how to insert li tags from script to webpage</summary>


### Problem: how to create li from script and update it

How to create a li tag from script?
- `let todoLi = document.createElement('li')`

How to access the existing ul in html?
- `let todoUl = document.querySelector('ul')`

How to add/create li tag onto existing ul tag?
- `todoUl.appendChild(todoLi)`

Why create a `view` object parallel to `todoList` and `handlers`?
- display todos functions can be complex
- use a local world to organise the codes 
- todos are stored inside `todoList`, `view.displayTodos` is only for displaying

How to clean up the code for `displayTodos` onto the console?
- code in `handlers`
- code in `todoList`
- code in html

</details>
</details>
<!-- Version 6 Strategy end --------------------------------- -->


<details><summary>Coding steps</summary>

## Coding steps

- how to insert li tag from script to an existing ul tag [goto](./todos-v9/reqmt1.html)
- how to insert li for every todo in the todos [goto](./todos-v9/reqmt2.html) 
- add `todoText` onto each li tag to display [goto](./todos-v9/reqmt3.html)
- add `()` or `(x)` for completion of todos [goto](./todos-v9/reqmt4.html)
- make `view.displayTodos` automation when other buttons click, and clean up displayTodos for the console [goto](./todos-v9/reqmt5.html)

</details>
</details>
<!-- Version 6 Construction end---------------------------------------------------- -->


# functions inside functions 

<details><summary>High order funcs vs Callback funcs</summary>

`runWithDebugger(func)` [goto](./highOrderCallbackFuncs/example1.html)

`setTimeOut(func, 5000)` [goto](./highOrderCallbackFuncs/example2.html)

`array.forEach(func)` and `myForEach(myArray, myFunc)` [goto](./highOrderCallbackFuncs/example3.html)

`addEventListener('click', function(){});` [goto](./highOrderCallbackFuncs/example4.html)

</details>


# Constructing Version 10

<details><summary>Version 10 Construction</summary>

<details><summary>Version 10: Improve UI - add delete button to each li</summary>

## Version 10: Improve UI - add delete button to each li

<details><summary>Problem: how to insert li tags from script to webpage</summary>


### Problem: how to create li from script and update it

why write `createDeleteButton` a separate method in view object?
- prevent `view.displayTodos` to be too long
- easy to call and use `view.createDeleteButton` inside `view.displayTodos`

why put todoUl.addEventListener block of code under view object?
- leaving it in the messy universe is bad
- by nature, it is closer to view's domain/jurisdiction

What is event delegation?
- see requirement html for detailed example [goto](./todos-v10/reqmt5.html)

</details>
</details>
<!-- Version 6 Strategy end --------------------------------- -->


<details><summary>Coding steps</summary>

## Coding steps

- how to create a delete button [goto](./todos-v10/reqmt1.html)
- how to add a delete button to each li tag [goto](./todos-v10/reqmt2.html) 
- how to create an id for each li tag [goto](./todos-v10/reqmt3.html)
- how can delete button have access to li tag id [goto](./todos-v10/reqmt4.html)
- click delete button to udpate the dom [goto](./todos-v10/reqmt5.html)
- clean up and review on event delegation [goto](./todos-v10/reqmt6.thml)

</details>
</details>
<!-- Version 10 Construction end---------------------------------------------------- -->


# Constructing Version 11

<details><summary>Version 11 Construction</summary>

<details><summary>Version 11: replace for loop with forEach</summary>

## Version 11: replace for loop with forEach

<details><summary>Problem: how to replace for loop with forEach</summary>


### Problem: how to replace for loop with forEach

How to understand the relation between for-loop and forEach?
- forEach wraps the looping code of for-loop
- forEach wraps up so that you only need to focus on the callback func to deal with each array element

How to use `forEach` parameters `idx/position` and `this`?
- how and when to use `idx`?
- how and when to use `this`?

</details>
</details>
<!-- Version 6 Strategy end --------------------------------- -->


<details><summary>Coding steps</summary>

## Coding steps

- how to replace the first for-loop inside `toggleAll` in `todoList` [goto](./todos-v11/reqmt1.html)
- how to replace the second+third for-loop inside `toggleAll` in `todoList` [goto](./todos-v11/reqmt2.html)
- how to turn if-else + 2 forEach into 1 forEach with if-else, watch out the usage of this in deeper block of code [goto](./todos-v11/reqmt3.html)
- note: the codes above share [the same video](https://watchandcode.com/courses/60264/lectures/1181250)
- how to bring `this` todoList into lower code block like `forEach` block [goto](./todos-v11/reqmt4.html)
- how to replace `view.displayTodos`'s for-loop using parameter `idx/position` and `this` [goto](./todos-v11/reqmt5.html)

</details>
</details>
<!-- Version 10 Construction end---------------------------------------------------- -->



# Understanding this

<details><summary>the tricks of `this`</summary>

how to use the `this` cheatsheet [goto](https://github.com/gordonmzhu/cheatsheet-js)

case 1: inside or outside a function
`this` => window object

case 2: when `this` is called inside a method
`this` => the method's object

case 3: when `this` is used inside a constructor function
`this` => the constructor function itself
```Javascript
function Person(name) {
  // this = {};
  this.name = name;
  // return this;

new Person('gordon');
}
```


case 4: how bind, apply, call can force `this` to be anything

```Javascript
function logThis(){ 
  console.log(this); // this refers to window
  }

// how bind differ from apply and call
logThis.bind({name:'gordon'})(); // now this refers to {name: 'gordon'}
logThis.apply({name:'gordon'}); // directly return the same result
logThis.call({name:'gordon'});// directly return the same result


// how apply differ from call
function logThis(greet, name){ 
  console.log(greet, ', this is', name);
  console.log(this); // this refers to window
  }

logThis.bind({name:'gordon'}, 'hi', 'john')();
logThis.apply({name:'gordon'}, ['hi', 'john']);
logThis.call({name:'gordon'}, 'hi', 'john');

// `this` is bind to be something once, can't be bind to another thing
var boundOnce = logThis.bind({name: 'The first time is forever'});

// These attempts to change `this` are futile.
boundOnce.bind({name: 'why even try?'})();
boundOnce.apply({name: 'why even try?'});
boundOnce.call({name: 'why even try?'});
```

case 5: how callback func behaves defined inside higher order functions
</details>
