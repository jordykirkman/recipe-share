define(
	// Dependencies
	[
		'ember',
		'scripts/routes/application/application',
	],
	
function() {

	App.LoginErrorRoute = Ember.Route.extend({
		model: function(){
			return this.modelFor('user');
		}
	});


});