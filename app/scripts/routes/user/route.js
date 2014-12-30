define(
	// Dependencies
	[
		'ember',
		'scripts/routes/application/application',
	],
	
function() {

	App.UserRoute = Ember.Route.extend({
		actions: {
			error: function(error, transition) {
				localStorage.removeItem('sessionToken');
				this.transitionTo('login');
			}
		}
	});

	App.UserIndexRoute = Ember.Route.extend({
		model: function(){
			return this.modelFor('user');
		}
	});


});