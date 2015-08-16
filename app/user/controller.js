import Ember from 'ember';

export default Ember.Controller.extend({

	needs: ['book'],

	hasBook: function(){
		console.log('hi');
		return this.get('controllers.book.model') ? true : false;
	}.property('controllers.book.model'),

	actions: {
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