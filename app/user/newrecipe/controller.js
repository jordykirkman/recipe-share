import Ember from 'ember';

export default Ember.Controller.extend({

	userController: Ember.inject.controller('user'),

	actions: {

		addBookToRecipe: function(book){
			this.get('model.books').pushObject(book);
		},

		saveRecipe: function(){
			var model = this.get('model');
			var self = this;

			var ingredients = JSON.stringify(this.get('ingredients'));

			model.save().then(function(recipe){
				var book = recipe.get('books.firstObject');
				self.transitionToRoute('book.recipe', book, recipe);
			});
				
		}
	}

});