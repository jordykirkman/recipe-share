import Ember from 'ember';

export default Ember.Controller.extend({

	bookController: Ember.inject.controller('book'),

	hasBook: function(){
		return this.get('bookController.book.model') ? true : false;
	}.property('bookController.book.model'),

	books: function(){
		var user = this.get('model');
		return this.store.filter('book', function(book){
			return book.get('users').contains(user) ? true : false;
		});
	}.property('model'),

	actions: {

		fetchBookInvites: function(user){
			var userId = user.get('id');
			this.store.query('book', {userInvites: userId});
		},

		logout: function(){

			localStorage.removeItem('sessionToken');

			this.transitionToRoute('index');

		},
		save: function(){
			this.get('model').save().then(function(user){
				alert('Changes saved.')
			});
		}
	}
	
});