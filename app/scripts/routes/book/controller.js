define(
	// Dependencies
	[
		'ember',
		'scripts/routes/application/application'
	],
	
function() {

	// controller for main route
	App.BookController = Ember.Controller.extend({

		recipeFilter: null,
		filteredRecipes: function(){
			var key = this.get('recipeFilter');
			if(key){
				return this.get('model.recipes').filter(function(recipe){
					console.log(recipe);
					var content = recipe.get('tags') + " " + recipe.get('name') + " " + recipe.get('ingredients');
					if(content.toLowerCase().indexOf(key.toLowerCase()) > -1){
						return recipe;
					}
				});
			} else {
				return this.get('model.recipes');
			}
		}.property('this.recipeFilter', 'this.model')
	
	});

});