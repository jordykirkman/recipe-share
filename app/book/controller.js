import Ember from 'ember';

export default Ember.Controller.extend({

	recipeFilter: null,

	recipes: function(){
		var book = this.get('model');
		return this.store.filter('recipe', function(recipe){
			return recipe.get('books').contains(book) ? true : false;
		});
	}.property('model'),

	filteredRecipes: function(){
		var key = this.get('recipeFilter');
		if(key){
			return this.get('recipes').filter(function(recipe){
				var content = recipe.get('tags') + " " + recipe.get('name') + " " + recipe.get('description');
				if(content.toLowerCase().indexOf(key.toLowerCase()) > -1){
					return recipe;
				}
			});
		} else {
			return this.get('recipes');
		}
	}.property('recipes')
	
});
