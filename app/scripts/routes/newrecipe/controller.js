define(
	// Dependencies
	[
		'ember',
		'scripts/routes/application/application'
	],
	
function() {

	// controller for main route
	App.BookNewrecipeController = Ember.Controller.extend({

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

				// I need to add automatic image crunching before allowing this

				// var f = document.getElementById('file').files[0];
				// var fd = new FormData(f);
    //             $.ajax({
    //            		url: 'https://recipeboxapp.herokuapp.com/images',
				// 	data: f,
				// 	// async: false,
				// 	processData:false,
				// 	contentType: false,
				// 	type:'POST',
				// 	success: function(response) {
						model.set('ingredients', ingredients).save().then(function(recipe){
							book.get('recipes').addObject(recipe).then(function(){
								book.save();
								self.transitionToRoute('recipe', recipe);
							});
						});
					// }
				// });
			}
		}
	});


});