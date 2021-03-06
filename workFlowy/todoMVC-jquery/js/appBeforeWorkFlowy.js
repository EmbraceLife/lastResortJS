/*global jQuery, Handlebars, Router */
jQuery(function ($) {
	'use strict';

  // add the callback as a helper function under name 'eq' to Handlebars env
	Handlebars.registerHelper('eq', function (a, b, options) {
		return a === b ? options.fn(this) : options.inverse(this);
	});

	var ENTER_KEY = 13;
	var ESCAPE_KEY = 27;

	var util = {
		uuid: function () {
			/*jshint bitwise:false */
			var i, random;
			var uuid = '';

			for (i = 0; i < 32; i++) {
				random = Math.random() * 16 | 0;
				if (i === 8 || i === 12 || i === 16 || i === 20) {
					uuid += '-';
				}
				uuid += (i === 12 ? 4 : (i === 16 ? (random & 3 | 8) : random)).toString(16);
			}

			return uuid;
		},
		pluralize: function (count, word) {
			return count === 1 ? word : word + 's';
		},
		store: function (namespace, data) {
			if (arguments.length > 1) {
				return localStorage.setItem(namespace, JSON.stringify(data));
			} else {
				var store = localStorage.getItem(namespace);
				return (store && JSON.parse(store)) || [];
			}
		}
	};

	var App = {

    /** To initialize the app
     * 1. load todos from localStorage
     * 2. use handlebars to create a function for generating html text from todos list
     * 3. do the same to generate summary html for todos list
     * 4. bind events to methods
     * 5. use Router to set and change the page's hyperlink and render the page
     */
		init: function () {
      this.todos = util.store('todos-jquery');
			this.todoTemplate = Handlebars.compile($('#todo-template').html());
			this.footerTemplate = Handlebars.compile($('#footer-template').html());
			this.bindEvents();

			new Router({
				'/:filter': function (filter) {
					this.filter = filter;
					this.render();
				}.bind(this)
			}).init('/all');
    },
    
    /** bindEvents: to bind methods to eventListerns
     * 1. if element with class new-todo is triggered by keyup, run method create
     * 2. if element with class toggle-all is triggered by change, run method toggleAll
     * 3. if sub element with class clear-completed under element with class footer is triggered by click, run method destroyCompleted
     * 4. under element with class todo-list
     *  4.1 if sub-element with class toggle is trigged by change, run toggle method;
     *  4.2 if sub-element label is triggered by double-click, run editingMode method;
     *  4.3 if sub-element with class edit is triggered by keyup, run editKeyup method;
     *  4.4 if sub-element with class edit is triggered by focusout, run update method;
     *  4.5 if sub-element with class destroy is triggered by click, run destroy method; 
     */
		bindEvents: function () {
			$('.new-todo').on('keyup', this.create.bind(this));
			$('.toggle-all').on('change', this.toggleAll.bind(this));
			$('.footer').on('click', '.clear-completed', this.destroyCompleted.bind(this));
			$('.todo-list')
				.on('change', '.toggle', this.toggle.bind(this))
				.on('dblclick', 'label', this.editingMode.bind(this))
				.on('keyup', '.edit', this.editKeyup.bind(this))
				.on('focusout', '.edit', this.update.bind(this))
				.on('click', '.destroy', this.destroy.bind(this));
    },
    
    /** render: refresh the page
     * 1. get the todos array of todo objects using method getFilteredTodos
     * 2. generate html texts from the todos, and create html under the element with class todo-list according
     * 3. let element with class main to run toggle method
     * 4. set the value of property 'checked' for element with class toggle-all
     * 5. render footer
     * 6. let cursor active at element with class new-todo
     */
		render: function () {
			var todos = this.getFilteredTodos();
			$('.todo-list').html(this.todoTemplate(todos));
			$('.main').toggle(todos.length > 0);
			$('.toggle-all').prop('checked', this.getActiveTodos().length === 0);
			this.renderFooter();
			$('.new-todo').focus();
      
    },
    
    /** renderAndSave
     * 1. render the page
     * 2. update todos in localStorage
     */
    renderAndSave: function () {
			this.render(); 
			util.store('todos-jquery', this.todos); 
    },
    
    /** renderFooter
     * 1. count the number of todos
     * 2. count the number of active todos
     * 3. run footerTemplate with an object of information
     *  3.1 count of active todos
     *  3.2 pluralize the word 'item'
     *  3.3 count of completed todos
     *  3.4 the value of filter
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

			$('.footer').toggle(todoCount > 0).html(template);
    },
    
    /** toggleAll: 
     * 1. get the value of the property 'checked' for the target element
     * 2. assign the value to the property 'completed' of each todo
     * 3. render the page and update the todos in localStorage
    */
		toggleAll: function (e) {
			var isChecked = $(e.target).prop('checked');

			this.todos.forEach(function (todo) {
				todo.completed = isChecked;
			});

			this.renderAndSave();
    },
    
    /** getActiveTodos
     * 1. filter out (return) the todos whose value of `completed` is false
     */
		getActiveTodos: function () {
			return this.todos.filter(function (todo) {
				return !todo.completed;
			});
    },
    
    /** getCompletedTodos
     * 1. filter out and return the todos whose `completed` value is true
     */
		getCompletedTodos: function () {
			return this.todos.filter(function (todo) {
				return todo.completed;
			});
    },
    
    /** getFilteredTodos
     * 1. if `this.filter` is 'active', return active todos
     * 2. if `this.filter` is 'completed', return completed todos
     * 3. otherwise, return entire todos
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
    
    /** destroyCompleted
     * 1. get active todos to be `this.todos` (the entire todos)
     * 2. render the page and update `this.todos` for localStorage
     */
		destroyCompleted: function () {
			this.todos = this.getActiveTodos();
			this.renderAndSave();
    },
    

		// accepts an element from inside the `.item` div and
		// returns the corresponding index in the `todos` array
    /** getIndexFromEl
     * 1. get the target element's closest li element, and access its 'id' value
     * 2. get the entire todos 
     * 3. get the count of todos
     * 4. loop through the todos to find the index of the todo whose id matches the id value above
     */
    getIndexFromEl: function (el) {
			var id = $(el).closest('li').data('id');
			var todos = this.todos;
			var i = todos.length;

			while (i--) {
				if (todos[i].id === id) {
					return i;
				}
			}
    },
    
    /** create
     * 1. get the target element
     * 2. get the value (input text) of the element and trim it
     * 3. if the key pressed at the target element is not enter key or no value (input text) is provided, then return nothing
     * 4. create a todo with {id, title, completed}
     *  4.1 id is a random number generated by `util.uuid`
     *  4.2 title is value or input text of the target 
     *  4.3 completed is default to false
     * 5. remove the text value of the target element
     * 6. render the page and update this.todos for localStorage
     */
		create: function (e) {
			var $input = $(e.target);
			var val = $input.val().trim();

			if (e.which !== ENTER_KEY || !val) {
				return;
			}

			this.todos.push({
				id: util.uuid(),
				title: val,
				completed: false
			});

			$input.val('');

			this.renderAndSave();
    },
    
    /** toggle
     * 1. get the index of todo which is at the target element
     * 2. reverse the value of 'completed' property of the todo which is at the target element 
     * 3. render the page and update this.todos for localStorage
     */
		toggle: function (e) {
			var i = this.getIndexFromEl(e.target);
			this.todos[i].completed = !this.todos[i].completed;
			this.renderAndSave();
    },
    
    /** editingMode
     * 1. get the target element's closest li element
     *  1.1 then add class editing to it
     *  1.2 then find a sub-element with class edit (the actual target element)
     * 2. get the target element's text value assigned to tmpStr
     * 3. remove the text value of the target element
     * 4. assign tmpStr back to the target's text value
     * 5. put cursor to the target element (ready to edit)
     */
		editingMode: function (e) {
			var $input = $(e.target).closest('li').addClass('editing').find('.edit');
			var tmpStr = $input.val();
			$input.val('');
			$input.val(tmpStr);
			$input.focus();
    },
    
    /** editKeyup
     * 1. if the enter key is released, remove the cursor and blur
     * 2. if the esc key is released, 
     *  2.1 set the property abort to be true
     *  2.2 remove the cursor and blur
     */
		editKeyup: function (e) {
			if (e.which === ENTER_KEY) {
				e.target.blur();
			}

			if (e.which === ESCAPE_KEY) {
				$(e.target).data('abort', true).blur();
			}
    },
    
    /** update
     * 1. get the target element
     * 2. make it a jQuery object
     * 3. trim the text value of the target
     * 4. if the target's property 'abort' is true, then set it false
     * 5. if the target text value is empty, then run destroy on the target element
     * 6. otherwise, assign the input value to the title of the targeted todo 
     * 7. render the page and update this.todos for localStorage
     */
		update: function (e) {
			var el = e.target;
			var $el = $(el);
			var val = $el.val().trim();
			
			if ($el.data('abort')) {
				$el.data('abort', false);
			} else if (!val) {
				this.destroy(e);
				return;
			} else {
				this.todos[this.getIndexFromEl(el)].title = val;
			}

			this.renderAndSave();
    },
    
    /** destroy
     * 1. remove the targeted todo from this.todos
     * 2. render the page and update this.todos for localStorage
     */
		destroy: function (e) {
			this.todos.splice(this.getIndexFromEl(e.target), 1);
			this.renderAndSave();
		}
	};

	App.init();
});
// fold level 1: jQuery(function($){...}) ?
