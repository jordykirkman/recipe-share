define(
	// Dependencies
	[
		'ember',
		'scripts/routes/application/application',
	],
	
function() {

	App.RecipeRoute = Ember.Route.extend({

		setupController: function(controller, model){
			var book = this.modelFor('book');
			controller.setProperties({
				'model': model,
				'book': book
			});
		}

	});


});