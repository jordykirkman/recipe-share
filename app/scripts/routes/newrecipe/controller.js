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

				// create the new recipe
				var n = this.get('name');
				var d = this.get('description');
				var i = this.get('ingredients');
				var newRecipe = this.store.createRecord('recipe', {name: n, description: d, ingredients: i});

				// save the recipe
				newRecipe.save().then(function(recipe){
					var id = recipe.get('id');
					var bookid = model.get('id');
					var data = {};
					data['recipe'] = id;
					data['book'] = bookid;

					// after its saved, update the book with the recipe,
					// if that was successful, update the book's recipe list
					
					// this could be replaced with a .save() on the book
					// with transforms in the php to update it, then return the new book
					$.ajax({
					    url: "api/updatebook.php",
					    type: "POST",
					    data: data,
					    success: function(response) {
					    	model.get('recipes').pushObject(recipe);
					    }
					});
				});
			}
		}
	});

});