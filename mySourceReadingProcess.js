/* 
My steps of source reading of TodoMVC

	folding the code and skimming through the lib to get the overall Structure
		1. jQuery(func($){...}) : build this app/demo based on jQuery
		2. Handlebars.registerHelper(name, func(...){...}) : add a func to helpers
		3. two keys constants : enter key, escape key
		4. util object : provide helper methods
		5. App object : to provide app's functionalities/features
		6. run App.init() when import this lib or when start this app
	
	fold back and forth and skimming through util object to guess the basic idea of each method
		1. util.uuid : create a random id with specific format
		2. util.pluralize : handle multiple cases 
		3. util.store : store data or access stored data 

	fold back and forth and skimming through App object to guess the basic idea of each method
		1. init
		2. bindEvents
		3. render
		4. renderFooter
		5. toggleAll
		6. getActiveTodos
		7. getCompletedTodos
		8. getFilteredTodos
		9. destroyCompleted
		10. indexFromEl
		11. create
		12. toggle
		13. edit
		14. editKeyup
		15. update
		16. destroy

	unfamiliar concepts : 
		1. jQuery
		2. handlebars
		3. localStorage
		4. Router
		5. method chaining with jQuery .on 

	search unfamiliar concepts:
		1. google MDN Javascript bind
		2. google jQuery .on

	how to debug each feature/method 
		1. set breakpoint : 
			- at the beginning of the method
		2. find out the trigger for this method : 
			- it can be start the demo, refresh page, typing, edit, delete...
			- you can playing around, until trigger debugger stop at the breakpoint 
			- better way: 
				- search occurences of this method elsewhere, ie, other methods which use it
				- specially those method which bind it with events 
		3. use Call Stack : 
			- to see the larger context of this method 
		4. inspect variables, in chaining context: 
			- use hovering, watch panel, console to get inputs and outputs of variables and expressions 
			- extend from one variable, to another chained, to the third chained...
			- to see the changing effects, e.g., $(e.target).closest('li').addClass('editing').find('.edit');
		5. check scope/local : 
			- check local : for local variables and returned values
		6. experiment: comment out an inner method (inside the targeted method)
			- to see its real effect on the output or display 
			- especially for the subtle methods, such as .focus()
		7. how to experiment objects and methods of TodoMVC with debugger console?
			- jQuery(func(){}) is a closed environment 
			- to experiment object, method inside, must enter the environment first 
			- to enter, need to set breakpoint and trigger it 

	how to debug an error?
		1. find the line where the error is at the source panel,
		2. set a breakpoint
		3. refresh the webpage or try to trigger the error again

	how to learn the necessary of handlebars.js?
		1. don't dive in the lib docs until the end if necessary
		2. check every bit of the variable value of handlebar or template related codes 
		3. you can figure out some logic and workflow behind, like I did in template.handlebars bookmarks
		4. if still not clear the usage, maybe search more or go into docs 
*/
jQuery(function ($) {
	'use strict';
	/* 
		basics : register or create a func named 'eq' to helpers

		how to debug or verify? 
			- set break point at this line of code
			- before running this line, Handlerbars.helpers has not 'eq' method;
			- after running, it has a 'eq' method under 'helpers'

		Notice:
		- this 'eq' method is used in footerTemplate handlebars syntax in index.html
	*/
	Handlebars.registerHelper('eq', function (a, b, options) {
		return a === b ? options.fn(this) : options.inverse(this);
	});

	var ENTER_KEY = 13;
	var ESCAPE_KEY = 27;

	// util is an object with three methods, dealing with uuid, plurals, and storage
	var util = {
		/* 
			@param nothing 
			@outputs : uuid (random number as id)

			basics : create random 32 character id number

			Notice : 
				- use bitwise operation to calc random values, very fast 
				- but we should leave it, no waste time on it 
		*/
		uuid: function () { 
			/*jshint bitwise:false */
			var i, random;
			var uuid = ''; 

			for (i = 0; i < 32; i++) { // length is 32
				random = Math.random() * 16 | 0;
				if (i === 8 || i === 12 || i === 16 || i === 20) {
					uuid += '-'; // every 4 digit add -
				}

				// further formatting on the numbers to use for id
				uuid += (i === 12 ? 4 : (i === 16 ? (random & 3 | 8) : random)).toString(16);
			}

			return uuid;
		},
		/* 
			@param count : number of items 
			@param word : string such as 'item'

			basics : return 'item' if count === 1, otherwise return 'items'
			
			Notice: no need to read the source, you can experiment the func to figure out its uage or working behind
		*/
		pluralize: function (count, word) {
			return count === 1 ? word : word + 's';
		},
		/* 
			@param namespace : where to store or extract data
			@param data : the data itself

			basics : store data inside namespace, or extract data from namespace

			debugging process: 
				1. search 'store:' to skim through the code quickly, pay attent to the keywords, e.g., if, return, setItem, parse
				2. search 'util.store' for its usages, check how it is used 
					- case 1: this.todos = util.store('todos-jquery') : extract data
					- util.store('todos-jquery', this.todos) : store data 
				3. debug line by line to see inner method usages
					- breakpoint at case 1 : to step into code for extracting data
					- breakpoint at case 2 : to step into code for storing data
					- breakpoint at first line of `store:`, is a little blinded than previous two above
				4. case 1 debugging : learn other methods 
					- `var store = localStorage.getItem(namespace);` : 
						- to extract data from a namespace
						- the data is a string which in this case is an array of objects
					- `JSON.parse(store)` : 
						- turn string into a real array of objects in JS 
					- `return (store && JSON.parse(store)) || [];` : return with && || 
						- return ("" && 2) => "" (find first false)
						- return ("" && 0) => "" (find first false)
						- return (" " && 0) => 0 (find first false)
						- return (" " && 1) => 1 (find last true)
						- return ("" || 2) => 2 (find first true)
						- return ("" || 0) => 0 (find last false)
						- return (" " || 0) => " " (find first true)
						- return (" " || 1) => " " (find first true)
				5. case 2 debugging : learn other methods
						- `JSON.stringify(data)` :
							- turn JS array of objects into a long string in JSON
						- `localStorage.setItem(namespace, JSON.stringify(data))` :
							- save the long string under a namespace using `localStorage`
		*/
		store: function (namespace, data) {
			if (arguments.length > 1) {
				return localStorage.setItem(namespace, JSON.stringify(data));
			} else {
				var store = localStorage.getItem(namespace);
				return (store && JSON.parse(store)) || [];
			}
		}
	};

	// App is an object contains all app functionality methods
	var App = {
		/* 
			@param : nothing 
			@outputs : nothing 

			basics : initialize the demo  
				1. load the previous todos 
				2. create the todoTemplate and footerTemplate (script + html style)
				3. bind elements with methods through events 
				4. create and initialize a router 

			techniques : 
				1. since this App.init() is run when the demo/lib is loaded, to trigger the debugger (after setting breakpoint at the first line of this method), is to refresh the page
		*/
		init: function () {
			
			this.todos = util.store('todos-jquery');

			/* 
				how to figure out how todoTemplate work?
					- $('#todo-template') : script tag/element with handlebars script inside
					- $('#todo-template').html() : get the handlebar script out into a long string
					- Handlebars.compile($('#todo-template').html()): make it a template function (no need to know the details of the function)
					- this.todoTemplate(todos) : apply todos to the template function to generate a long html script inside a long string
					- $('#todo-list').html(this.todoTemplate(todos)): turn long string to a html syntax or actual elements under element #todo-list
			*/
			this.todoTemplate = Handlebars.compile($('#todo-template').html());
			this.footerTemplate = Handlebars.compile($('#footer-template').html());
			
			this.bindEvents();
			
			/* 
				prerequisites : understanding the codes relating to footerTemplate, handlebars.js

				basics : router listens to href changes to execute functions accordiingly
					- footer button active, all, completed trigger, href, trigger router
					- webpage href ending part, the part after the last '/' is assigned to variable 'filter'

				Notice : this.filter = filter, the filter comes from the last bit of webpage, delievered by footer anchor elements clicking
			*/
			new Router({
				'/:filter': function (filter) {
					this.filter = filter;
					this.render();
				// } // experiment shows that without .bind(this), `this` above refers to window, not App object
				}.bind(this) // so, App is equivalent to this here, why not use App explicitly? Is it due to convention? or actual difference exist? I think it is more explicit to just use App to replace this
			}).init('/all'); // all, completed, active, any one of them is fine
		},
		/* 
			@param : nothing 
			@outputs : nothing 

			basics : use events to bind elements with methods 
				- first 2 lines : single event bind an element to a method 
				- remaining lines : 
					- a group element with many subelements 
					- each subelement is bind to a method through an event 
			
			techniques :
				1. this.create.bind(this)
				2. events: keyup, change, focusout, dbclick, click 
				3. how to bind a subelement from group element with method through event
		*/
		bindEvents: function () {
			/* 
				unfamiliar concept : `this.create.bind(this)` 
				Purpose : understand the use of .bind(this) here
				Experiment : `this.create` vs `this.create.bind(this)`

				Experiment part 1: use $('#new-todo').on('keyup', this.create);
					- no error on this line `$('#new-todo').on('keyup', this.create);`
					- but after typing a todoText and hit enter, nothing works
					- an error occurs at the line `this.todos.push({` inside `App.create` 
					- it turns out `this` refers to input element with name 'new-todo' not 'App' !!! 
			*/
			// $('#new-todo').on('keyup', this.create); // this refers to #new-todo
			// $('#new-todo').on('keyup', this.create.bind(App)); // works great!
			$('#new-todo').on('keyup', this.create.bind(this));
			/* 
				in this case, the same `this` refers to `App`
				Therefore, this option is to make sure `this` refer to `App` 
			*/
			
			/* 
				if element '#toggle-all' is triggered by event 'change', then execute method 'toggleAll'
			*/
			$('#toggle-all').on('change', this.toggleAll.bind(this));

			/* under element '#footer' if subelement '#clear-completed' is triggered by event 'click', then execute method 'destroyCompleted' */
			$('#footer').on('click', '#clear-completed', this.destroyCompleted.bind(this));
			// pattern 2: event listener delegation with jquery
			$('#todo-list')
				/* under element '#todo-list' if elemtn '.toggle' is triggered with change event, then execute toggle method*/
				.on('change', '.toggle', this.toggle.bind(this))
				.on('dblclick', 'label', this.edit.bind(this))
				.on('keyup', '.edit', this.editKeyup.bind(this))
				.on('focusout', '.edit', this.update.bind(this))
				.on('click', '.destroy', this.destroy.bind(this));
				/* 
					method chaining
					- keypoint : end the function with `return this`
					- double check with jQuery `on` method using bookmarks '.on chain'
				*/

		},
		/* 
			@param nothing 
			@outputs nothing

			basics : update and display the changed values 
				1. this.todos is already loaded, so first step is to filter todos 
				2. add todo li elements onto ul#todo-list element
				3. toggle off section#main style display:none, so that todo li elements all get displayed 
				4. if toggle-all checkbox's 'checked' property is true, highlight the checkbox element; otherwise, keep it gray
				5. render footer buttons display
				6. make cursor active to element #new-todo
				7. store this.todos locally 

			Notice : 
				1. almost all feature method uses render: 
					- values can be changed but not reflected on the webpage, render update the changes onto the page
				2. Router uses render too, but no idea router's work
		*/
		render: function () {
			var todos = this.getFilteredTodos();

			/* 
				before running  `$('#todo-list').html(this.todoTemplate(todos))`
					- ul#todo-list has no subelements such as li element yet
					- this.todoTemplate(todos) : return todo li element html syntax string
					- after running this line : todo li elements are added onto ul#todo-list
			*/
			$('#todo-list').html(this.todoTemplate(todos));
			/* 
				$('#main').toggle(true) : toggle this element style on/off 
				$('#main').toggle(false) : toggle this element style off/on 
			*/
			$('#main').toggle(todos.length > 0);
			/* 
				$('#toggle-all').prop('checked', true): add a property 'checked' with value true
				$('#toggle-all').prop('checked', false): change a property 'checked' with value false
				when the input checkbox '#toggle-all' is checked as 'true'
					- CSS will make the checkbox from grayed out to highlighted with dark color	
			*/
			$('#toggle-all').prop('checked', this.getActiveTodos().length === 0);
			this.renderFooter();
			$('#new-todo').focus();
			// render should not store data in theory, so if I were the author, I would not use the following line here
			util.store('todos-jquery', this.todos);
		},
		/* 
			@param : nothing 
			@outputs : nothing 

			basics : update and display footer elements 
				1. count number of todos 
				2. count number of active todos 
				3. use footerTemplate to create string for footer element html script
				4. write the html script onto index.html and display the footer elements
			
			Notice : 
				- footer ul has 3 li elements, inside each li has an anchor element
				- each anchor element linking to a webpage with different endings 
				- click the anchor element will lead to a slightly different webpage
				- the differences of a webpage will trigger router for method execution
		*/
		renderFooter: function () {
			var todoCount = this.todos.length;
			var activeTodoCount = this.getActiveTodos().length;
			var template = this.footerTemplate({
				activeTodoCount: activeTodoCount,
				activeTodoWord: util.pluralize(activeTodoCount, 'item'),
				completedTodos: todoCount - activeTodoCount,
				filter: this.filter
			});

			$('#footer').toggle(todoCount > 0).html(template);
		},
		/* 
			@param e : event to be triggered
			@outputs : nothing

			basics : toggle all todos to be active or completed

			workings :
				1. the checkbox value can be turned to true or false
				2. turn all todos completed value to be the checkbox value
				3. display/render

			Notice :
				1. the use of array.forEach
				2. the use of input-checkbox `checked` value
			 */
		toggleAll: function (e) {
			// $(e.target) => input checkbox (so, either true or false)
			// $(e.target).prop('checked') => true or false 
			var isChecked = $(e.target).prop('checked');

			// use forEach to turn every todo.completed true or false
			this.todos.forEach(function (todo) {
				todo.completed = isChecked;
			});

			// assumption: render everything for displaying
			this.render();
		},
		/* 
			@param Nothing
			@outputs Array of todos

			basics : return an array of active todos 

			workings : 
				1. use array filter with a callback func 
				2. the callback func turns each todo's completed to be opposite boolean value 

			Notice : 
				1. it is not a triggered method
				2. but lower method to assist `getFilteredTodos
		*/
		// expectation: return array of todos (active only, not completed) 
		getActiveTodos: function () {
			// where to set the breakpoint? 
			// as long as you know this method will run (after trigger), just place breakpoint at the first line of the method
			return this.todos.filter(function (todo) { // use array.filter method
				return !todo.completed;
			});
		},
		/*
			@param Nothing
			@outputs Nothing

			basics : return an array of completed todos
		
			workings : exactly like `getActiveTodos`

			Notice : 
				1. it is not a triggered method
				2. but lower method to assist `getFilteredTodos`
		*/
		getCompletedTodos: function () {
			return this.todos.filter(function (todo) {
				return todo.completed;
			});
		},
		// expectation: conditioned on either getActiveTodos or getCompletedTodos
		/* 
			@param Nothing
			@outputs array of todos
		
			basics : select array of todos based on filter mode ('active', 'completed', 'all')

			workings :
				1. this.filter is the key to select 
				2. utilize methods like `getActiveTodos` and `getCompletedTodos`

			Notice : 
				1. it is not a triggered method
				2. but lower method to assist a frequently called method `this.render`
		*/
		getFilteredTodos: function () {
			if (this.filter === 'active') {
				return this.getActiveTodos();
			}

			if (this.filter === 'completed') {
				return this.getCompletedTodos();
			}

			return this.todos;
		},

		/*
			@param nothing 
			@outputs Nothing
			
			basics : display only active todos, and consider they are all todos available

			workings :
				1. assign active todos to be all the todos available
				2. assign filter state to be 'all'
				3. display 

			Notice : nothing is really deleted or removed using this method. so, the method name is misleading
		*/
		destroyCompleted: function () {
			this.todos = this.getActiveTodos();
			this.filter = 'all';
			this.render();
		},
		// accepts an element from inside the `.item` div and
		// returns the corresponding index in the `todos` array
		/* 
			@param el : element bind with the triggered event
			@outputs : position index
			
			basics : given the element bind by triggered event, return the position index of the todo which the element is closest to
			
			workings : 
				1. through the element bind with the triggered event, get its closest li element's id value
				2. loop through each todo's id value, if match with the id above, 
				3. return the position or index of the todo

			Notice :
				1. it is not a triggered method, but a helper method to assist many triggered methods
			
			technique : 
				1. find the closest li's id value
				2. while loop search backward

			exploration :
				1. `el`, `$(el)`, `$(el).closest('li')`, `$(el).closest('li').data('id')`
			*/
		indexFromEl: function (el) {
			var id = $(el).closest('li').data('id');
			var todos = this.todos;
			var i = todos.length;

			while (i--) {
				if (todos[i].id === id) {
					return i;
				}
			}
		},
		/* 
			@param e : triggered events
			@outputs : Nothing
			
			basics : use the typed input to add a new todo into todos array
			
			workings : 
				1. take all typed input and trim it
				2. if the last key is not enter or if there is no input typing, return nothing 
				3. use typed text, a randomly generated id value, and a boolean false to make an todo object
				4. push this todo object into this.todos array 
				5. make the input text element value empty 
				6. render/display
		
			techniques :
				1. jQuery access an element
				2. jQuery access and trim value of the element
				3. check on last key input to be 'enter' or whether blank input
				4. keep input text empty
		*/
		create: function (e) {
			/* 
				trigger : 
					- at element input#new-todo, 
					- keyup === finger up from pressing a key
			*/
			var $input = $(e.target);
			/* 
				Explore the values of e, e.target, $(e.target) with debugger
					- e : events 
					- e.target : the directly triggered element
					- $(e.target) : wrapped by jQuery, give it a new context/env under the element rather than App
			*/

			/* 
				Rabbit hole: going to the source of other methods
					- search docs for `$input.val()`
					- search docs for `string.trim()`
				How to avoid Rabbit hole: 
					- resist the need to dive in
					- just contemplate on the input and output
					- maybe experiment a little with little tweaks of input to see output
			*/
			var val = $input.val().trim();

			/* 
				unfamiliar concept: `e.which`
					1. if you google `e.which`, w3schools gives example with explanation, but still not straightforward
					2. better solution: 
						- don't search, but experiment to figure it out 
						- try different typing, check the value of `e.which`
						- read more of the coding context, you are very likely to get it right 
					3. maybe most of questions can be answered by debugger
			*/
			if (e.which !== ENTER_KEY || !val) {
				return;
			}

			this.todos.push({
				// ignore the inner working of `util.uudi`, and assume it is to generate id number
				id: util.uuid(), // output long string of id
				title: val,
				completed: false
			});

			// clean up the text at the input element
			// verified when step over
			$input.val('');

			this.render();
		},
		/* 
			@param e : event 
			@outputs : nothing
			
			basics : toggle a todo from active to completed and backforth
			
			workings : 
				1. access an event triggered element 
				2. and get its closest li (todo's) position/index
				3. turn the todo's completed value to opposite boolean 
				4. render/display
			*/
		toggle: function (e) {
			var i = this.indexFromEl(e.target);
			this.todos[i].completed = !this.todos[i].completed;
			this.render();
		},
		/* 
			@param e : event 
			@outputs : nothing 

			basics : double click the input text element to be ready to edit todoText

			Notice : 
				1. inspect the chaining variables values, see style added 
					- e.g., $(e.target).closest('li').addClass('editing').find('.edit');
				2. experimented `$input.val($input.val()).focus();` vs `$input.focus()`
					- not see any difference yet
					- so, we should adopt the shorter and clean code
				3. .focus() : being able to insert cursor in the input text area
				4. the name of this method is misleading, it should be called enterEditMode
		*/
		edit: function (e) {
			var $input = $(e.target).closest('li').addClass('editing').find('.edit');
			$input.val($input.val()).focus();
		},
		/* 
			@param e : event 
			@outputs : nothing 

			basics : exit the edit mode
				1. if last key in the edit mode is enter, remove focus or just blur
				2. if last key in the edit mode is esc, remove the edit, and blur 

			techniques : 
				1. e.which : turn the last key into a unique number 
				2. e.target.blur() : remove the cursor, remove the focus 
				3. $(e.target).data('abort', true) : store a property {'abort': true}

			Notice :
				- $(e.target).data('abort', true) : 
					- only keep track whether to remove the edit in update or not 
					- not remove the edit by itself
					- the actual remove action is done in update()
				- the method name is confusing, it should be called exitEditMode
		*/
		editKeyup: function (e) {
			if (e.which === ENTER_KEY) {
				e.target.blur();
			}

			if (e.which === ESCAPE_KEY) {
				$(e.target).data('abort', true).blur();
			}
		},
		/* 
			@param e : event  
			@outputs : nothing 

			basics : 
				1. if the edit removes everything, then run this.destroy(e), which renders itself, and return nothing/exit
				2. if asked to abort the edit, then change to {'abort': false}, then render
				3. if asked to not abort the edit, assign the edit to the todo.title, and then render 
		*/
		update: function (e) {
			var el = e.target;
			var $el = $(el);
			var val = $el.val().trim();

			if (!val) {
				this.destroy(e);
				return;
			}

			if ($el.data('abort')) {
				$el.data('abort', false);
			} else {
				this.todos[this.indexFromEl(el)].title = val;
			}

			this.render();
		},

		/*
			@param e : event, triggered 
			@outputs : Nothing

			basics : remove a todo from todos
			working : 
				1. the triggered element's id 
				2. from id to todo's position in todos array
				3. remove the todo at the position
		*/
		destroy: function (e) {
			// what is `e`? => jQuery.event object (many properties and methods)
			this.todos.splice(this.indexFromEl(e.target), 1);
			// checkout this, todos, 
			// what is `e.target`? => button.destroy (a button with class name 'destroy')
			// `this.indexFromEl(e.target)` return the actual position, e.g., 0 or 1 or 2
			// all these variable values can be inspected by (select first if long) mouse hovering or use watch panel to add variable name


			// render() is to update the webpage or dom, I assume
			// we can step over this line and see the effect
			this.render();
			
		}
	};

	// execute App.init() on the highest level of this js file/library
	App.init();
});
