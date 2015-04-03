import Ember from 'ember';

export default Ember.Controller.extend({

	ingredients: Ember.A([
		{ qty: "", item: "", link: "" },
	]),

	actions: {

		addIngredient: function(){
			this.get('ingredients').pushObject({ qty: "", item: "", link: "" });
		},
		removeIngredient: function(){
			this.get('ingredients').removeObject(this);
		},

		saveRecipe: function(){
			var model = this.get('model');
			var book = this.get('book');
			var self = this;

			var ingredients = JSON.stringify(this.get('ingredients'));

			model.set('ingredients', ingredients).save().then(function(recipe){
				book.get('recipes').addObject(recipe).then(function(){
					book.save();
					self.transitionToRoute('recipe', recipe);
				});
			});
				
		}
	}

});
