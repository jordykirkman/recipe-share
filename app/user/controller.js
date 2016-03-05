import Ember from 'ember';

export default Ember.Controller.extend({

	classNames: ['sdflsdf'],

	bookController: Ember.inject.controller('book'),
	showMenu: false,

	hasBook: function(){
		return this.get('bookController.book.model') ? '' : 'hide';
	}.property('bookController.book.model'),

	books: function(){
		var user = this.get('model');
		return this.store.filter('book', function(book){
			return book.get('users').contains(user) ? true : false;
		});
	}.property('model'),

	showMenuClass: function(){
		return this.get('showMenu') === true ? '' : 'hideMenu';
	}.property('showMenu'),

	actions: {

		menu: function(){
			this.toggleProperty('showMenu');
		},

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
				alert('Changes saved.');
			});
		}
	}
	
});