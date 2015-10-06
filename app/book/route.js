import Ember from 'ember';

export default Ember.Route.extend({

	renderTemplate: function() {
		this.render({
			outlet: 'book',
		});
	},

	afterModel: function(book) {
		var bookId = book.get('id');
		this.store.query('recipe', {books: bookId});
	},

	deactivate: function(){
		this.controllerFor('book').set('model', null);
	}

});
