/*global jQuery, Handlebars, Router */
// jQuery(function ($) {

	'use strict';

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
		init: function () {
			this.todos = util.store('todos-jquery');
			// this.todoTemplate = Handlebars.compile($('#todo-template').html());
			this.todoTemplate = Handlebars.compile(document.getElementById('todo-template').innerHTML);
			// this.footerTemplate = Handlebars.compile($('#footer-template').html());
			this.footerTemplate = Handlebars.compile(document.getElementById('footer-template').innerHTML);
			this.bindEvents();

			new Router({
				'/:filter': function (filter) {
					this.filter = filter;
					this.render();
				}.bind(this)
			}).init('/all');      
		},
		bindEvents: function () {
			// $('#new-todo').on('keyup', this.create.bind(this));
			document.getElementById('new-todo').addEventListener('keyup', this.create.bind(this)); /* have to bind(this), but can't tell it in theory, have to do it with trial and error */

			// $('#toggle-all').on('change', this.toggleAll.bind(this));
			document.getElementById('toggle-all').addEventListener('change', this.toggleAll.bind(this));
			// $('#footer').on('click', '#clear-completed', this.destroyCompleted.bind(this));
			document.getElementById('footer').addEventListener('click', function(event) {
				if (event.target.id === 'clear-completed') {
				this.destroyCompleted();
				} 
			}.bind(this));

			// $('#todo-list')
			// 	.on('change', '.toggle', this.toggle.bind(this))
			// 	.on('dblclick', 'label', this.edit.bind(this))
			// 	.on('keyup', '.edit', this.editKeyup.bind(this))
			// 	.on('focusout', '.edit', this.update.bind(this))
			// 	.on('click', '.destroy', this.destroy.bind(this));

			document.getElementById('todo-list')
				.addEventListener('change', function(event) {
					if (event.target.className === 'toggle') {
						this.toggle(event); // toggle requres an argument, so event must be included
					}
				}.bind(this));

			document.getElementById('todo-list')
			.addEventListener('dblclick', function(event) {
				if (event.target.localName === 'label') {
					this.edit(event);
				}
			}.bind(this));	

			document.getElementById('todo-list')
			.addEventListener('keyup', function(event) {
				if (event.target.className === 'edit') {
					this.editKeyup(event);
				}
			}.bind(this));	

			document.getElementById('todo-list')
			.addEventListener('focusout', function(event) {
				if (event.target.className === 'edit') {
					this.update(event);
				}
			}.bind(this));	

			document.getElementById('todo-list')
			.addEventListener('click', function(event) {
				if (event.target.className === 'destroy') {
					this.destroy(event);
				}
			}.bind(this));	
		},
		render: function () {
			var todos = this.getFilteredTodos();
			// $('#todo-list').html(this.todoTemplate(todos));
			document.getElementById('todo-list').innerHTML = this.todoTemplate(todos);
			// $('#main').toggle(todos.length > 0);
			if (todos.length > 0) {
				document.getElementById('main').style.display = 'block'; // show
			} else {
				document.getElementById('main').style.display = 'none'; // hide
			}
			
			// $('#toggle-all').prop('checked', this.getActiveTodos().length === 0);
			document.getElementById('toggle-all').checked = this.getActiveTodos().length === 0;

			this.renderFooter();

			// $('#new-todo').focus();
			document.getElementById('new-todo').focus();

			util.store('todos-jquery', this.todos);
		},
		renderFooter: function () {
			var todoCount = this.todos.length;
			var activeTodoCount = this.getActiveTodos().length;
			var template = this.footerTemplate({
				activeTodoCount: activeTodoCount,
				activeTodoWord: util.pluralize(activeTodoCount, 'item'),
				completedTodos: todoCount - activeTodoCount,
				filter: this.filter
			});

			// $('#footer').toggle(todoCount > 0).html(template);
			if (todoCount > 0) {
				document.getElementById('footer').innerHTML = template;
				document.getElementById('footer').style.display = 'block';
			} else {
				document.getElementById('footer').style.display = 'none';
			}
		},
		toggleAll: function (e) {
			// var isChecked = $(e.target).prop('checked');
			var isChecked = e.target.checked;

			this.todos.forEach(function (todo) {
				todo.completed = isChecked;
			});

			this.render();
		},
		getActiveTodos: function () {
			return this.todos.filter(function (todo) {
				return !todo.completed;
			});
		},
		getCompletedTodos: function () {
			return this.todos.filter(function (todo) {
				return todo.completed;
			});
		},
		getFilteredTodos: function () {
			if (this.filter === 'active') {
				return this.getActiveTodos();
			}

			if (this.filter === 'completed') {
				return this.getCompletedTodos();
			}

			return this.todos;
		},
		destroyCompleted: function () {
			this.todos = this.getActiveTodos();
			this.filter = 'all';
			this.render();
		},
		// accepts an element from inside the `.item` div and
		// returns the corresponding index in the `todos` array
		indexFromEl: function (el) {
			// var id = $(el).closest('li').data('id');
			// var id = el.parentElement.parentNode.dataset.id;
			// best option is ot use element.closest() which is equivalent to jQuery part above
			var id = el.closest('li').dataset.id;
			var todos = this.todos;
			var i = todos.length;

			while (i--) {
				if (todos[i].id === id) {
					return i;
				}
			}
		},
		create: function (e) {
			// var $input = $(e.target);
			// var val = $input.val().trim();
			var val = e.target.value.trim();

			if (e.which !== ENTER_KEY || !val) {
				return;
			}

			this.todos.push({
				id: util.uuid(),
				title: val,
				completed: false
			});

			// $input.val('');
			e.target.value = "";

			this.render();
		},
		toggle: function (e) {
			var i = this.indexFromEl(e.target);
			this.todos[i].completed = !this.todos[i].completed;
			this.render();
		},
		edit: function (e) {
			// var $input = $(e.target).closest('li').addClass('editing').find('.edit');
			e.target.closest('li').classList.add('editing'); 
			// classList.add can't do chaining, so has to separate it
			var no$input = e.target.closest('li').querySelector('.edit');
			// $input.val($input.val()).focus();
			no$input.focus();
		},

		// edit: function (e) {  // name is kind of misleading, this method begins the editing process when double-clicking a todo
		// 	var todoLi = e.target.closest('li');
		//   todoLi.classList.add('editing');
			
		//   var input = todoLi.querySelector('.edit');
		//   input.focus();
		// },

		editKeyup: function (e) {
			if (e.which === ENTER_KEY) {
				e.target.blur();
			}

			if (e.which === ESCAPE_KEY) {
				// $(e.target).data('abort', true).blur();
				e.target.dataset.abort = true;
				e.target.blur();
			}
		},
		update: function (e) {
			var el = e.target;
			// var $el = $(el);
			// var val = $el.val().trim();
			var val = el.value.trim();

			if (!val) {
				this.destroy(e);
				return;
			}

			// if ($el.data('abort')) {
			if (el.dataset.abort === 'true') {
				// $el.data('abort', false);
				el.dataset.abort = false; // saved as string not Boolean
			} else {
				this.todos[this.indexFromEl(el)].title = val;
			}

			this.render();
		},
		destroy: function (e) {
			this.todos.splice(this.indexFromEl(e.target), 1);
			this.render();
		}
	};

	App.init();
// });