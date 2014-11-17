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

				var f = document.getElementById('file').files[0];
				var fd = new FormData(f);
                $.ajax({
               		url: 'api/image.php',
					data: f,
					// async: false,
					processData:false,
					contentType: false,
					type:'POST',
					success: function(response) {
						model.set('image', response).save().then(function(recipe){
							book.get('recipes').addObject(recipe).then(function(){
								book.save();
								self.transitionToRoute('recipe', recipe);
							});
						});
					}
				});
			}
		}
	});


});