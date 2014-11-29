define(
	// Dependencies
	[
		'ember',
		'scripts/routes/application/application',
	],
	
function() {

	App.BookIndexRoute = Ember.Route.extend({
		model: function(){
			return this.modelFor('book');
		}
	});


});