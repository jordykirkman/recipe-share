define(
	// Dependencies
	[
		'ember',
		'scripts/routes/application/application'
	],
	
function() {

	// controller for main route
	App.BookNewrecipeController = Ember.Controller.extend({
		actions: {
			saveRecipe: function(){
				var model = this.get('model');
				var book = this.get('book');
				var self = this;

				// save the recipe
				model.save().then(function(recipe){
					book.get('recipes').addObject(recipe).then(function(){
						book.save();
						self.transitionToRoute('recipe', recipe);
					});
				});
			}
		}
	});

});