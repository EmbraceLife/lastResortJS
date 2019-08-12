/* 
	How to turn all methods into functions?
		1. do it one at a time and make sure app still works fine!
		2. comment out the method and leave the function to work, move on to next method
*/
/* 
	the whole demo is running a function on jQuery(func($){...})
	so, there is no method here to be turned into a function.
*/
jQuery(function ($) {
	'use strict';
	var todosApp;
	var footerTemplateApp;
	var todoTemplateApp;
	var filterApp;
	// this is already a function
	Handlebars.registerHelper('eq', function (a, b, options) {
		return a === b ? options.fn(this) : options.inverse(this);
	});

	var ENTER_KEY = 13;
	var ESCAPE_KEY = 27;

	// var util = {
	// 	// uuid: function () {
	// 	// 	/*jshint bitwise:false */
	// 	// 	var i, random;
	// 	// 	var uuid = '';

	// 	// 	for (i = 0; i < 32; i++) {
	// 	// 		random = Math.random() * 16 | 0;
	// 	// 		if (i === 8 || i === 12 || i === 16 || i === 20) {
	// 	// 			uuid += '-';
	// 	// 		}
	// 	// 		uuid += (i === 12 ? 4 : (i === 16 ? (random & 3 | 8) : random)).toString(16);
	// 	// 	}

	// 	// 	return uuid;
	// 	// },
	// 	// pluralize: function (count, word) {
	// 	// 	return count === 1 ? word : word + 's';
	// 	// },
	// 	// store: function (namespace, data) {
	// 	// 	if (arguments.length > 1) {
	// 	// 		return localStorage.setItem(namespace, JSON.stringify(data));
	// 	// 	} else {
	// 	// 		var store = localStorage.getItem(namespace);
	// 	// 		return (store && JSON.parse(store)) || [];
	// 	// 	}
	// 	// }
	// };

	function utilUuid () {
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
	}

	function utilPluralize(count, word) {
		return count === 1 ? word : word + 's';
	}

	function utilStore (namespace, data) {
		if (arguments.length > 1) {
			return localStorage.setItem(namespace, JSON.stringify(data));
		} else {
			var store = localStorage.getItem(namespace);
			return (store && JSON.parse(store)) || [];
		}
	}

	function initApp () {
		// this.todos = util.store('todos-jquery');
		todosApp = utilStore('todos-jquery');
		todoTemplateApp = Handlebars.compile($('#todo-template').html());
		footerTemplateApp = Handlebars.compile($('#footer-template').html());
		// App.bindEvents();
		bindEventsApp();

		new Router({
			'/:filter': function (filter) {
				filterApp = filter;
				// App.render();
				renderApp();
			}//.bind(App)
		}).init('/all');      
	}

	function bindEventsApp() {
		$('#new-todo').on('keyup', createApp);
		$('#toggle-all').on('change', toggleAllApp);
		$('#footer').on('click', '#clear-completed', destroyCompletedApp);
		$('#todo-list')
			.on('change', '.toggle', toggleApp)
			.on('dblclick', 'label', editApp)
			.on('keyup', '.edit', editKeyupApp)
			.on('focusout', '.edit', updateApp)
			.on('click', '.destroy', destroyApp);
	}

	function renderApp () {
		var todos = getFilteredTodosApp();
		$('#todo-list').html(todoTemplateApp(todos));
		$('#main').toggle(todos.length > 0);
		$('#toggle-all').prop('checked', getActiveTodosApp().length === 0);
		renderFooterApp();
		$('#new-todo').focus();
		// util.store('todos-jquery', this.todos);
		utilStore('todos-jquery', todosApp);
	}

	function renderFooterApp () {
		var todoCount = todosApp.length;
		var activeTodoCount = getActiveTodosApp().length;
		var template = footerTemplateApp({
			activeTodoCount: activeTodoCount,
			// activeTodoWord: util.pluralize(activeTodoCount, 'item'),
			activeTodoWord: utilPluralize(activeTodoCount, 'item'),
			completedTodos: todoCount - activeTodoCount,
			filter: filterApp
		});

		$('#footer').toggle(todoCount > 0).html(template);
	}

	function toggleAllApp (e) {
		var isChecked = $(e.target).prop('checked');

		todosApp.forEach(function (todo) {
			todo.completed = isChecked;
		});

		// this.render();
		renderApp();
	}

	function getActiveTodosApp() {
		return todosApp.filter(function (todo) {
			return !todo.completed;
		});
	}

	function getCompletedTodosApp() {
		return todosApp.filter(function (todo) {
			return todo.completed;
		});
	}

	function getFilteredTodosApp() {
		if (filterApp === 'active') {
			return getActiveTodosApp();
		}

		if (filterApp === 'completed') {
			return getCompletedTodosApp();
		}

		return todosApp;
	}

	function destroyCompletedApp() {
		todosApp = getActiveTodosApp();
		filterApp = 'all';
		// this.render();
		renderApp();
	}

	function indexFromElApp(el) {
		var id = $(el).closest('li').data('id');
		var todos = todosApp;
		var i = todos.length;

		while (i--) {
			if (todos[i].id === id) {
				return i;
			}
		}
	}

	function createApp(e) {
		var $input = $(e.target);
		var val = $input.val().trim();

		if (e.which !== ENTER_KEY || !val) {
			return;
		}

		todosApp.push({
			// id: util.uuid(),
			id: utilUuid(),
			title: val,
			completed: false
		});

		$input.val('');

		// this.render();
		renderApp();
	}

	function toggleApp(e) {
		var i = indexFromElApp(e.target);
		todosApp[i].completed = !todosApp[i].completed;
		// this.render();
		renderApp();
	}

	function editApp(e) {
		var $input = $(e.target).closest('li').addClass('editing').find('.edit');
		$input.val($input.val()).focus();
	}

	function editKeyupApp(e) {
		if (e.which === ENTER_KEY) {
			e.target.blur();
		}

		if (e.which === ESCAPE_KEY) {
			$(e.target).data('abort', true).blur();
		}
	}


	function updateApp(e) {
		var el = e.target;
		var $el = $(el);
		var val = $el.val().trim();

		if (!val) {
			destroyApp(e);
			return;
		}

		if ($el.data('abort')) {
			$el.data('abort', false);
		} else {
			todosApp[indexFromElApp(el)].title = val;
		}

		// this.render();
		renderApp();
	}

	function destroyApp(e) {
		todosApp.splice(indexFromElApp(e.target), 1);
		// this.render();
		renderApp();
	}


	// var App = {
	// 	// init: function () {
	// 	// 	// this.todos = util.store('todos-jquery');
	// 	// 	this.todos = utilStore('todos-jquery');
	// 	// 	this.todoTemplate = Handlebars.compile($('#todo-template').html());
	// 	// 	this.footerTemplate = Handlebars.compile($('#footer-template').html());
	// 	// 	this.bindEvents();

  //   //   new Router({
	// 	// 		'/:filter': function (filter) {
	// 	// 			this.filter = filter;
	// 	// 			this.render();
	// 	// 		}.bind(this)
	// 	// 	}).init('/all');      
	// 	// },


	// 	// bindEvents: function () {
	// 	// 	$('#new-todo').on('keyup', this.create.bind(this));
	// 	// 	$('#toggle-all').on('change', this.toggleAll.bind(this));
	// 	// 	$('#footer').on('click', '#clear-completed', this.destroyCompleted.bind(this));
	// 	// 	$('#todo-list')
	// 	// 		.on('change', '.toggle', this.toggle.bind(this))
	// 	// 		.on('dblclick', 'label', this.edit.bind(this))
	// 	// 		.on('keyup', '.edit', this.editKeyup.bind(this))
	// 	// 		.on('focusout', '.edit', this.update.bind(this))
	// 	// 		.on('click', '.destroy', this.destroy.bind(this));
	// 	// },


	// 	// render: function () {
	// 	// 	var todos = this.getFilteredTodos();
	// 	// 	$('#todo-list').html(this.todoTemplate(todos));
	// 	// 	$('#main').toggle(todos.length > 0);
	// 	// 	$('#toggle-all').prop('checked', this.getActiveTodos().length === 0);
	// 	// 	this.renderFooter();
	// 	// 	$('#new-todo').focus();
	// 	// 	// util.store('todos-jquery', this.todos);
	// 	// 	utilStore('todos-jquery', this.todos);
	// 	// },
	// 	// renderFooter: function () {
	// 	// 	var todoCount = this.todos.length;
	// 	// 	var activeTodoCount = this.getActiveTodos().length;
	// 	// 	var template = this.footerTemplate({
	// 	// 		activeTodoCount: activeTodoCount,
	// 	// 		// activeTodoWord: util.pluralize(activeTodoCount, 'item'),
	// 	// 		activeTodoWord: utilPluralize(activeTodoCount, 'item'),
	// 	// 		completedTodos: todoCount - activeTodoCount,
	// 	// 		filter: this.filter
	// 	// 	});

	// 	// 	$('#footer').toggle(todoCount > 0).html(template);
	// 	// },
	// 	// toggleAll: function (e) {
	// 	// 	var isChecked = $(e.target).prop('checked');

	// 	// 	this.todos.forEach(function (todo) {
	// 	// 		todo.completed = isChecked;
	// 	// 	});

	// 	// 	// this.render();
	// 	// 	renderApp();
	// 	// },
	// 	// getActiveTodos: function () {
	// 	// 	return this.todos.filter(function (todo) {
	// 	// 		return !todo.completed;
	// 	// 	});
	// 	// },
	// 	// getCompletedTodos: function () {
	// 	// 	return this.todos.filter(function (todo) {
	// 	// 		return todo.completed;
	// 	// 	});
	// 	// },
	// 	// getFilteredTodos: function () {
	// 	// 	if (this.filter === 'active') {
	// 	// 		return getActiveTodosApp();
	// 	// 	}

	// 	// 	if (this.filter === 'completed') {
	// 	// 		return getCompletedTodosApp();
	// 	// 	}

	// 	// 	return this.todos;
	// 	// },
	// 	// destroyCompleted: function () {
	// 	// 	this.todos = getActiveTodosApp();
	// 	// 	this.filter = 'all';
	// 	// 	// this.render();
	// 	// 	renderApp();
	// 	// },
	// 	// accepts an element from inside the `.item` div and
	// 	// returns the corresponding index in the `todos` array
	// 	// indexFromEl: function (el) {
	// 	// 	var id = $(el).closest('li').data('id');
	// 	// 	var todos = this.todos;
	// 	// 	var i = todos.length;

	// 	// 	while (i--) {
	// 	// 		if (todos[i].id === id) {
	// 	// 			return i;
	// 	// 		}
	// 	// 	}
	// 	// },
	// 	// create: function (e) {
	// 	// 	var $input = $(e.target);
	// 	// 	var val = $input.val().trim();

	// 	// 	if (e.which !== ENTER_KEY || !val) {
	// 	// 		return;
	// 	// 	}

	// 	// 	this.todos.push({
	// 	// 		// id: util.uuid(),
	// 	// 		id: utilUuid(),
	// 	// 		title: val,
	// 	// 		completed: false
	// 	// 	});

	// 	// 	$input.val('');

	// 	// 	// this.render();
	// 	// 	renderApp();
	// 	// },
	// 	// toggle: function (e) {
	// 	// 	var i = indexFromElApp(e.target);
	// 	// 	this.todos[i].completed = !this.todos[i].completed;
	// 	// 	// this.render();
	// 	// 	renderApp();
	// 	// },
	// 	// edit: function (e) {
	// 	// 	var $input = $(e.target).closest('li').addClass('editing').find('.edit');
	// 	// 	$input.val($input.val()).focus();
	// 	// },
	// 	// editKeyup: function (e) {
	// 	// 	if (e.which === ENTER_KEY) {
	// 	// 		e.target.blur();
	// 	// 	}

	// 	// 	if (e.which === ESCAPE_KEY) {
	// 	// 		$(e.target).data('abort', true).blur();
	// 	// 	}
	// 	// },
	// 	// update: function (e) {
	// 	// 	var el = e.target;
	// 	// 	var $el = $(el);
	// 	// 	var val = $el.val().trim();

	// 	// 	if (!val) {
	// 	// 		this.destroy(e);
	// 	// 		return;
	// 	// 	}

	// 	// 	if ($el.data('abort')) {
	// 	// 		$el.data('abort', false);
	// 	// 	} else {
	// 	// 		this.todos[indexFromElApp(el)].title = val;
	// 	// 	}

	// 	// 	// this.render();
	// 	// 	renderApp();
	// 	// },
	// 	// destroy: function (e) {
	// 	// 	this.todos.splice(indexFromElApp(e.target), 1);
	// 	// 	// this.render();
	// 	// 	renderApp();
	// 	// }
	// };

	initApp();
});