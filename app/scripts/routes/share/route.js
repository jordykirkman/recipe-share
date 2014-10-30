define(
	// Dependencies
	[
		'ember',
		'scripts/routes/application/application',
	],
	
function() {

	App.BookShareRoute = Ember.Route.extend({
		model: function(){
			return this.modelFor('book');
		}
	});


});