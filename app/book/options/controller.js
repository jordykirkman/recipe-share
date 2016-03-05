import Ember from 'ember';

export default Ember.Controller.extend({

	userController: Ember.inject.controller('user'),

	edit: false,
	options: false,

	isRecipeCreator: function(){
		return this.get('userController.model.id') === this.get('model.creator.id') ? true : false;
	}.property('userController.model', 'model.creator.isFulfilled'),
	
	actions: {
		optionsToggle: function(){
			this.toggleProperty('options');
		},

		save: function(recipe){
			this.get('model').save().then(function(recipe){
				alert('Recipe updated.');
			});
		},

		copyToBook: function(book){
			var recipe = this.get('model');
			book.get('recipes').pushObject(recipe);
			book.save().then(function(book){
				console.log('saved');
			});
		}

	}
	
});
