define(
	// Dependencies
	[
		'ember',
		'scripts/routes/application/application'
	],
	
function() {

	App.RecipeController = Ember.Controller.extend({
		edit: false,
		actions {
			removeFromBook: function(){
				var recipe = this.get('model');
				var book = this.get('book');
				book.get('recipes').then(function(recipes){
					book.removeObject('recipe').save().then(function(book){
						alert('Recipe removed from book');
					});
				});
			},
			save: function(recipe){
				this.get('model').save().then(function(recipe){
					alert('Recipe updated.');
				});
			},
		}
	});


});